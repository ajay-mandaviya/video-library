import "./App.css";
import logo from "./logo.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  History,
  Home,
  Liked,
  Login,
  PlayList,
  Signup,
  WatchLater,
} from "./pages";
import { Navbar, Sidebar } from "./components";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
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
