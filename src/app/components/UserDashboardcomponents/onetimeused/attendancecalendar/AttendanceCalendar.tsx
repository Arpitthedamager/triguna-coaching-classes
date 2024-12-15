import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";

interface AttendanceData {
  [date: string]: ("present" | "absent" | null)[] | undefined;
}

interface AttendanceCalendarProps {
  attendanceData: AttendanceData;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  attendanceData,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Generate all days of the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // Handlers for navigating months
  const goToPreviousMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  return (
    <div className="p-6 my-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600"
        >
          Previous
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {/* Weekday Labels */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold text-gray-600">
            {day}
          </div>
        ))}

        {/* Days of the Month */}
        {daysInMonth.map((day) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          const attendanceForDay = attendanceData[formattedDate] || [null, null, null];

          return (
            <div
              key={formattedDate}
              className={`p-2 rounded-lg border flex flex-col items-center ${
                isToday(day) ? "bg-yellow-100 border-yellow-400" : "bg-white"
              }`}
            >
              <span className="font-semibold text-gray-800">{format(day, "d")}</span>
              <div className="flex space-x-1 mt-2">
                {/* Attendance for three classes */}
                {attendanceForDay.map((status, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${
                      status === "present"
                        ? "bg-green-400"
                        : status === "absent"
                        ? "bg-red-400"
                        : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
          <span className="text-gray-600">Present</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-400 rounded-full"></div>
          <span className="text-gray-600">Absent</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <span className="text-gray-600">No Class</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
