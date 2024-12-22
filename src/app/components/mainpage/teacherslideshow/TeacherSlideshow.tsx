"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const teachers = [
  {
    name: "Jagvendra Sir",
    subject: "Chemistry",
    description:
      "Founder and Chief visionary, Mr. Jagvendra Sir is the driving force behind the institution. He loves to keep his hands full by participating in the development of the curriculum and student experience strategies.",
    demoVideo: "Demo Video",
    image: "/2.jpg", // Replace with actual image path
  },
  {
    name: "Radhika Ma'am",
    subject: "Physics",
    description:
      "Radhika Ma'am has an exceptional knack for simplifying complex physics concepts, making them relatable and understandable for students of all levels.",
    demoVideo: "Demo Video",
    image: "/path-to-image2.jpg", // Replace with actual image path
  },
  {
    name: "Amit Sir",
    subject: "Mathematics",
    description:
      "Amit Sir brings clarity to mathematics with his engaging teaching style and innovative problem-solving techniques.",
    demoVideo: "Demo Video",
    image: "/2.jpg", // Replace with actual image path
  },
];

const TeacherSlideshow = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % teachers.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + teachers.length) % teachers.length);
  };

  return (
    <section className="py-10 px-6 md:px-10 lg:px-20 bg-primary-a50 lg:py-32">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary-a20 font-bold mb-4 md:text-center">
        Meet Our Educators
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 text-center">
        Dedicated educators driving our mission to inspire and empower students.
      </p>

      {/* Slideshow */}
      <div className="relative w-full max-w-5xl mx-auto rounded-lg p-6 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center"
          >
            {/* Image */}
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-gray-200 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={teachers[current].image}
                alt={teachers[current].name}
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold">
                {teachers[current].name}
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4">
                {teachers[current].subject}
              </p>
              <button className="bg-yellow-500 text-white px-4 py-2 md:px-6 md:py-3   rounded-lg hover:bg-yellow-400 transition mb-4">
                {teachers[current].demoVideo}
              </button>
              <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
                {teachers[current].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl text-gray-600 p-3 rounded-full transition"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl text-gray-600 p-3 rounded-full transition"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default TeacherSlideshow;
