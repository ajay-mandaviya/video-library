import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  History,
  Home,
  Liked,
  Login,
  PlayList,
  Signup,
  SingleVideo,
  WatchLater,
} from "./pages";
import { Navbar, Sidebar } from "./components";
import { useAuth, useData } from "./context";
import { getAllHistory, getLikeVideos } from "./services";

function App() {
  const { dispatch } = useData();

  const {
    auth: { token },
  } = useAuth();

  useEffect(() => {
    console.log("home useEffect");
    if (token) {
      getLikeVideos(dispatch, token);
      getAllHistory(token, dispatch);
    }
  }, [token]);

  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/history" element={<History />} />
        <Route path="/watchLater" element={<WatchLater />} />
        <Route path="/playlist" element={<PlayList />} />
      </Routes>
    </div>
  );
}

export default App;
