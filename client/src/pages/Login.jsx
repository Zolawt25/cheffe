import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://cheffe-server.vercel.app/users/login",
        {
          username,
          password,
        }
      );
      sessionStorage.setItem("user_token", res.data);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg("incorrect password or username");
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="sm:w-[450px] w-full mx-8  bg-white rounded-[0_0_8px_8px] shadow-md">
        <div className="py-4 text-center bg-[#ffa216] text-[#070b22] text-2xl font-bold">
          Admin Login
        </div>
        <form className="p-3" onSubmit={(e) => !loading && handleLogin(e)}>
          <div>
            <p className="text-sm text-gray-500 font-semibold mb-1">Username</p>
            <input
              type="text"
              className="bg-blue-50 w-full text-xs py-2 px-4 rounded"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-500 font-semibold mb-1">Password</p>
            <input
              type="password"
              className="bg-blue-50 w-full text-xs py-2 px-4 rounded"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 mt-3 text-center">{errorMsg}</p>
          )}
          <a href="/forgot-password" className="text-xs my-1 text-gray-600">
            Forgot password?
          </a>
          <button className="text-center w-full rounded-full py-2 text-sm font-semibold text-gray-50 bg-[#ffa216] mt-4">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
