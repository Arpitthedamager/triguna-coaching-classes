"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Student {
  name: string;
  grade: string;
  percentage: number;
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

const Gallery = () => {
  const schoolData: SchoolData = {
    location: "Agra, India",
    name: "Triguna Coaching Classes",
    year: "2023-2024",
    type: "Student Results",
    description:
      "Our students excel in academics, and this page showcases their performance in recent tests. Explore their progress and achievements.",
    students: [
      {
        name: "Sankalp",
        grade: "10th Grade",
        percentage: 95,
        photo: "/topstudents/1.jpg",
      },
      {
        name: "Bhavna",
        grade: "10th Grade",
        percentage: 88.6,
        photo: "/topstudents/2.jpg",
      },
      {
        name: "Ritika",
        grade: "12th Grade",
        percentage: 92,
        photo: "/topstudents/3.jpg",
      },
      {
        name: "Nikhil",
        grade: "10th Grade",
        percentage: 90.2,
        photo: "/topstudents/4.jpg",
      },
      {
        name: "Aman",
        grade: "10th Grade",
        percentage: 89,
        photo: "/topstudents/5.jpg",
      },
      {
        name: "Ankur",
        grade: "10th Grade",
        percentage: 96,
        photo: "/topstudents/6.jpg",
      },
      {
        name: "Simiran",
        grade: "10th Grade",
        percentage: 87,
        photo: "/topstudents/7.jpg",
      },
      {
        name: "Ashish",
        grade: "12th Grade",
        percentage: 89,
        photo: "/topstudents/8.jpg",
      },
      {
        name: "Smriti",
        grade: "12th Grade",
        percentage: 89,
        photo: "/topstudents/9.jpg",
      },
      {
        name: "Arpit",
        grade: "12th Grade",
        percentage: 95.2,
        photo: "/topstudents/10.jpg",
      },
      {
        name: "Pratigya",
        grade: "10th Grade",
        percentage: 96,
        photo: "/topstudents/11.jpg",
      },
      {
        name: "Nitin kumar",
        grade: "12th Grade",
        percentage: 86,
        photo: "/topstudents/12.jpg",
      },
      {
        name: "Kavya",
        grade: "12th Grade",
        percentage: 88,
        photo: "/topstudents/13.jpg",
      },
      {
        name: "Ashish",
        grade: "jee mains",
        percentage: 99.64,
        photo: "/topstudents/14.jpg",
      },
      {
        name: "Ashish",
        grade: "12th Grade ",
        percentage: 91.4,
        photo: "/topstudents/14.jpg",
      },
    ],
  };

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedStudents = [...schoolData.students]
    .sort((a, b) =>
      sortOrder === "asc"
        ? b.percentage - a.percentage
        : a.percentage - b.percentage
    )
    .slice(0, 8); // Limit to 8 students

  return (
    <div className="flex flex-col lg:flex-row gap-12 px-6 md:py-16 lg:px-24 bg-primary-content">
      {/* Left Section */}
      <div className="lg:w-1/3 md:py-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 hidden lg:block"
        >
          {["Location", "Name", "Year", "Type"].map((label, index) => {
            const value =
              schoolData[
                label.toLowerCase().replace(" ", "") as keyof SchoolData
              ];

            return (
              <div key={index}>
                <p className="text-sm text-primary-a40">{label}</p>
                <p className="font-medium text-primary-a20">
                  {Array.isArray(value)
                    ? `Total Students: ${value.length}`
                    : value}{" "}
                </p>
              </div>
            );
          })}
        </motion.div>
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

      {/* Right Section */}
      <div className="lg:w-2/3">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {sortedStudents.map((student, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                rotate: index % 2 === 0 ? 5 : -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.4, type: "spring" }}
              className={`relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-tr from-white via-gray-100 to-gray-50 p-4 flex flex-col justify-between transform ${
                index % 3 === 0 ? "rotate-[-2deg]" : "rotate-[1deg]"
              }`}
            >
              <div className="flex flex-col h-full">
                <Image
                  width={300}
                  height={300}
                  src={student.photo}
                  alt={student.name}
                  className="w-full h-48 object-fill rounded-lg shadow-md"
                />
                <div className="mt-4 flex-grow space-y-2">
                  <div className="bg-green-500 text-white px-3 py-1  rounded-full text-xs font-bold">
                    {student.grade}
                  </div>
                  <p className="text-lg font-semibold text-primary-a20">
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Percentage:{" "}
                    <span className="font-semibold text-green-600">
                      {student.percentage}%
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <Link href="/gallery" className="block md:hidden text-center">
          <button className="text-primary-a20 font-semibold hover:underline mt-6">
            Show More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;
