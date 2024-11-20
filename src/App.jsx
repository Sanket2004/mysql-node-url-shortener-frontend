import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import DashBoard from "./pages/DashBoard";
import Register from "./pages/auth/Register";
import { AuthProvider } from "./provider/AuthProvider";
import ShortenLink from "./pages/ShortenLink";
import { UserProvider } from "./context/UserContext";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/url/shorten"
            element={
              <ProtectedRoute>
                <ShortenLink />
              </ProtectedRoute>
            }
          />
          <Route path="/:shortCode" element={<RedirectPage />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
