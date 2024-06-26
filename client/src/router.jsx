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
        {/* <Route path="/profile" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </>
  );
}

/*
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* protected routes
        {/*         <Route element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
        </Route> 

        {/* Catch all - replace with 404 component if you want 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
*/
