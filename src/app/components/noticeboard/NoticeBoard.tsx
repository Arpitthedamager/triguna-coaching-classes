import { motion } from "framer-motion";

const NoticeBoard = () => {
  const notices = [
    {
      title: "Notice of Special Examinations of Semester Spring 2021",
      author: "Justin Langer",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Time Extension Notice of Semester Admission",
      author: "Danial Vatory",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "COVID-19 Vaccination Survey October 2021",
      author: "Jacob Oram",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Scholarship Viva Notice Spring 2021",
      author: "Name",
      image: "https://via.placeholder.com/100",
    },
  ];

  // Framer Motion variants for animation
  const containerVariants = {
    hidden: { opacity: 0, x: 50 }, // Start from the right
    visible: {
      opacity: 1,
      x: 0, // Move to the original position
      transition: {
        duration: 0.5, // Smooth transition for the entire container
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 }, // Start from below
    visible: (i: number) => ({
      opacity: 1,
      y: 0, // Move to the original position
      transition: {
        delay: i * 0.3, // Stagger the animation for each row
        duration: 0.5,   // Smooth transition for each row
      },
    }),
  };

  return (
    <motion.div
      className="card bg-white shadow-lg rounded-lg p-4 mt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl font-semibold text-primary-a20">Notice Board</h2>
      <ul className="mt-4 space-y-4 overflow-y-auto h-96">
        {notices.map((notice, index) => (
          <motion.li
            key={index}
            className="flex items-center bg-gray-50 p-4 rounded-lg shadow"
            custom={index}  // Custom property to control animation delay
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Animate once the row enters the viewport
          >
            <img
              src={notice.image}
              alt={notice.title}
              className="w-16 h-16 rounded-lg"
            />
            <div className="ml-4">
              <p className="font-semibold text-SessionContext">{notice.title}</p>
              <p className="text-sm text-gray-500">By {notice.author}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NoticeBoard;
