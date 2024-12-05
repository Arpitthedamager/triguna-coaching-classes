"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const Timetable = () => {
  // Timetable-style notifications (static data)
  const initialNotifications = [
    { icon: "🍔", name: "Nathan Macclam", time: "10 AM - 12 PM" },
    { icon: "🚕", name: "Dinal Vatoy", time: "12 PM - 2 PM" },
    { icon: "📚", name: "Sarah Lee", time: "2 PM - 4 PM" },
    { icon: "🎮", name: "George Dark", time: "4 PM - 6 PM" },
    { icon: "🍕", name: "Jessica Smith", time: "6 PM - 8 PM" },
    { icon: "✈️", name: "Oliver Stone", time: "8 PM - 10 PM" },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for adding/editing notifications
  const [newNotification, setNewNotification] = useState({ icon: "", name: "", time: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Scroll functions
  const handleScrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleScrollRight = () => {
    setCurrentIndex(Math.min(notifications.length - 4, currentIndex + 1)); // Ensuring we don't go beyond the last set of items
  };

  // Add or Edit Notification
  const handleSaveNotification = () => {
    if (editIndex !== null) {
      // Edit existing notification
      const updatedNotifications = [...notifications];
      updatedNotifications[editIndex] = newNotification;
      setNotifications(updatedNotifications);
      setEditIndex(null);
    } else {
      // Add new notification
      setNotifications([...notifications, newNotification]);
    }
    setNewNotification({ icon: "", name: "", time: "" });
  };

  // Delete Notification
  const handleDeleteNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 w-full flex items-center justify-center relative">
      {/* Left Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full"
      >
        &lt;
      </button>

      {/* Timetable Notification Items */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex space-x-4"
          initial={{ x: -100 }} // Initial position off-screen (left)
          animate={{ x: -currentIndex * 100 + "%" }} // Slide effect based on index
          transition={{ type: "spring", stiffness: 300 }}
        >
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-center bg-yellow-100 p-4 rounded-lg min-w-[calc(95%/2)]" // 4 items per slide
            >
              <span className="text-2xl">{notification.icon}</span>
              <div className="ml-4">
                <p className="font-semibold">{notification.name}</p>
                <p className="text-sm text-gray-600">{notification.time}</p>
              </div>

              {/* Admin Controls */}
              <div className="ml-4">
                <button
                  onClick={() => {
                    setNewNotification(notification);
                    setEditIndex(index);
                  }}
                  className="btn btn-sm btn-secondary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNotification(index)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full"
      >
        &gt;
      </button>

      {/* Admin Controls: Add or Edit Notification */}
      <div className="mt-6 w-full flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Add / Edit Notification</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Icon (e.g., 🍔)"
            value={newNotification.icon}
            onChange={(e) => setNewNotification({ ...newNotification, icon: e.target.value })}
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="Name"
            value={newNotification.name}
            onChange={(e) => setNewNotification({ ...newNotification, name: e.target.value })}
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="Time (e.g., 10 AM - 12 PM)"
            value={newNotification.time}
            onChange={(e) => setNewNotification({ ...newNotification, time: e.target.value })}
            className="input input-bordered"
          />
          <button
            onClick={handleSaveNotification}
            className="btn btn-primary"
          >
            {editIndex !== null ? "Update Notification" : "Add Notification"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
