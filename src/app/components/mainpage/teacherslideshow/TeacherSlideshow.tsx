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
      "A dedicated educator with years of experience, Radhika Ma'am inspires students to explore the wonders of physics.",
    demoVideo: "Demo Video",
    image: "/path-to-image2.jpg", // Replace with actual image path
  },
  {
    name: "Amit Sir",
    subject: "Mathematics",
    description:
      "A passionate math teacher, Amit Sir makes complex topics easy to understand and enjoyable to learn.",
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
    <section className="py-10 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Meet Our Educators</h2>
      <p className="text-gray-600 mb-8">
        Dedicated educators driving our mission
      </p>

      <div className="relative w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-md p-6 rounded-lg"
          >
            <div className="flex flex-col md:flex-row items-center">
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
                <h3 className="text-xl font-bold">
                  {teachers[current].name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {teachers[current].subject}
                </p>
                <p className="text-gray-700 mb-4">
                  {teachers[current].description}
                </p>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400">
                  {teachers[current].demoVideo}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeacherSlideshow;
