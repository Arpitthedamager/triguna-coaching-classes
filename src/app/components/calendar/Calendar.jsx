"use client";

import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { useSession } from "next-auth/react";
import Timetable from "../timetable/Timetable";
 // Import the NotificationTimetable component

const Calendar = () => {
  // Fetch session from NextAuth
  const { data: session } = useSession();

  // Example event data
  const events = [
    {
      date: "2024-01-13",
      subjects: {
        Physics: { status: "on", teacher: "Mr. John" },
        Chemistry: { status: "on", teacher: "Ms. Smith" },
        Math: { status: "off", teacher: "Mr. Alan" },
      },
    },
    {
      date: "2024-01-20",
      subjects: {
        Physics: { status: "off", teacher: "Mr. John" },
        Chemistry: { status: "off", teacher: "Ms. Smith" },
        Math: { status: "on", teacher: "Mr. Alan" },
      },
    },
    {
      date: "2024-01-25",
      subjects: {
        Physics: { status: "off", teacher: "Mr. John" },
        Chemistry: { status: "off", teacher: "Ms. Smith" },
        Math: { status: "off", teacher: "Mr. Alan" },
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Get current month's days
  const start = startOfMonth(new Date(2024, 0, 1)); // January 2024
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });

  // Helper: Get event data for a specific date
  const getEventsForDate = (date) => {
    return events.find((event) => event.date === format(date, "yyyy-MM-dd"));
  };

  // Helper: Generate color based on the number of "off" classes
  const getColorForDate = (date) => {
    const event = getEventsForDate(date);

    if (event) {
      const offCount = Object.values(event.subjects).filter((subj) => subj.status === "off").length;

      if (offCount === 1) return "bg-green-100 text-green-700"; // 1 subject off
      if (offCount === 2) return "bg-blue-100 text-blue-700"; // 2 subjects off
      if (offCount === 3) return "bg-red-100 text-red-700"; // All subjects off
    }

    return "bg-gray-100 text-gray-700"; // Default (no classes off)
  };

  return (
    <div className="flex flex-col bg-white text-gray-600 items-center w-full p-4 ">
      {/* Profile Header */}
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center space-x-4">
          <img
            src={session?.user?.image || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-lg">{session?.user?.name || "User"}</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="card bg-white shadow-lg rounded-lg p-4 pt-0 w-full max-w-md">
        <h2 className="text-lg font-bold text-center mb-4">January 2024</h2>
        <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
          {/* Days of the week */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <span key={i} className="font-semibold">
              {day}
            </span>
          ))}

          {/* Dates */}
          {days.map((day, index) => {
            const event = getEventsForDate(day);

            return (
              <div
                key={index}
                className={`p-2 rounded-lg relative group ${getColorForDate(day)}`}
              >
                <span className="font-medium">{format(day, "d")}</span>

                {/* Tooltip */}
                {event && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 z-10">
                    <div className="font-bold">Date: {format(day, "MMMM d, yyyy")}</div>
                    {Object.entries(event.subjects).map(([subject, info], idx) => (
                      <div key={idx}>
                        <span className="font-medium">{subject}</span>: {info.status}{" "}
                        <span className="text-gray-500"> ({info.teacher})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 text-sm">
        <h3 className="font-bold mb-2">Legend:</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span>1 Subject Off</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <span>2 Subjects Off</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span>All Subjects Off</span>
          </div>
        </div>
      </div>

      {/* Include Notification Timetable */}
      <Timetable />
    </div>
  );
};

export default Calendar;
