"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Feedback {
  name: string;
  achievement: string;
  feedback: string;
}

const FeedbackSection: React.FC = () => {
  const feedbacks: Feedback[] = [
    {
      name: "Mohit Gola",
      achievement: "Jee Advance Topper",
      feedback: "This Coaching center helped me to achieve my success",
    },
    {
      name: "Ram",
      achievement: "98% in 12th CBSE Board",
      feedback: "The Faculty is incredibly supportive and knowledgeable.",
    },
    {
      name: "Sneha",
      achievement: "State Olympiad Winner",
      feedback: "This institution instilled confidence and clarity in me.",
    },
    {
      name: "Ankit",
      achievement: "Best Paper Presentation Award",
      feedback: "They provide an amazing platform to learn and grow.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Calculate the total number of slides (each slide contains 2 feedbacks)
  const totalSlides = Math.ceil(feedbacks.length / 2);

  const nextSlide = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      setLoading(false);
    }, 500); // Delay for loading animation
  };

  const prevSlide = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
      );
      setLoading(false);
    }, 500); // Delay for loading animation
  };

  // Get feedbacks for the current slide (2 items per slide)
  const getFeedbacksForSlide = (index: number) =>
    feedbacks.slice(index * 2, index * 2 + 2);

  // Auto change slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <motion.div
      className="py-6 px-6 md:px-52"
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }} // Trigger animation only once when the section is in view
      exit={{ opacity: 0, scale: 0.9, x: -50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-2xl font-bold text-black mb-2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Students Feedback
      </motion.h2>
      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Transformative experience of education
      </motion.p>

      <div className="relative">
        <AnimatePresence mode="wait">
          {getFeedbacksForSlide(currentIndex).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }} // Start from right
              animate={{ opacity: 1, x: 0 }}   // Slide in to original position
              exit={{ opacity: 0, x: -100 }}   // Slide out to the left when leaving
              transition={{ duration: 0.5 }}
              className="flex space-y-6 md:space-y-0 md:space-x-6 border-b border-gray-300 pb-4"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <motion.div
                    className="flex items-center mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568L24 9.432l-5.5 5.368 1.3 8.518L12 18.896l-7.8 4.422 1.3-8.518L0 9.432l8.332-1.277L12 .587z" />
                        </svg>
                      ))}
                  </motion.div>

                  {/* Apply fade-in and fade-out effect when feedback text changes */}
                  <motion.p
                    className="text-gray-800 font-medium text-lg mb-2"
                    key={item.feedback} // Ensure the animation is triggered when feedback changes
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    “ {item.feedback} “
                  </motion.p>
                  <motion.p
                    className="text-gray-600"
                    key={item.name + item.achievement} // Ensure the animation is triggered when name and achievement change
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="font-semibold">{item.name}</span>,{" "}
                    {item.achievement}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-4xl hover:text-5xl text-gray-600 p-2 rounded-full transition"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl hover:text-5xl text-gray-600 p-2 rounded-full transition"
        >
          &gt;
        </button>
      </div>

      <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition duration-300">
        And Many More...
      </button>
    </motion.div>
  );
};

export default FeedbackSection;
