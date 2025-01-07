// components/SignIn.js
"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIncomponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRedirection = () => {
    if (session?.user?.role === "student") {
      router.push("/userdashboard");
    } else if (session?.user?.role === "teacher") {
      router.push("/admindashboard");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      handleRedirection();
    }
  }, [status, session, router]);

  if (status === "loading") {
    // return <div>Loading...</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username: email,
      password,
    });

    if (res.ok) {
      setSuccess(true);
      handleRedirection();
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-content">
      <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl rounded-lg overflow-hidden w-full max-w-screen-xl p-10">
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center bg-text-base-100">
          <h2 className="text-4xl font-bold text-secondary mb-6">Welcome Back!</h2>
          <p className="mt-4 text-xl text-secondary mb-8">
            Log in to your account to access all features.
          </p>

          {success && (
            <p className="text-green-600 bg-green-100 p-3 text-center rounded-lg text-lg">
              Login Successful! Redirecting...
            </p>
          )}
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
              className={`w-full btn btn-primary text-white text-lg rounded-lg transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center mt-8">
            <p className="text-lg text-secondary">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-secondary font-semibold text-xl">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div
          className="w-full lg:w-1/2 bg-cover bg-center bg-primary-content rounded-lg"
          style={{ backgroundImage: "url('/signin/loginIMG.svg')" }}
        ></div>
      </div>
    </div>
  );
}
