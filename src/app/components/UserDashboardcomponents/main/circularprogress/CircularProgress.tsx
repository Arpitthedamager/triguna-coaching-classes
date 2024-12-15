import { FC, useState } from "react";
import { motion } from "framer-motion";

interface ClassInfo {
  class: string;
  startDate: string;
  endDate: string;
}

const classData: ClassInfo[] = [
  { class: "9", startDate: "2024-01-01", endDate: "2025-12-31" },
  { class: "10", startDate: "2024-02-01", endDate: "2025-11-30" },
  { class: "11", startDate: "2024-03-01", endDate: "2026-10-31" },
  { class: "12", startDate: "2024-04-01", endDate: "2024-12-30" },
];

const calculateProgress = (startDate: string, endDate: string): number => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.max(0, Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  return Math.min(100, (elapsedDays / totalDays) * 100);
};

const CircularProgressWithClass: FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassInfo>(classData[0]);
  const percentage = calculateProgress(selectedClass.startDate, selectedClass.endDate);

  const radius = 40;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="flex flex-col items-center">
      {/* Dropdown for class selection */}
      {/* <div className="flex flex-col items-center">
        <label htmlFor="class-select" className="text-lg font-medium text-gray-700">
          Select Class
        </label>
        <select
          id="class-select"
          className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={selectedClass.class}
          onChange={(e) =>
            setSelectedClass(classData.find((cls) => cls.class === e.target.value)!)
          }
        >
          {classData.map((cls) => (
            <option key={cls.class} value={cls.class}>
              Class {cls.class}
            </option>
          ))}
        </select>
      </div> */}

      {/* Circular Progress Bar */}
      <div className="flex flex-col  rounded-xl items-center py-4 space-y-4 bg-base-100 w-56 h-72 ">
      <h2 className="text-xl font-semibold text-gray-700">Course Activities</h2>
        <svg
          className="w-48 h-48"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1 }}
          />
          {/* Text inside the circle */}
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fill="#3b82f6"
            fontSize="20"
            fontWeight="bold"
          >
            {percentage.toFixed(1)}%
          </text>
          {/* Gradient */}
          <defs>
            <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        {/* Legend */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
            <span className="text-sm text-gray-700">Process</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-blue-200 rounded-full"></span>
            <span className="text-sm text-gray-700">In process</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressWithClass;
