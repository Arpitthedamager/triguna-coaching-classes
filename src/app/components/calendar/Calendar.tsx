const Calendar = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
    return (
      <div className="card bg-base-100 shadow-lg p-4">
        <h2 className="card-title">January 2022</h2>
        <div className="grid grid-cols-7 gap-2 mt-4 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <span key={i} className="font-semibold">
              {day}
            </span>
          ))}
          {days.map((day, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                day === 13 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Calendar;
  