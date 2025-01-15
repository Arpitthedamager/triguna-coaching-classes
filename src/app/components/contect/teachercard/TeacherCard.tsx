"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const teachers = [
  {
    name: "Jagvendra Sir",
    subject: "Chemistry",
    phone: "+91 99179 89914",
    email: "trigunacoachingclasses@gmail.com",
    details: "Expert in Inorganic, Physical and organic Chemistry.",
    image: "/teacher/sir2.jpg",
    social: {
      facebook: "https://www.facebook.com/people/Triguna-Coaching-Classes/100063716935409/",
      instagram: "https://www.instagram.com/jagvendrasikarwar/",
      linkedin: "https://www.linkedin.com/in/jagvendra",
      twitter: "https://www.twitter.com/jagvendra",
    },
  },
  {
    name: "Rupesh Sir",
    subject: "Physics",
    phone: "+91 88591 44956",
    email: "trigunacoachingclasses@gmail.com",
    details: "Specializes in maths and physics.",
    image: "/teacher/sir3.jpg",
    social: {
      facebook: "https://www.facebook.com/rupesh.pachauri.9?mibextid=ZbWKwL",
      instagram: "https://www.instagram.com/pachaurirupesh/",
      linkedin: "https://www.linkedin.com/in/rupesh",
      twitter: "https://www.twitter.com/rupesh",
    },
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
              className="w-full lg:h-96 h-full md:w-1/3 rounded-lg object-cover"
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

              {/* Social Media Links */}
              <div className="flex gap-4 mt-4">
                <a
                  href={teacher.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={teacher.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 transition"
                >
                  <FaInstagram size={24} />
                </a>
                {/* <a
                  href={teacher.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={teacher.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition"
                >
                  <FaTwitter size={24} />
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherCardLayout;
