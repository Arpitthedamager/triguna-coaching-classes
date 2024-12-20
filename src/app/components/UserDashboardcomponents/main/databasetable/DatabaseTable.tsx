import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null); // Dynamically set from session
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

  useEffect(() => {
    if (session && session.user && session.user.class) {
      setSelectedClass(String(session.user.class)); // Convert to string
      // console.log(session?.user.class);
    } else {
      // console.warn("Class information not found in session.");
    }
  }, [session]);

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

    // Uncomment the following line to fetch from API
    fetchData();
  }, []);
  // Logic to dynamically change subjects based on class
  const getSubjectOptions = () => {
    if (selectedClass === "9" || selectedClass === "10") {
      return [
        { value: "Mathematics", label: "Mathematics" },
        { value: "Physics", label: "SST" },
        { value: "Chemistry", label: "Science" },
      ];
    }
    return [
      { value: "Mathematics", label: "Mathematics" },
      { value: "Physics", label: "Physics" },
      { value: "Chemistry", label: "Chemistry" },
    ];
  };
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
        const subjectName = currentClassData.physics.includes(student)
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary-a30">Class Database</h2>
        <div className="md:flex  space-x-4">
          <select
            className="select select-bordered md:max-w-xs bg-transparent text-primary-a40"
            value={subjectFilter || ""}
            onChange={(e) => setSubjectFilter(e.target.value || null)}
          >
            <option value="">All Subjects</option>
            {getSubjectOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered md:max-w-xs bg-transparent text-primary-a40"
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
      </div>

      <div className="overflow-x-auto h-96 hidden md:block lg:block" onScroll={handleScroll}>
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
              <motion.tr
                key={index}
                whileHover={{ scale: 1.02 }}
                className="hover:bg-primary-content"
              >
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

      <div className="lg:hidden md:hidden grid grid-cols-2 gap-4">
        {filteredData.slice(0, visibleRows).map((student, index) => (
          <motion.div
            key={index}
            className="bg-white text-gray-600 shadow-lg rounded-lg p-4 border border-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold text-lg">{student.name}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  student.pass
                    ? "bg-success text-success-content"
                    : "bg-error text-error-content"
                }`}
              >
                {student.pass ? "Pass" : "Fail"}
              </span>
            </div>
            <div className="text-sm">
              <p>
                <span className="font-semibold">Score:</span> {student.score}
              </p>
              <p>
                <span className="font-semibold">Percentage:</span>{" "}
                {student.percentage.toFixed(2)}%
              </p>
              <p>
                <span className="font-semibold">Subject:</span>{" "}
                {student.subject}
              </p>
              <p>
                <span className="font-semibold">Rank:</span> {student.rank}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DatabaseTable;
