import { FC, useState } from "react";
import { motion } from "framer-motion";

const DatabaseTable: FC = () => {
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

  const [data, setData] = useState(initialData);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [editStudent, setEditStudent] = useState<any>(null); // Track student to be edited
  const [newStudent, setNewStudent] = useState({
    name: "",
    score: 0,
    subject: "",
    avatar: "",
  });

  const filteredData = subjectFilter
    ? data
        .filter((student) => student.subject === subjectFilter)
        .sort((a, b) => b.score - a.score)
        .map((student, index) => ({
          ...student,
          rank: index + 1,
        }))
    : data
        .sort((a, b) => b.score - a.score)
        .map((student, index) => ({
          ...student,
          rank: index + 1,
        }));

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const handleAddOrEditStudent = () => {
    if (editStudent) {
      // Edit existing student
      setData((prevData) =>
        prevData.map((student) =>
          student.name === editStudent.name ? { ...student, ...newStudent } : student
        )
      );
      setEditStudent(null);
    } else {
      // Add new student
      setData((prevData) => [...prevData, { ...newStudent, rank: data.length + 1 }]);
    }

    // Reset form
    setNewStudent({ name: "", score: 0, subject: "", avatar: "" });
  };

  const handleEdit = (student: any) => {
    setEditStudent(student);
    setNewStudent(student);
  };

  const handleDelete = (name: string) => {
    setData((prevData) => prevData.filter((student) => student.name !== name));
  };

  return (
    <motion.div
      className="p-4 rounded-2xl bg-slate-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary-a30">Class Database</h2>

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

      {/* Add/Edit Student Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">
          {editStudent ? "Edit Student" : "Add New Student"}
        </h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            placeholder="Score"
            value={newStudent.score}
            onChange={(e) => setNewStudent({ ...newStudent, score: +e.target.value })}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Subject"
            value={newStudent.subject}
            onChange={(e) => setNewStudent({ ...newStudent, subject: e.target.value })}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={newStudent.avatar}
            onChange={(e) => setNewStudent({ ...newStudent, avatar: e.target.value })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button
          onClick={handleAddOrEditStudent}
          className="btn btn-primary w-full"
        >
          {editStudent ? "Update Student" : "Add Student"}
        </button>
      </div>

      <div className="overflow-x-auto h-96 text-surface-a0">
        <table className="table w-full text-neutral border border-base-200">
          <thead>
            <tr>
              <th className="text-base px-4 py-4 text-left text-surface-a0">Student Name</th>
              <th className="text-base px-4 py-4 text-center text-surface-a0">Score</th>
              <th className="text-base px-4 py-4 text-center text-surface-a0">Subject</th>
              <th className="px-4 py-4 text-center text-surface-a0 text-base">Rank</th>
              <th className="px-4 py-4 text-center text-surface-a0 text-base">Pass/Fail</th>
              <th className="px-4 py-4 text-center text-surface-a0 text-base">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            className="divide-x"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
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
                viewport={{ once: true, amount: 0.1 }}
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
                <td className="px-4 py-3 text-base text-center">
                  <button
                    onClick={() => handleEdit(student)}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.name)}
                    className="btn btn-sm btn-error ml-2"
                  >
                    Delete
                  </button>
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
