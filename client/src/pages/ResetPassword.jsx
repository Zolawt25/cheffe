import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `https://cheffe-server.vercel.app/users/reset-password/${id}/${token}`,
        {
          password: password,
        }
      );
      setLoading(false);
      setMessage("success!!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
          Reset Password
        </div>
        <form
          className="p-3"
          onSubmit={(e) => !loading && handleResetPassword(e)}
        >
          <div>
            <p className="text-sm text-gray-500 font-semibold mb-1">
              New Password
            </p>
            <input
              type="password"
              className="bg-blue-50 w-full text-xs py-2 px-4 rounded"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {message && (
            <p className="text-xs text-blue-600 mt-3 text-center">{message}</p>
          )}
          <button className="text-center w-full rounded-full py-2 text-sm font-semibold text-gray-50 bg-[#ffa216] mt-4">
            {loading ? "Resetting..." : "Reset"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
