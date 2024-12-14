"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Notification = {
  icon: string;
  name: string;
  time: string;
};

const Timetable = () => {
  const [classSelected, setClassSelected] = useState(9); // Default class
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState<Notification>({
    icon: "",
    name: "",
    time: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch timetable data for the selected class
  useEffect(() => {
    const fetchTimetable = async () => {
      const response = await fetch(`/api/timetable?class=${classSelected}`);
      const data = await response.json();
      setNotifications(data.schedule || []);
    };

    fetchTimetable();
  }, [classSelected]);

  // Add Notification
  const handleAddNotification = async () => {
    if (!newNotification.icon || !newNotification.name || !newNotification.time) {
      alert("All fields are required!");
      return;
    }

    const response = await fetch(`/api/timetable`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ class: classSelected, ...newNotification }),
    });

    if (response.ok) {
      const updatedTimetable = await response.json();
      setNotifications(updatedTimetable.schedule);
      setNewNotification({ icon: "", name: "", time: "" });
      setIsModalOpen(false); // Close modal
    } else {
      alert("Failed to add notification");
    }
  };

  // Delete Notification
  const handleDeleteNotification = async (index: number) => {
    const response = await fetch(`/api/timetable`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ class: classSelected, index }),
    });

    if (response.ok) {
      const updatedTimetable = await response.json();
      setNotifications(updatedTimetable.schedule);
    } else {
      alert("Failed to delete notification");
    }
  };

  // Scroll functions
  const handleScrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1)); // Scroll one item left
  };

  const handleScrollRight = () => {
    setCurrentIndex(Math.min(notifications.length - 1, currentIndex + 1)); // Scroll one item right
  };

  return (
    <div className="mt-6 w-full flex flex-col items-center justify-center relative">
      {/* Class Selector */}
      <select
        value={classSelected}
        onChange={(e) => setClassSelected(Number(e.target.value))}
        className="mb-4 p-2 border rounded"
      >
        {[9, 10, 11, 12].map((cls) => (
          <option key={cls} value={cls}>
            Class {cls}
          </option>
        ))}
      </select>
      

      {/* Timetable Notification Items */}
      {currentIndex > 0 && (
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full"
        >
          &lt;
        </button>
      )}

      <div className="w-full overflow-hidden relative">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * 50 + "%" }} // Move one item at a time
          transition={{ type: "spring", stiffness: 900, damping: 300 }} 
         
        >
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="group ml-2 flex-shrink-0 w-full max-w-52 items-center bg-yellow-100 p-4 rounded-lg shadow relative"
            >
              <span className="text-2xl">{notification.icon}</span>
              <div className="ml-4">
                <p className="font-semibold">{notification.name}</p>
                <p className="text-sm text-gray-600">{notification.time}</p>
              </div>
              <button
                onClick={() => handleDeleteNotification(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      {currentIndex < notifications.length - 1 && (
        <button
          onClick={handleScrollRight}
          className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full"
        >
          &gt;
        </button>
      )}

      {/* Add Notification Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Notification
      </button>

      {/* Add Notification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="mb-4 text-lg font-semibold">Add Notification</h3>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newNotification.icon}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    icon: e.target.value,
                  })
                }
                placeholder="Icon"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={newNotification.name}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    name: e.target.value,
                  })
                }
                placeholder="Name"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={newNotification.time}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    time: e.target.value,
                  })
                }
                placeholder="Time"
                className="p-2 border rounded"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNotification}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
