"use client";

import React from "react";
import { motion } from "framer-motion";

const teachers = [
  {
    name: "Jagvendra Sir",
    subject: "Chemistry",
    phone: "123-456-7890",
    email: "jagvendra@example.com",
    details: "Expert in Inorganic and Physical Chemistry.",
    image: "/2.jpg",
  },
  {
    name: "Radhika Ma'am",
    subject: "Physics",
    phone: "987-654-3210",
    email: "radhika@example.com",
    details: "Specializes in Mechanics and Electromagnetism.",
    image: "/2.jpg",
  },
];

const TeacherCardLayout = () => {
  return (
    <section className="py-5 px-6 md:px-10 lg:px-20 lg:py-12">
      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-8">
        {teachers.map((teacher, index) => (
          <div
            key={teacher.name}
            className={`flex flex-col items-center md:items-start ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } justify-between gap-8 p-6 w-full md:w-auto`}
          >
            {/* Image */}
            <motion.img
              src={teacher.image}
              alt={teacher.name}
              className="w-full lg:h-96 h-full md:w-1/3  rounded-lg object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            {/* Content */}
            <div className="text-left mt-4 md:mt-0">
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold">
                {teacher.name}
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
                {teacher.subject}
              </p>
              <p className="text-gray-600 mt-1">
                Phone:{" "}
                <a
                  href={`tel:${teacher.phone}`}
                  className="text-primary-a20 hover:underline"
                >
                  {teacher.phone}
                </a>
              </p>
              <p className="text-gray-600 mt-1">
                Email:{" "}
                <a
                  href={`mailto:${teacher.email}`}
                  className="text-primary-a20 hover:underline"
                >
                  {teacher.email}
                </a>
              </p>
              <p className="text-gray-500 mt-3">{teacher.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherCardLayout;
