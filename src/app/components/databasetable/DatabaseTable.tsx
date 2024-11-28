import { FC, useState } from "react";
import { motion } from "framer-motion";

const DatabaseTable: FC = () => {
  // Dummy data
  const initialData = [
    {
      name: "Glenn Maxwell",
      score: 95,
      subject: "Mathematics",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Cathe Heaven",
      score: 85,
      subject: "Physics",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Yeadar Gil",
      score: 45,
      subject: "Chemistry",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Preeth Shing",
      score: 80,
      subject: "Mathematics",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "John Doe",
      score: 70,
      subject: "Physics",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Jane Smith",
      score: 55,
      subject: "Chemistry",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Emily Watson",
      score: 75,
      subject: "Mathematics",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  // State for filtering and sorting
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  // Filter and sort data based on the subject filter or entire dataset
  const filteredData = subjectFilter
    ? initialData
        .filter((student) => student.subject === subjectFilter)
        .sort((a, b) => b.score - a.score)
        .map((student, index) => ({
          ...student,
          rank: index + 1, // Reassign rank based on filtered and sorted scores
        }))
    : initialData
        .sort((a, b) => b.score - a.score) // Sort globally by score
        .map((student, index) => ({
          ...student,
          rank: index + 1, // Reassign rank globally based on scores
        }));

  // Framer Motion variants for animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from below
    visible: {
      opacity: 1,
      y: 0, // Move to original position
      transition: {
        duration: 0.5, // Smooth transition for entire component
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -50 }, // Start from the left
    visible: (i: number) => ({
      opacity: 1,
      x: 0, // Move to original position
      transition: {
        delay: i * 0.1, // Delay animation for each row
        duration: 0.5,   // Smooth transition for each row
      },
    }),
  };

  return (
    <motion.div
      className="p-4 rounded-2xl bg-slate-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header and Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary-a30">Database</h2>

        {/* Dropdown Filter */}
        <select
          className="select select-bordered max-w-xs bg-transparent text-primary-a40"
          value={subjectFilter || ""}
          onChange={(e) => setSubjectFilter(e.target.value || null)}
        >
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-96 text-surface-a0">
        <table className="table w-full text-neutral border border-base-200">
          <thead>
            <tr>
              <th className="text-base px-4 py-4 text-left text-surface-a0">Student Name</th>
              <th className="text-base px-4 py-4 text-center text-surface-a0">Score</th>
              <th className="text-base px-4 py-4 text-center text-surface-a0">Subject</th>
              <th className="px-4 py-4 text-center text-surface-a0 text-base">Rank</th>
              <th className="px-4 py-4 text-center text-surface-a0 text-base">Pass/Fail</th>
            </tr>
          </thead>
          <motion.tbody
            className="divide-x"
            style={{
              maxHeight: "300px", // Limit the height to show only 6 rows
              overflowY: "auto",   // Enable vertical scrollbar when more than 6 rows
            }}
          >
            {filteredData.map((student, index) => (
              <motion.tr
                key={index}
                className="hover:bg-primary-content"
                custom={index}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }} // Animate once the row enters the viewport
              >
                <td className="px-4 py-3 flex items-center">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <span className="font-semibold text-base-content">{student.name}</span>
                </td>
                <td className="px-4 py-3 text-base text-center">
                  {student.score}/100
                </td>
                <td className="px-4 py-3 text-base text-center">
                  {student.subject}
                </td>
                <td className="px-4 py-3 text-base text-center">
                  {student.rank}
                </td>
                <td className="px-4 py-3 text-base text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      student.score >= 50
                        ? "bg-success text-success-content"
                        : "bg-error text-error-content"
                    }`}
                  >
                    {student.score >= 50 ? "Pass" : "Fail"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DatabaseTable;
