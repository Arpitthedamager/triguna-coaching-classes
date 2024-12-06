// components/CallToAction.tsx
"use client";
import React from "react";

const CallToAction: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-black text-white py-8 px-52 rounded-lg flex justify-between items-center">
      <div>
        <h2 className="text-4xl font-semibold mb-2">
          Join Our Learning Community Today
        </h2>
        <p className="text-lg mb-2 ml-2">
          Get in touch to learn more about Programs and Schedules.
        </p>
      <button
        className="bg-orange-500 text-black px-6 py-2 ml-10 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
        onClick={() => alert("Learn more about us!")}
        >
        About us
      </button>
          </div>
    </div>
  );
};

export default CallToAction;
