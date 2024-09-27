import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BlogPage from "./pages/BlogPage";
import Footer from "./components/Footer";
import BlogDetailPage from "./pages/BlogDetailPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddBlogPage from "./pages/AddBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
const App = () => {
  return (
    <div className="bg-blue-50">
      <NavBar />
      <div className=" max-w-[1500px] mx-auto">
        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-blog" element={<AddBlogPage />} />
          <Route path="/edit-blog/:id" element={<EditBlogPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
