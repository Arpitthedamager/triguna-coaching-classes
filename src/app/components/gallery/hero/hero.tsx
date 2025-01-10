"use client";
"use client";

import { motion } from "framer-motion";

// Define the type for student data
interface Student {
  name: string;
  grade: string;
  marks: number;
  totalMarks: number;
  photo: string;
}

interface SchoolData {
  location: string;
  name: string;
  year: string;
  type: string;
  description: string;
  students: Student[];
}

const SchoolResults = () => {
  // Example data (you can fetch this dynamically)
  const schoolData: SchoolData = {
    location: "Agra, India",
    name: "Triguna Coaching Classes",
    year: "2025",
    type: "Student Results",
    description:
      "Our students excel in academics, and this page showcases their performance in recent tests. Explore their progress and achievements.",
    students: [
      {
        name: "Amit Sharma",
        grade: "10th Grade",
        marks: 85,
        totalMarks: 100,
        photo: "/students/amit.jpg",
      },
      {
        name: "Priya Gupta",
        grade: "9th Grade",
        marks: 92,
        totalMarks: 100,
        photo: "/students/priya.jpg",
      },
      {
        name: "Rahul Verma",
        grade: "11th Grade",
        marks: 88,
        totalMarks: 100,
        photo: "/students/rahul.jpg",
      },
      {
        name: "Sneha Yadav",
        grade: "12th Grade",
        marks: 91,
        totalMarks: 100,
        photo: "/students/sneha.jpg",
      },
      {
        name: "Manish Kumar",
        grade: "10th Grade",
        marks: 75,
        totalMarks: 100,
        photo: "/students/manish.jpg",
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 px-6 py-16 lg:px-24 bg-primary-content">
      {/* Left Section - School Information */}
      <div className="lg:w-1/3 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div>
            <p className="text-sm text-primary-a40">Location</p>
            <p className="font-medium text-primary-a20">{schoolData.location}</p>
          </div>
          <div>
            <p className="text-sm text-primary-a40">School Name</p>
            <p className="font-medium text-green-600">{schoolData.name}</p>
          </div>
          <div>
            <p className="text-sm text-primary-a40">Year</p>
            <p className="font-medium text-primary-a20">{schoolData.year}</p>
          </div>
          <div>
            <p className="text-sm text-primary-a40">Type</p>
            <p className="font-medium text-primary-a20">{schoolData.type}</p>
          </div>
        </motion.div>

        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-primary-a20 leading-snug">
            Student Results from{" "}
            <span className="text-green-600">{schoolData.name}</span>
          </h1>
          <p className="text-sm text-gray-600 mt-4">{schoolData.description}</p>
        </motion.div>
      </div>

      {/* Right Section - Student Data */}
      <motion.div
        className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {schoolData.students.map((student, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.4, type: "spring" }}
            className="overflow-hidden rounded-lg shadow-lg bg-white"
          >
            <img
              src={student.photo}
              alt={student.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <p className="text-lg font-semibold text-primary-a20">
                {student.name}
              </p>
              <p className="text-sm text-gray-600">{student.grade}</p>
              <p className="text-sm text-gray-600">
                Marks:{" "}
                <span className="font-semibold text-green-600">
                  {student.marks}/{student.totalMarks}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SchoolResults;
