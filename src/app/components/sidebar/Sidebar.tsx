import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Sidebar: FC<{ onMenuClick: (menu: string) => void }> = ({ onMenuClick }) => {
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.5 } },
  };

  const menuItemVariants = {
    hidden: { x: "-50%", opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
      },
    }),
  };

  const menuItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Profile", key: "profile" },
    { label: "Study Materials", key: "studyMaterials" },
    { label: "Students", key: "students" },
    { label: "Exams", key: "exams" },
    { label: "Results", key: "results" },
    { label: "Fees", key: "fees" },
  ];

  return (
    <motion.aside
      className="w-64 bg-base-100 shadow-lg h-screen flex flex-col justify-between"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold pb-4 pl-2 text-primary">Triguna Coaching Classes</h2>
        <ul className="menu p-0">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.key}
              className="font-semibold rounded-full text-gray-400 hover:bg-primary-a20 hover:text-white"
              custom={index}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => onMenuClick(item.key)} // Update active content
            >
              <Link href="#">{item.label}</Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
