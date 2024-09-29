import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendingEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "https://cheffe-server.vercel.app/users/forgot-password",
        {
          email: email,
        }
      );
      setLoading(false);
      setMessage("success!! check your email.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setMessage("sorry try agin");
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="sm:w-[450px] w-full mx-8  bg-white rounded-[0_0_8px_8px] shadow-md">
        <div className="py-4 text-center bg-[#ffa216] text-[#070b22] text-2xl font-bold">
          Forgot Password
        </div>
        <form
          className="p-3"
          onSubmit={(e) => !loading && handleSendingEmail(e)}
        >
          <div>
            <p className="text-sm text-gray-500 font-semibold mb-1">Email</p>
            <input
              type="email"
              className="bg-blue-50 w-full text-xs py-2 px-4 rounded"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {message && (
            <p className="text-xs text-blue-600 mt-3 text-center">{message}</p>
          )}
          <button className="text-center w-full rounded-full py-2 text-sm font-semibold text-gray-50 bg-[#ffa216] mt-4">
            {loading ? "Sending..." : "send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
