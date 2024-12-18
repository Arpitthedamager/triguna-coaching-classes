import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import AddStudentButton from "../../onetimeusedcomponents/addstudentbutton/AddStudentButton";

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
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("9"); // Default to "9"
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState<string>("All");
  const [visibleRows, setVisibleRows] = useState<number>(8);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/database/fetchdata");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          const formattedData = result.data.map((cls: any) => ({
            className: cls.class, // Map `class` to `ClassData` key
            physics: cls.physics || [],
            chemistry: cls.chemistry || [],
            maths: cls.maths || [],
          }));
          setClasses(formattedData);
        } else {
          console.error("API returned an error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };
    

    // Mock data for testing
    const mockData: ClassData[] = [
      {
        className: "9",
        physics: [
          {
            userEmail: "student1@example.com",
            userName: "John Doe",
            tests: [
              {
                date: new Date(),
                marksObtained: 90,
                totalMarks: 100,
              },
            ],
          },
        ],
        chemistry: [],
        maths: [],
      },
      {
        className: "10",
        physics: [],
        chemistry: [],
        maths: [],
      },
    ];
    setClasses(mockData);

    // Uncomment the following line to fetch from API
    fetchData();
  }, []);

  const getFilteredData = () => {
    const currentClassData = classes.find(
      (cls) => cls.className === selectedClass
    );
  
    if (!currentClassData) return [];
  
    let filteredStudents: Student[] = [];
  
    if (subjectFilter === "Physics") {
      filteredStudents = currentClassData.physics;
    } else if (subjectFilter === "Chemistry") {
      filteredStudents = currentClassData.chemistry;
    } else if (subjectFilter === "Mathematics") {
      filteredStudents = currentClassData.maths;
    } else {
      filteredStudents = [
        ...currentClassData.physics,
        ...currentClassData.chemistry,
        ...currentClassData.maths,
      ];
    }
  
    const filteredByMonth = filteredStudents.filter((student) =>
      student.tests.some(
        (test) =>
          monthFilter === "All" ||
          new Date(test.date).getMonth() === months.indexOf(monthFilter)
      )
    );
  
    return filteredByMonth
      .map((student) => {
        const latestTest = student.tests[student.tests.length - 1];
        const percentage =
          (latestTest.marksObtained / latestTest.totalMarks) * 100;
  
        // Map subject names based on the selected class
        const subjectName =
          currentClassData.physics.includes(student)
            ? selectedClass === "9" || selectedClass === "10"
              ? "SST"
              : "Physics"
            : currentClassData.chemistry.includes(student)
            ? selectedClass === "9" || selectedClass === "10"
              ? "Science"
              : "Chemistry"
            : "Mathematics";
  
        return {
          name: student.userName,
          score: `${latestTest.marksObtained}/${latestTest.totalMarks}`,
          percentage,
          subject: subjectName,
          rank: 0,
          pass: percentage >= 33.3,
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .map((student, index) => ({
        ...student,
        rank: index + 1,
      }));
  };
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight;
    if (bottom) {
      setVisibleRows((prev) => prev + 8);
    }
  };

  const filteredData = getFilteredData();

  return (
    <motion.div
      className="p-4 rounded-2xl bg-slate-50"
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between space-x-2 items-center mb-6">
        <h2 className="text-3xl font-bold text-primary-a30">Class Database</h2>
        <AddStudentButton />
        <select
          className="select select-bordered max-w-xs bg-transparent text-primary-a40"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
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
        <select
          className="select select-bordered max-w-xs bg-transparent text-primary-a40"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        >
          <option value="All">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div
        className="overflow-x-auto h-96 text-surface-a0"
        onScroll={handleScroll}
      >
        <table className="table w-full text-neutral border border-base-200">
          <thead>
            <tr>
              <th className="text-base px-4 py-4 text-left">Student Name</th>
              <th className="text-base px-4 py-4 text-center">Score</th>
              <th className="text-base px-4 py-4 text-center">Percentage</th>
              <th className="text-base px-4 py-4 text-center">Subject</th>
              <th className="px-4 py-4 text-center text-base">Rank</th>
              <th className="px-4 py-4 text-center text-base">Pass/Fail</th>
            </tr>
          </thead>
          <motion.tbody>
            {filteredData.slice(0, visibleRows).map((student, index) => (
              <motion.tr key={index} className="hover:bg-primary-content">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3 text-center">{student.score}</td>
                <td className="px-4 py-3 text-center">
                  {student.percentage.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-center">{student.subject}</td>
                <td className="px-4 py-3 text-center">{student.rank}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      student.pass
                        ? "bg-success text-success-content"
                        : "bg-error text-error-content"
                    }`}
                  >
                    {student.pass ? "Pass" : "Fail"}
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
