"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";

// Define the structure for the timetable
interface TimetableItem {
  icon: string;
  name: string;
  time: string;
}

interface TimetableData {
  class: number;
  schedule: TimetableItem[];
}

const Timetable: React.FC = () => {
  const { data: session, status } = useSession();
  const [timetable, setTimetable] = useState<TimetableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      signIn(); // Redirect unauthenticated users to sign-in
      return;
    }

    const fetchTimetable = async () => {
      try {
        if (!session?.user?.class) {
          console.error("User class is not available in the session");
          return;
        }

        const response = await fetch("/api/timetable", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ class: session.user.class }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch timetable");
        }

        const data: TimetableData = await response.json();
        setTimetable(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [status, session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!timetable) {
    return <div>No timetable data available for your class.</div>;
  }

  return (
    <div className="mt-6 w-full flex items-center justify-center relative">
      {/* Left Button */}
      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full"
      >
        &lt;
      </button>

      {/* Timetable Notification Items */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex space-x-4"
          initial={{ x: -100 }}
          animate={{ x: -currentIndex * 100 + "%" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {timetable.schedule.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-yellow-100 p-4 rounded-lg min-w-[calc(95%/2)]"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="ml-4">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.time}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Button */}
      <button
        onClick={() =>
          setCurrentIndex(
            Math.min(timetable.schedule.length - 4, currentIndex + 1)
          )
        }
        className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default Timetable;
