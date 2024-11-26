"use client"; 
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary-content text-white">
      {/* Loading Text */}
      <h1 className="text-2xl font-bold mb-6">Loading...</h1>

      {/* Loading Bar */}
      <div className="w-full max-w-md h-6 bg-gray-700 rounded-full overflow-hidden relative">
        <div className="h-full bg-indigo-600 rounded-full loading-bar"></div>
      </div>

      {/* Additional styling for smoothness */}
      <style jsx>{`
        .loading-bar {
          animation: load 2s infinite ease-in-out;
          width: 0%;
        }

        @keyframes load {
          0% {
            width: 0%;
          }
          50% {
            width: 75%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
