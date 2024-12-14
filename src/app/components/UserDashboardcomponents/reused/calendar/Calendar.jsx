"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Timetable from "../../main/timetable/Timetable"; // Include Timetable if needed

const Calendar = () => {
  const { data: session } = useSession();
  const [selectedClass] = useState(
    session?.user?.class || "9"
  );
  // console.log(selectedClass);
  // State to manage the current month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // State to store fetched events
  const [events, setEvents] = useState([]);

  // Get class from session, fallback to '9' if class is not available

  // Fetch event data when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`/api/calendar?className=${selectedClass}`);
      const data = await res.json();
      if (data.success) {
        setEvents(data.data);
      }
    };
    fetchEvents();
  }, [selectedClass]); // Empty dependency array ensures this runs once on mount

  // Get all days for the current month
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  // Helper: Get event data for a specific date
  const getEventsForDate = (date) => {
    return events.find((event) => event.date === format(date, "yyyy-MM-dd"));
  };

  // Helper: Get class based on the number of "off" subjects and the test status
  const getColorForDate = (date) => {
    const event = getEventsForDate(date);

    if (event) {
      const testSubjects = Object.entries(event.subjects).filter(
        ([, info]) => info.status === "test"
      );

      if (testSubjects.length > 0) {
        return "bg-red-900 text-white"; // Dark red for test days
      }

      const offCount = Object.values(event.subjects).filter(
        (subj) => subj.status === "off"
      ).length;

      if (offCount === 1) return "bg-green-100 text-green-700"; // 1 subject off
      if (offCount === 2) return "bg-blue-100 text-blue-700"; // 2 subjects off
      if (offCount === 3) return "bg-red-100 text-red-700"; // All subjects off
    }

    return "bg-gray-100 text-gray-700"; // Default (no classes off)
  };

  // Highlight today's date
  const getTodayHighlight = (date) => {
    return isToday(date) ? "bg-purple-200 text-purple-800 font-bold" : "";
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl text-gray-600 items-center w-full p-4">
      {/* Profile Header */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center space-x-4">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={session?.user?.image || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-semibold text-lg">
              {session?.user?.name || "User"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <button onClick={handlePrevMonth} className="btn btn-sm btn-outline">
          &lt; Prev
        </button>
        <h2 className="text-lg font-bold text-center">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextMonth} className="btn btn-sm btn-outline">
          Next &gt;
        </button>
      </div>

      {/* Calendar */}
      <motion.div
        className="card bg-white shadow-lg rounded-lg p-4 pt-0 w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
          {/* Days of the week */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <motion.span
              key={i}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {day}
            </motion.span>
          ))}

          {/* Dates */}
          <AnimatePresence>
            {days.map((day, index) => {
              const event = getEventsForDate(day);

              return (
                <motion.div
                  key={index}
                  className={`p-2 rounded-full relative group ${getColorForDate(
                    day
                  )} ${getTodayHighlight(day)}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <span className="font-medium">{format(day, "d")}</span>

                  {/* Tooltip */}
                  {event && (
                    <div className="absolute flex top-10 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 z-30">
                      {Object.entries(event.subjects).map(
                        ([subject, info], idx) => (
                          <div key={idx}>
                            <span className="font-medium">{subject}</span>:{" "}
                            {info.status}{" "}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="mt-4 text-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-900"></span>
            <span>Test Day</span>
          </div>
        </div>
      </motion.div>

      {/* Include Notification Timetable */}
      <Timetable />
    </div>
  );
};

export default Calendar;
