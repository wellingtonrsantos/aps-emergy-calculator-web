import { Route, Routes } from "react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import App from "@/App";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import CalculateEmergy from "@/pages/calculate-emergy";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="calculate"
          element={
            <ProtectedRoute>
              <CalculateEmergy />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
