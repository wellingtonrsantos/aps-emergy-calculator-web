import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/index.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
