const CircularProgress = ({ percentage }) => {
  return (
    <div className="flex items-center justify-center">
      <svg className="w-16 h-16">
        <circle
          className="text-gray-200"
          cx="50%"
          cy="50%"
          r="30%"
          strokeWidth="8"
          fill="none"
        />
        <circle
          className="text-blue-500"
          cx="50%"
          cy="50%"
          r="30%"
          strokeWidth="8"
          strokeDasharray="188.4"
          strokeDashoffset={`${188.4 - (188.4 * percentage) / 100}`}
          fill="none"
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
      </svg>
      <span className="absolute text-xl font-bold">{percentage}%</span>
    </div>
  );
};

export default CircularProgress;
