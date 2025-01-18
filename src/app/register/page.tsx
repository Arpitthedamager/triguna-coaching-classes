"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormState {
  email: string;
  password: string;
  name: string;
  number: string;
  role: string;
  address: string;
  class: number;
  subjects: {
    physics: boolean;
    math: boolean;
    chemistry: boolean;
  };
}

export default function Register() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
    number: "",
    role: "student", // Default role
    address: "",
    class: 9, // Default class
    subjects: {
      physics: false,
      math: false,
      chemistry: false,
    },
  });

  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession(); // Get session data and status
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "loading") return; // Wait until session is loaded

  //   if (!session) {
  //     // Redirect to home if no session (user is not logged in)
  //     router.push("/");
  //   } else {
  //     // Check if user is logged in and redirect based on their role
  //     if (session.user?.role !== "teacher") {
  //       router.push("/"); // Redirect non-admin users to the homepage or another page
  //     }
  //   }
  // }, [session, status, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setForm({
        ...form,
        subjects: {
          ...form.subjects,
          [name]: checked,
        },
      });
    } else {
      // Reset subjects when class changes
      if (name === "class") {
        setForm({
          ...form,
          [name]: parseInt(value),
          subjects: { physics: false, math: false, chemistry: false }, // Reset subjects on class change
        });
      } else {
        setForm({
          ...form,
          [name]: type === "number" ? parseInt(value) : value,
        });
      }
    }
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
      console.log(  form)

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

  const isClass9Or10 = form.class === 9 || form.class === 10;

  return (
    <div className="min-h-screen flex items-center text-gray-600 justify-center bg-green-200">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-green-100">
          {error && <p className="text-red-600 bg-red-100 p-2 text-center rounded-lg">{error}</p>}

          <h2 className="text-3xl font-bold ">Create an Account in Triguna Coaching Classes the best 1 to 12 Coaching classes in agra </h2>
          <p className="mt-4">Fill in the form below to create your account.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              {/* <option value="teacher">Teacher</option> */}
            </select>
            <select
              name="class"
              value={form.class}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value={9}>Class 9</option>
              <option value={10}>Class 10</option>
              <option value={11}>Class 11</option>
              <option value={12}>Class 12</option>
            </select>

            {/* Show subjects only when class is selected */}
            {form.class && (
              <div className="flex flex-col space-y-2">
                {isClass9Or10 && (
                  <>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="physics"
                        checked={form.subjects.physics}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      SST
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="chemistry"
                        checked={form.subjects.chemistry}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Science
                    </label>
                  </>
                )}
                {!isClass9Or10 && (
                  <>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="physics"
                        checked={form.subjects.physics}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Physics
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="chemistry"
                        checked={form.subjects.chemistry}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Chemistry
                    </label>
                  </>
                )}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="math"
                    checked={form.subjects.math}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Math
                </label>
              </div>
            )}

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
        <div
          className="w-full lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/your-image-path.jpg')" }}
        ></div>
      </div>
    </div>
  );
}
