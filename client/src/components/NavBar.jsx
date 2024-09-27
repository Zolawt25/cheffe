import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [navbarBgColor, setNavbarBgColor] = useState(false);
  const user = sessionStorage.getItem("user_token");
  const navigate = useNavigate();

  const changBackground = () => {
    if (window.scrollY >= 40) {
      setNavbarBgColor(true);
    } else {
      setNavbarBgColor(false);
    }
  };
  window.addEventListener("scroll", changBackground);

  const handleLogout = () => {
    sessionStorage.removeItem("user_token");
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      className={`fixed top-0 w-full duration-300 ease-in-out ${
        navbarBgColor ? "bg-[#070b22] shadow" : "bg-transparent"
      } z-50`}
    >
      <div className="flex items-center px-10 py-4  max-w-[1500px] mx-auto">
        <div>
          <a href="/" className="text-3xl font-mono font-bold text-[#DB7607]">
            <img src="/imgs/logo.png" alt="" className="w-[150px]" />
          </a>
        </div>
        <div className="w-full flex justify-end *:ml-3 *:text-sm  text-gray-50 hover:*:text-[#DB7607]">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/menu">Menu</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
          {user && <a href="/dashboard">Dashboard</a>}
        </div>
        {user ? (
          <button
            className="bg-[#ffa216] px-3 py-1  text-sm text-gray-50 rounded-full ml-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="bg-[#ffa216] px-3 py-1  text-sm text-gray-50 rounded-full ml-3"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default NavBar;
