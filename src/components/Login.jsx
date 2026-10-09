import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ users, setCurrentUser }) {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user); // save user in parent state
      navigate("/");        // go to home page
    } else {
      alert("Invalid credentials");
    }
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl w-80 text-white">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p
          className="mt-3 text-sm text-gray-400 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
    )
}

export default Login
