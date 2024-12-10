"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormState {
  email: string;
  password: string;
  name: string;
  number: string;
  role: string;
  address: string;
  class: number;
}

export default function Register() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
    number: "",
    role: "student", // Default role
    address: "",
    class: 6, // Default minimum class
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        window.location.href = "/signin";
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred.");
      }
    } catch (error) {
      setError("Failed to register. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-500">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-green-100">
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="text-white mt-4">Fill in the form below to create your account.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <p className="text-red-600 bg-red-100 p-2 text-center rounded-lg">{error}</p>}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <input
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <input
              name="class"
              type="number"
              value={form.class}
              onChange={handleChange}
              min="6"
              max="14"
              placeholder="Class (6 to 14)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-6 text-white">
            Already have an account?{" "}
            <a href="/signin" className="text-green-300 font-semibold">
              Login
            </a>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/your-image-path.jpg')" }}></div>
      </div>
    </div>
  );
}
