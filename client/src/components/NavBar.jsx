import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const [navbarBgColor, setNavbarBgColor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const location = useLocation().pathname.split("/")[1];
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

  useEffect(() => {
    if (location === "login" || location === "dashboard") {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [location]);
  const handleLogout = () => {
    sessionStorage.removeItem("user_token");
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      className={`fixed top-0 w-full duration-300 ease-in-out ${
        isDisable
          ? "bg-[#070b22] shadow"
          : navbarBgColor
          ? "bg-[#070b22] shadow"
          : "bg-transparent"
      } z-50`}
    >
      <div className="flex items-center px-10 py-4  max-w-[1500px] mx-auto relative">
        <div>
          <a href="/" className="text-3xl font-mono font-bold text-[#DB7607]">
            <img src="/imgs/logo.png" alt="" className="w-[150px]" />
          </a>
        </div>
        <div
          // className="w-full flex justify-end *:ml-3 *:text-sm  text-gray-50 hover:*:text-[#DB7607]"
          className={`flex sm:justify-end sm:w-full sm:*:ml-6 flex-col sm:flex-row absolute sm:relative text-gray-50 hover:*:text-[#DB7607]  ${
            isOpen ? "right-0" : "-right-[100vw]"
          } sm:right-0 h-screen  sm:h-auto top-0 items-center justify-center w-[300px] gap-7 sm:gap-0 ${
            !navbarBgColor && "bg-[#070b22]"
          } sm:bg-inherit ${
            navbarBgColor && "bg-[#070b22]"
          } duration-500 ease-in-out`}
        >
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/menu">Menu</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
          {user && <a href="/dashboard">Dashboard</a>}
        </div>
        {user ? (
          <button
            className="bg-[#ffa216] px-3 py-1  text-sm text-gray-50 rounded-full ml-auto sm:ml-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="bg-[#ffa216] px-3 py-1  text-sm text-gray-50 rounded-full ml-auto sm:ml-4"
          >
            Login
          </a>
        )}
        <button
          className="font-semibold text-gray-50 hover:*:text-[#DB7607] rotate-90 ml-5 block sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          |||
        </button>
      </div>
    </div>
  );
};

export default NavBar;
