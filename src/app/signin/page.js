"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", { redirect: false, username: email, password });
    if (res.ok) {
      window.location.reload(); // Refresh to load session
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
      <div className="flex flex-col lg:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden max-w-7xl-">
        {/* Left Section: Informational Content */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-neutral text-base-100">
          <h2 className="text-3xl font-bold text-secondary">
            Welcome Back!
          </h2>
          <p className="mt-4 text-secondary-content">Log in to your account to access all features.</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <p className="text-red-600 bg-red-100 p-2 text-center rounded-lg">
                {error}
              </p>
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full btn btn-primary text-white py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>
          <div className="text-center  mt-6">
            Don't have an account?{" "}
            <a href="/register" className="text-secondary font-semibold">
              Sign up
            </a>
          </div>
        </div>

        {/* Right Section: Image or Illustration */}
        <div className="w-full lg:w-1/2 bg-cover bg-center bg-primary-content" style={{ backgroundImage: "url('/signin/loginIMG.svg')" }}>
          {/* Replace '/your-image-path.jpg' with an actual image URL */}
        </div>
      </div>
    </div>
  );
}
