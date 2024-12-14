import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Notice {
  title: string;
  author: string;
  image?: string;
  link?: string; // Optional link for each notice
}

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch session data
  const { data: session, status } = useSession();

  // Get the class ID from the session
  const classId = session?.user?.class || "";

  // Framer Motion variants for animation
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
  };

  // Fetch notices automatically when the component mounts
  useEffect(() => {
    if (!classId) {
      alert("Class ID not found in session");
      return;
    }

    const fetchNotices = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/notice?classId=${classId}`);
        const data = await res.json();
        if (res.ok) {
          setNotices(data.notices || []);
        } else {
          alert(data.message || "Error fetching notices");
        }
      } catch (error) {
        alert("Error fetching notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [classId]); // Runs when the classId changes

  return (
    <motion.div
      className="card bg-white shadow-lg rounded-lg p-4 mt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-semibold text-primary-a20">Notice Board</h2>
      <ul className="mt-4 space-y-4 overflow-y-auto h-96">
        {notices.map((notice, index) => (
          <Link key={notice.title} href={notice.link || "#"} passHref>
            <motion.li
              key={index}
              className="flex items-center bg-gray-50 p-4 mb-2 rounded-xl shadow hover:shadow-xl"
              custom={index} // Custom property to control animation delay
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }} // Animate once the row enters the viewport
            >
              <img
                src={notice.image || "https://via.placeholder.com/100"} // Fallback image
                alt={notice.title}
                className="w-16 h-16 rounded-lg"
              />
              <div className="ml-4">
                <p className="font-semibold text-lg text-primary-a20">{notice.title}</p>
                <p className="text-sm text-gray-500">By {notice.author}</p>
              </div>
            </motion.li>
          </Link>
        ))}
      </ul>
    </motion.div>
  );
}
