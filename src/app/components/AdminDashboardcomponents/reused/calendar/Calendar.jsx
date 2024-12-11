"use client";

import { useState } from "react";
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
import Timetable from "../../main/timetable/Timetable"; // Include Timetable if needed

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([
    {
      date: "2024-12-13",
      subjects: {
        Physics: { status: "on", teacher: "Mr. John" },
        Chemistry: { status: "test", teacher: "Ms. Smith" },
        Math: { status: "off", teacher: "Mr. Alan" },
      },
    },
    {
      date: "2024-12-20",
      subjects: {
        Physics: { status: "off", teacher: "Mr. John" },
        Chemistry: { status: "off", teacher: "Ms. Smith" },
        Math: { status: "test", teacher: "Mr. Alan" },
      },
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalData, setModalData] = useState(null);

  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });

  const getEventsForDate = (date) => {
    return events.find((event) => event.date === format(date, "yyyy-MM-dd"));
  };

  const getColorForDate = (date) => {
    const event = getEventsForDate(date);
    if (event) {
      const testSubjects = Object.values(event.subjects).filter((subj) => subj.status === "test");
      if (testSubjects.length) return "bg-red-900 text-white";

      const offCount = Object.values(event.subjects).filter((subj) => subj.status === "off").length;
      if (offCount === 1) return "bg-green-100 text-green-700";
      if (offCount === 2) return "bg-blue-100 text-blue-700";
      if (offCount === 3) return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const handleAddEditEvent = (date, newEvent) => {
    setEvents((prev) => {
      const existingIndex = prev.findIndex((event) => event.date === date);
      if (existingIndex !== -1) {
        const updatedEvents = [...prev];
        updatedEvents[existingIndex] = newEvent;
        return updatedEvents;
      }
      return [...prev, newEvent];
    });
    setModalData(null);
  };

  const handleDeleteEvent = (date) => {
    setEvents((prev) => prev.filter((event) => event.date !== date));
    setModalData(null);
  };

  const openModalForDate = (date) => {
    const event = getEventsForDate(date);
    setSelectedDate(format(date, "yyyy-MM-dd"));
    setModalData(event || { date: format(date, "yyyy-MM-dd"), subjects: {} });
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl text-gray-600 items-center w-full p-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <button onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))} className="btn btn-sm btn-outline">
          &lt; Prev
        </button>
        <h2 className="text-lg font-bold text-center">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))} className="btn btn-sm btn-outline">
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
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}

          {/* Dates */}
          {days.map((day) => (
            <motion.div
              key={day}
              onClick={() => openModalForDate(day)}
              className={`p-2 rounded-full cursor-pointer ${getColorForDate(day)} ${
                isToday(day) ? "bg-purple-200 text-purple-800 font-bold" : ""
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {format(day, "d")}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Event Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <h3 className="font-bold mb-4">{selectedDate || "Add/Edit Event"}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEditEvent(modalData.date, modalData);
              }}
            >
              {["Physics", "Chemistry", "Math"].map((subject) => (
                <div key={subject} className="mb-2">
                  <label className="block text-sm font-medium">{subject}</label>
                  <input
                    type="text"
                    placeholder="Teacher"
                    value={modalData.subjects[subject]?.teacher || ""}
                    onChange={(e) =>
                      setModalData((prev) => ({
                        ...prev,
                        subjects: {
                          ...prev.subjects,
                          [subject]: { ...prev.subjects[subject], teacher: e.target.value },
                        },
                      }))
                    }
                    className="input input-sm input-bordered w-full mb-2"
                  />
                  <select
                    value={modalData.subjects[subject]?.status || "off"}
                    onChange={(e) =>
                      setModalData((prev) => ({
                        ...prev,
                        subjects: {
                          ...prev.subjects,
                          [subject]: { ...prev.subjects[subject], status: e.target.value },
                        },
                      }))
                    }
                    className="select select-sm select-bordered w-full"
                  >
                    <option value="on">On</option>
                    <option value="off">Off</option>
                    <option value="test">Test</option>
                  </select>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-primary btn-sm">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(modalData.date)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
                <button type="button" onClick={() => setModalData(null)} className="btn btn-outline btn-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            <Timetable />

    </div>
  );
};

export default Calendar;
