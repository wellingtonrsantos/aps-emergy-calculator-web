import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
