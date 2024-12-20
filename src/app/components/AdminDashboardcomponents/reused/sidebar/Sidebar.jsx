"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const menuItemVariants = {
    hidden: { x: "-50%", opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const handleShare = async () => {
    const shareData = {
      title: "Invite to Triguna Coaching Classes",
      text: "Join Triguna Coaching Classes with me! Click the link below to get started.",
      url: "https://trigunacoaching.in",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        alert("Invitation shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Invitation link copied to clipboard!");
    }
  };

  const menuItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Profile", key: "profile" },
    { label: "Study Materials", key: "studyMaterials" },
    // { label: "Students", key: "students" },
    { label: "Exams", key: "exams" },
    { label: "Results", key: "results" },
    { label: "Fees", key: "fees" },
  ];

  return (
    <>
      <button
        className="lg:hidden absolute top-4 left-4 z-50 bg-primary-a20 text-white p-2 rounded-full shadow-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <motion.aside
        className={`fixed top-0 left-0 z-40 bg-base-100 shadow-lg h-screen flex flex-col justify-between lg:static lg:w-64 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen || window.innerWidth >= 1024 ? "visible" : "hidden"}
      >
        <div className="p-4 ">
          <h2 className="text-2xl font-bold pb-4 pl-2 text-primary-a10">
            Triguna Coaching Classes
          </h2>
          <ul className="menu p-0">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.key}
                className="font-semibold rounded-full text-gray-600 hover:bg-primary-a20 hover:text-white transition-all"
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => {
                  onMenuClick(item.key);
                  setIsOpen(false);
                }}
              >
                <Link href="#">{item.label}</Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.div
          className="p-4 bg-transparent text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-56 h-56"
            >
              <Image
                src="/slidebar/slidebarimage.svg"
                alt="Invite"
                width={224}
                height={224}  
              />
            </motion.div>
            <motion.button
              className="btn bg-primary-a20 text-white mt-4 px-8 hover:bg-primary-a30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleShare}
            >
              Invite Friend
            </motion.button>
          </div>
        </motion.div>
      </motion.aside>

      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-30 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        ></motion.div>
      )}
    </>
  );
};

export default Sidebar;
