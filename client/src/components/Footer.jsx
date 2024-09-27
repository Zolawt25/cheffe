import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import { Mail } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="mt-10 bg-[#ff9a16]">
      <div className="text-gray-50  max-w-[1500px] mx-auto">
        <div className="p-20 flex gap-x-40 gap-y-3 flex-wrap">
          <div>
            <p className="text-2xl font-bold font-cursive">Company</p>
            <div className="flex flex-col mt-3 *:text-sm gap-1">
              <a href="/about">About US</a>
              <a href="/menu">Menu</a>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-cursive">Contact</p>
            <div className="flex flex-col mt-3 *:text-sm *:flex *:items-center *:gap-3 gap-1">
              <p>
                <RoomIcon fontSize="small" /> Addis Ababa, Ethiopia
              </p>
              <p>
                <PhoneIcon fontSize="small" /> +251 911 123 456
              </p>
              <p>
                <Mail fontSize="small" /> info@cheffe.com
              </p>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-cursive">Opening</p>
            <div className=" mt-3">
              <div className="mb-2">
                <p className="font-bold">Monday - Saturday</p>
                <p className="text-xs mt-1">9AM - 9PM</p>
              </div>
              <div>
                <p className="font-bold">Sunday</p>
                <p className="text-xs mt-1">10AM - 8PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-20 pb-5">
          <p className=" capitalize text-xs">
            &copy; cheffe, all rights reserved
          </p>
          <p className=" capitalize text-xs">made by berenda tech</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
