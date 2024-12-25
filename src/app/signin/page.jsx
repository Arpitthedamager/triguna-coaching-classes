"use client";
import { signIn } from "next-auth/react";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Check if the session is loaded and user data is available
    if (status === "authenticated") {
      // Redirect based on the user's role
      if (session.user?.role === "student") {
        router.push("/userdashboard")
      } else if (session.user?.role === "teacher") {
        router.push("/admindashboard")
      }
    }
  }, [status, session, router])

  if (status === "loading") {
    // return <div>Loading...</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username: email,
      password,
    });
    if (res.ok) {
      window.location.reload(); // Refresh to load session
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-content">
      <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl rounded-lg overflow-hidden w-full max-w-screen-xl p-10">
        {/* Left Section: Informational Content */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center bg- text-base-100">
          <h2 className="text-4xl font-bold text-secondary mb-6">
            Welcome Back!
          </h2>
          <p className="mt-4 text-xl text-secondary mb-8">
            Log in to your account to access all features.
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <p className="text-red-600 bg-red-100 p-3 text-center rounded-lg text-lg">
                {error}
              </p>
            )}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 text-lg text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-lg text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full btn btn-primary text-white  text-lg rounded-lg transition"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-8">
            <p className="text-lg text-secondary">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-secondary font-semibold text-xl"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right Section: Image or Illustration */}
        <div
          className="w-full lg:w-1/2 bg-cover bg-center bg-primary-content rounded-lg"
          style={{ backgroundImage: "url('/signin/loginIMG.svg')" }}
        >
          {/* Replace '/signin/loginIMG.svg' with an actual image URL */}
        </div>
      </div>
    </div>
  );
}
