import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import BlogPage from "./pages/BlogPage";
import Footer from "./components/Footer";
import BlogDetailPage from "./pages/BlogDetailPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddBlogPage from "./pages/AddBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
const App = () => {
  return (
    <div className="bg-blue-50">
      <NavBar />
      <div className=" max-w-[1500px] mx-auto">
        <Routes>
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/login/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          {sessionStorage.getItem("user_token") && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/add-blog" element={<AddBlogPage />} />
              <Route
                path="/dashboard/edit-blog/:id"
                element={<EditBlogPage />}
              />
            </>
          )}

          <Route path="*" element={<Navigate to="/blog" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
