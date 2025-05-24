import { Route, Routes } from "react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import App from "@/App";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import CalculateEmergyByFile from "@/pages/calculate-emergy-by-file";
import CalculateEmergyByLCI from "@/pages/calculate-emergy-by-lci";

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
          path="calculate-by-file"
          element={
            <ProtectedRoute>
              <CalculateEmergyByFile />
            </ProtectedRoute>
          }
        />
        <Route
          path="calculate-by-lci"
          element={
            <ProtectedRoute>
              <CalculateEmergyByLCI />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
