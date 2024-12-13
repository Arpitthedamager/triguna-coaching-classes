import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Importing Link for navigation

interface Notice {
  title: string;
  author: string;
  image?: string;
  link?: string; // Optional link for each notice
}

export default function NoticeForm() {
  const [classId, setClassId] = useState<number | "">(9);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState(""); // State for the link
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch notices automatically when classId changes
  useEffect(() => {
    if (!classId) return;
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
  }, [classId]);

  const handleAddNotice = async () => {
    if (!classId || !title || !author) {
      return alert("All fields are required");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, title, author, image, link }), // Send link as well
      });
      const data = await res.json();
      if (res.ok) {
        alert("Notice added successfully");
        setIsModalOpen(false);
      } else {
        alert(data.message || "Error adding notice");
      }
    } catch (error) {
      alert("Error adding notice");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (noticeTitle: string) => {
    if (!classId || !noticeTitle) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notice", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, noticeTitle }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Notice deleted successfully");
        setNotices(notices.filter((notice) => notice.title !== noticeTitle));
      } else {
        alert(data.message || "Error deleting notice");
      }
    } catch (error) {
      alert("Error deleting notice");
    } finally {
      setLoading(false);
    }
  };

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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Manage Notices</h1>

      {/* Class ID Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Class</label>
        <select
          value={classId}
          onChange={(e) => setClassId(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      {/* Animated Add Notice Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4"
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v14m7-7H5"
          />
        </svg>
      </motion.button>

      {/* Modal for Adding Notice */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Notice</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter link for the notice"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNotice}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Adding..." : "Add Notice"}
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-lg font-bold mb-2">Notices</h2>
      <motion.div
        className="card bg-white shadow-lg rounded-lg p-4 mt-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-semibold text-primary-a20">
          Notice Board
        </h2>
        <ul className="mt-4 space-y-4 overflow-y-auto h-96">
          {notices.map((notice, index) => (
            <Link key={notice.title} href={notice.link || "#"} passHref>
              <motion.li
                key={index}
                className="flex items-center bg-gray-50 p-4 rounded-lg shadow my-2"
                custom={index}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src={notice.image || "https://via.placeholder.com/100"}
                  alt={notice.title}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="ml-4">
                  <p className="font-semibold text-primary-a20">
                    {notice.title}
                  </p>
                  <p className="text-sm text-gray-500">By {notice.author}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteNotice(notice.title)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </motion.li>
            </Link>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
