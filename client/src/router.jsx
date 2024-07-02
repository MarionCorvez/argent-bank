import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/home.jsx";
import Login from "@pages/login.jsx";
import Profile from "@pages/profile.jsx";
import NotFound from "@pages/notFound.jsx";

export default function Router() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}
