import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useAuthStore } from "../Store/useAuthStore";

export default function SignUp() {
  const { signup, loading, error } = useAuthStore();
  const [form, setForm] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await signup(form);
      setSuccessMessage(message);
      setTimeout(() => navigate("/sign-in"), 2000);
    } catch (err) {
      console.error("Sign-up failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-lg uppercase font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <OAuth />
        </form>

        {successMessage && (
          <p className="text-green-600 text-center mt-4 bg-green-100 p-2 rounded-lg">
            {successMessage}
          </p>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-center mt-4 bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
