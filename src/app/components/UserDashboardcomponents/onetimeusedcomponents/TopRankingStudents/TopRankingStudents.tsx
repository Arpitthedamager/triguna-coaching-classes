"use client";
import React, { useState } from "react";
interface Student {
  name: string;
  rank: string;
  info: string;
  imageUrl: string;
}

const TopRankingStudents = () => {
  const allStudents = [
    { name: "Ram", rank: "92%", info: "in class 12th", imageUrl: "/images/ram.jpg" },
    { name: "Diksha", rank: "95%", info: "in class 10th", imageUrl: "/images/diksha.jpg" },
    { name: "Harsh", rank: "98.6%ile", info: "in Jee Mains", imageUrl: "/images/harsh.jpg" },
    { name: "Abhishek", rank: "97%ile", info: "in Jee Mains", imageUrl: "/images/abhishek.jpg" },
    { name: "Mohit Gola", rank: "99%ile", info: "in Advance", imageUrl: "/images/mohit.jpg" },
    { name: "Agrim", rank: "95%", info: "in class 12th", imageUrl: "/images/agrim.jpg" },
    { name: "Simran", rank: "94%", info: "in class 11th", imageUrl: "/images/simran.jpg" },
    { name: "Raj", rank: "93%", info: "in class 10th", imageUrl: "/images/raj.jpg" },
  ];

  // State to toggle scrollable list
  const [showAll, setShowAll] = useState(false);

  // Limit initial number of students displayed
  const displayedStudents = showAll ? allStudents : allStudents.slice(0, 6);

  return (
    <div className="p-8 my-6 rounded-3xl  bg-primary-content   ">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-6xl font-bold text-gray-800">Meet Our Stars</h1>
        <p className="text-2xl mt-2 text-gray-600">Explore our list Toppers of 2023-24</p>
      </div>

      {/* Scrollable Grid (only if 'showAll' is true) */}
      <div
        className={`${
          showAll ? "max-h-[500px] overflow-y-auto" : ""
        } rounded-lg shadow-inner p-4`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStudents.map((student, index) => (
            <div
              key={index}
              className="bg-primary-a40 text-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={student.imageUrl}
                alt={student.name}
                className="w-24 h-24 object-cover rounded-full border-2 border-yellow-400 mb-4"
              />
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-yellow-400 font-medium">{student.rank}</p>
              <p className="text-gray-300">{student.info}</p>
            </div>
          ))}
        </div>
      </div>

      {/* "Many More" Button */}
      {!showAll && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-orange-600"
          >
            Many More
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRankingStudents;
