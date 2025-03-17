"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const partyPhotos = [
  "/party/1.jpeg",
  "/party/2.jpeg",
  "/party/3.jpeg",
  "/party/4.jpg",
  "/party/5.jpg",
  "/party/6.jpeg",
  "/party/7.jpeg",
  "/party/8.jpeg",
  "/party/9.jpeg",
  "/party/10.jpeg",
  "/party/11.jpeg",
  "/party/12.jpg",
];

const Party = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log("Tot al Images:", partyPhotos.length);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === partyPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? partyPhotos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative bg-primary-content text-white min-h-screen flex flex-col items-center justify-center py-12 px-4">
      {/* Title Section */}
      <div className="text-center mb-8 space-y-4">
        <h1 className="text-4xl font-bold text-primary-a20">Party Memories</h1>
        <p className="text-lg text-gray-600">
          Relive the best moments from our amazing party! Swipe through the
          slideshow to see the fun, laughter, and unforgettable memories.
        </p>
      </div>

      {/* Slideshow Section */}
      <div className="relative w-full max-w-4xl h-96 bg-black flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
        {/* Images */}
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <Image
              src={partyPhotos[currentIndex]}
              alt={`Party Photo ${currentIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
        >
          &#8250;
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 flex gap-2">
          {partyPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-yellow-400" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Party;
