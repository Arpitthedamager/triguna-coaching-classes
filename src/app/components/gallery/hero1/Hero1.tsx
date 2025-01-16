"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
        name: "Smriti",
        grade: "10th Grade",
        percentage: 89,
        photo: "/topstudents/9.jpg",
      },
      {
        name: "Arpit bhadauriya",
        grade: "12th Grade",
        percentage:  95.2,
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
        grade: "10th Grade",
        percentage: 88,
        photo: "/topstudents/13.jpg",
      },
      {
        name: "Ashish bharadwaj",
        grade: "10th 91.4 and jee mains Grade",
        percentage:  99.4,
        photo: "/topstudents/14.jpg",
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-12 px-6 py-0 md:py-16 lg:px-24 bg-primary-content">
      {/* Left Section */}
     <div className="lg:w-1/3 md:py-20 space-y-6  hidden lg:block">
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
                         ? `Total Students: ${value.length}` // Handle arrays separately
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
      <motion.div
        className="lg:w-2/3 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
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
        {schoolData.students.map((student, index) => (
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
            <div className="relative w-full">
              <Image
                width={300}
                height={300}
                src={student.photo}
                alt={student.name}
                className="w-full h-48 object-center rounded-lg shadow-md"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {student.grade}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold text-primary-a20">
                {student.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Percentage:{" "}
                <span className="font-semibold text-green-600">
                  {student.percentage}%
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
    </div>
  );
};

export default Gallery;
