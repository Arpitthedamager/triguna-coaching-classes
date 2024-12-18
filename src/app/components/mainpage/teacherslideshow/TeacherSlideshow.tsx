// src/components/TeacherSlideshow.tsx

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
    image: "/path-to-image1.jpg", // Replace with actual image path
  },
  {
    name: "Radhika Ma'am",
    subject: "Physics",
    description:
    "Founder and Chief visionary, Mr. Jagvendra Sir is the driving force behind the institution. He loves to keep his hands full by participating in the development of the curriculum and student experience strategies.",
    demoVideo: "Demo Video",
    image: "/path-to-image2.jpg", // Replace with actual image path
  },
  {
    name: "Amit Sir",
    subject: "Mathematics",
    description:
    "Founder and Chief visionary, Mr. Jagvendra Sir is the driving force behind the institution. He loves to keep his hands full by participating in the development of the curriculum and student experience strategies.",
    demoVideo: "Demo Video",
    image: "/path-to-image3.jpg", // Replace with actual image path
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
    <section className="py-10 px-4 ">
      <h2 className="md:text-6xl text-5xl text-primary-a20 font-bold mb-4">Meet Our Educators</h2>
      <p className="text-gray-600 md:text-2xl text-xl mb-8">Dedicated educators driving our mission</p>

      <div className="relative w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="p-6 left-0"
          >
            <div className="flex flex-col">
              <div className="mb-6 md:mb-0 md:mr-8">
                <motion.div
                  className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={teachers[current].image}
                    alt={teachers[current].name}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </div>
              <div className="text-left">
                <h3 className="text-3xl text-gray-700 font-bold">{teachers[current].name}</h3>
                <p className="text-xl text-gray-600 mb-4">{teachers[current].subject}</p>
                <button className="bg-yellow-500 text-white px-4 py-2 mb-5 rounded-lg hover:bg-yellow-400">
                  {teachers[current].demoVideo}
                </button>
                <p className="text-gray-700 text-lg mb-4 pr-20">{teachers[current].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="">
        <button
          onClick={handlePrev}
          className="absolute -left-5 top-1/2 transform -translate-y-1/2 text-4xl hover:text-5xl text-gray-600 p-2 rounded-full transition"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-4xl hover:text-5xl text-gray-600 p-2 rounded-full transition"
        >
          &gt;
        </button>
        </div>
      </div>
    </section>
  );
};

export default TeacherSlideshow;
