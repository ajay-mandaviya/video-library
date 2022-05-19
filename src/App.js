import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  History,
  Home,
  Liked,
  Login,
  PlayList,
  PlayListVideo,
  PrivateRoute,
  Profile,
  Signup,
  SingleVideo,
  WatchLater,
} from "./pages";

import { Navbar, Sidebar } from "./components";
import { useAuth, useData } from "./context";
import {
  getAllHistory,
  getLikeVideos,
  getUserPlayList,
  getWatchLaterVideos,
} from "./services";
import { Toaster } from "react-hot-toast";

function App() {
  const { dispatch } = useData();

  const {
    auth: { token },
  } = useAuth();

  useEffect(() => {
    if (token) {
      getLikeVideos(dispatch, token);
      getAllHistory(token, dispatch);
      getWatchLaterVideos(token, dispatch);
      getUserPlayList(token, dispatch);
    }
    //eslint-disable-next-line
  }, [token]);

  return (
    <div className="app">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <Liked />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/watchLater"
          element={
            <PrivateRoute>
              <WatchLater />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <PrivateRoute>
              <PlayList />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist/:playlistId"
          element={
            <PrivateRoute>
              <PlayListVideo />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
