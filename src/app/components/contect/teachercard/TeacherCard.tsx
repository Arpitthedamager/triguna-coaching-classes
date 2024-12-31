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
    <section className="py-5  px-6 md:px-10 lg:px-20 lg:py-12">
      {/* Heading */}
      {/* <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary-a20 font-bold mb-4 md:text-center">
        Contect Our Educators
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-10 text-center">
        Dedicated educators driving our mission to inspire and empower students.
      </p> */}

      {/* Cards */}
      <div className="flex  space-x-4">
        {teachers.map((teacher, index) => (
          <div
            key={teacher.name}
            className={`flex flex-col h-96 *: md:flex-row items-center md:items-start ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } justify-between gap-8 p-6`}
          >
            {/* Image */}
            <motion.img
              src={teacher.image}
              alt={teacher.name}
              className="w-full md:w-1/3 h-full rounded-lg object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            {/* Content */}
            <div className="text-left ">
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold">
                {teacher.name}
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
                {teacher.subject}
              </p>
              <p className="text-gray-600 mt-1">
                Phone: <a href={`tel:${teacher.phone}`} className="text-primary-a20 hover:underline">{teacher.phone}</a>
              </p>
              <p className="text-gray-600 mt-1">
                Email: <a href={`mailto:${teacher.email}`} className="text-primary-a20 hover:underline">{teacher.email}</a>
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
