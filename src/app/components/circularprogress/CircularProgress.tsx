import { FC } from 'react';
import { motion } from 'framer-motion';

const CircularProgress: FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 40; // Original radius
  const strokeWidth = 16; // Thickness of the stroke (increased to make the blue section thicker)
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDasharray = circumference; // The total length of the stroke (circle's perimeter)
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray; // The stroke to be removed to indicate progress

  return (
    <div className="flex flex-col items-center py-4 space-y-4 bg-base-100 w-56 h-72 ">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-700">Course Activities</h2>
      
      {/* Circular Progress Bar */}
      <svg
        className="w-48 h-48" // Adjust the size of the circle
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle (Light gray) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Circle (Blue gradient) */}
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
          {percentage}%
        </text>
        
        {/* Gradient Definition for Progress Circle */}
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
  );
};

export default CircularProgress;
