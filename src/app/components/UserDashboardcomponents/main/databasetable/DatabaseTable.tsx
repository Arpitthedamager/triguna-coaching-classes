import { FC, useState } from "react";
import { motion } from "framer-motion";

interface Test {
  date: Date;
  marksObtained: number;
  totalMarks: number;
}

interface Student {
  userEmail: string;
  userName: string;
  tests: Test[];
}

interface ClassData {
  className: string;
  physics: Student[];
  chemistry: Student[];
  maths: Student[];
}

const DatabaseTable: FC = () => {
  // Sample class data based on your new structure
  const classData: ClassData = {
    className: "10th Grade",
    physics: [
      {
        userEmail: "glenn@example.com",
        userName: "Glenn",
        tests: [
          { date: new Date(), marksObtained: 95, totalMarks: 100 },
        ],
      },
      // Other physics students
    ],
    chemistry: [
      {
        userEmail: "cathe@example.com",
        userName: "Cathe",
        tests: [
          { date: new Date(), marksObtained: 85, totalMarks: 100 },
        ],
      },
      // Other chemistry students
    ],
    maths: [
      {
        userEmail: "yeadar@example.com",
        userName: "Yea",
        tests: [
          { date: new Date(), marksObtained: 45, totalMarks: 100 },
        ],
      },
      // Other maths students
    ],
  };

  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  // Extracting relevant student data
  const getFilteredData = (subject: string | null) => {
    let filteredStudents: Student[] = [];

    if (subject === "Physics") {
      filteredStudents = classData.physics;
    } else if (subject === "Chemistry") {
      filteredStudents = classData.chemistry;
    } else if (subject === "Mathematics") {
      filteredStudents = classData.maths;
    } else {
      // Include all subjects if no filter is set
      filteredStudents = [
        ...classData.physics,
        ...classData.chemistry,
        ...classData.maths,
      ];
    }

    // Create a list of students with their highest score
    const studentData = filteredStudents
      .map((student) => {
        const latestTest = student.tests[student.tests.length - 1];
        let subjectName = "Unknown Subject";

        // Determine the subject based on which list the student is in
        if (classData.physics.includes(student)) {
          subjectName = "Physics";
        } else if (classData.chemistry.includes(student)) {
          subjectName = "Chemistry";
        } else if (classData.maths.includes(student)) {
          subjectName = "Mathematics";
        }

        return {
          name: student.userName,  // Use the user's name from the `userName` property
          score: latestTest.marksObtained,
          subject: subjectName,
          rank: 0, // Rank will be added later
        };
      })
      .sort((a, b) => b.score - a.score); // Sort by score

    // Assign ranks
    return studentData.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
  };

  const filteredData = getFilteredData(subjectFilter);

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
                    src={`https://via.placeholder.com/40`}
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
