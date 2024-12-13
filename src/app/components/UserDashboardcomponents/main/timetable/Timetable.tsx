"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react"; // Import the useSession hook

type Notification = {
  icon: string;
  name: string;
  time: string;
};

const Timetable = () => {
  const { data: session, status } = useSession(); // Access session data
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for scrolling

  // Get the class ID from the session
  const classId = session?.user?.class || ""; // Fallback to empty string if class is not available

  // Fetch timetable data for the selected class
  useEffect(() => {
    if (!classId) return; // Don't fetch if classId is not available

    const fetchTimetable = async () => {
      const response = await fetch(`/api/timetable?class=${classId}`);
      const data = await response.json();
      setNotifications(data.schedule || []);
    };

    fetchTimetable();
  }, [classId]); // Dependency on classId from session

  if (status === "loading") {
    return <p>Loading...</p>; // Display loading message while session is being fetched
  }

  if (status === "unauthenticated") {
    return <p>Please log in to view the timetable.</p>; // Display if user is not authenticated
  }

  // Scroll functions
  const handleScrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1)); // Scroll one item left
  };

  const handleScrollRight = () => {
    setCurrentIndex(Math.min(notifications.length - 1, currentIndex + 1)); // Scroll one item right
  };

  return (
    <div className="mt-6 w-full flex flex-col items-center justify-center relative">
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
          {notifications.length === 0 ? (
            <p>No notifications available.</p>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="group ml-2 flex-shrink-0 w-full max-w-52 items-center bg-yellow-100 p-4 rounded-lg shadow relative"
              >
                <span className="text-2xl">{notification.icon}</span>
                <div className="ml-4">
                  <p className="font-semibold">{notification.name}</p>
                  <p className="text-sm text-gray-600">{notification.time}</p>
                </div>
              </div>
            ))
          )}
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
    </div>
  );
};

export default Timetable;
