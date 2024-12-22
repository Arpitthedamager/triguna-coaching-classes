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
  const totalSlides = Math.ceil(feedbacks.length / 2);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const getFeedbacksForSlide = (index: number) =>
    feedbacks.slice(index * 2, index * 2 + 2);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  // Touch state
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50; // Minimum swipe distance to trigger a slide change
    if (touchStartX - touchEndX > threshold) {
      nextSlide(); // Swipe left
    } else if (touchEndX - touchStartX > threshold) {
      prevSlide(); // Swipe right
    }
  };

  return (
    <motion.div
      className="pt-24 pb-12 px-4 md:px-16 lg:px-32"
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.h2
        className="text-3xl md:text-6xl font-bold text-center text-black mb-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Students Feedback
      </motion.h2>
      <motion.p
        className="text-gray-600 text-center text-lg md:text-xl mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Transformative experience of education
      </motion.p>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {getFeedbacksForSlide(currentIndex).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              
              className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 border-b border-gray-300 pb-6"
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

                  <motion.p
                    className="text-gray-800 font-medium text-lg mb-2"
                    key={item.feedback}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    “ {item.feedback} “
                  </motion.p>
                  <motion.p
                    className="text-gray-600"
                    key={item.name + item.achievement}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="font-semibold text-orange-500">
                      {item.name}
                    </span>
                    , {item.achievement}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Navigation Buttons for Desktop */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute md:-left-10 -left-8 top-1/2 transform -translate-y-1/2 text-4xl md:hover:text-5xl text-gray-600 p-2 rounded-full transition"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl md:hover:text-5xl text-gray-600 p-2 rounded-full transition"
        >
          &gt;
        </button>
      </div>

      <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition duration-300 block mx-auto">
        And Many More...
      </button>
    </motion.div>
  );
};

export default FeedbackSection;
