"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const StatisticsGraph = () => {
  const data = [200, 400, 600, 750, 500]; // Example data
  const years = [2017, 2018, 2019, 2020, 2021]; // Corresponding years
  const maxDataValue = Math.max(...data); // Maximum value for scaling
  const [highlightIndex, setHighlightIndex] = useState(3); // Highlight the 2020 bar

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-72 w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Statistics</h2>
        <div className="relative">
          <button className="flex items-center text-sm border border-gray-300 rounded-lg px-3 py-1.5 text-gray-600 hover:border-gray-400">
            Yearly
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bars and Left Axis */}
      <div className="flex h-full space-x-4">
        {/* Left Y-Axis Labels */}
        <div className="flex flex-col justify-between items-end pr-4 text-sm text-gray-500">
          {[0, Math.floor(maxDataValue / 2), maxDataValue].map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex flex-grow items-end justify-between">
          {data.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              onMouseEnter={() => setHighlightIndex(index)}
              onMouseLeave={() => setHighlightIndex(3)} // Reset highlight
            >
              {/* Animated Bar */}
              <motion.div
                className={`w-10 ${
                  highlightIndex === index
                    ? "bg-gradient-to-t from-purple-600 to-purple-400"
                    : "bg-purple-200"
                } rounded-t-md`}
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxDataValue) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              ></motion.div>
              {/* Year Label */}
              <span
                className={`mt-2 text-sm ${
                  highlightIndex === index
                    ? "font-semibold text-purple-600"
                    : "text-gray-500"
                }`}
              >
                {years[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsGraph;
