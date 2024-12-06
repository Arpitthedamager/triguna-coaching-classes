"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define the Chapter type
type Chapter = {
  id: string;
  name: string;
  subject: string;
};

const chaptersData: Chapter[] = [
  { id: "1", name: "Photosynthesis", subject: "Science" },
  { id: "2", name: "Trigonometry", subject: "Math" },
  { id: "3", name: "World War II", subject: "History" },
  { id: "4", name: "Atoms and Molecules", subject: "Science" },
  { id: "5", name: "Calculus", subject: "Math" },
  { id: "6", name: "French Revolution", subject: "History" },
];

const subjects = ["Science", "Math", "History"];

const Game = () => {
  const [chapters, setChapters] = useState<Chapter[]>(chaptersData);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [correctMatches, setCorrectMatches] = useState<Record<string, boolean>>({});
  const [colors, setColors] = useState<Record<string, string>>({});

  // Generate random colors for each chapter after the component mounts
  useEffect(() => {
    const newColors: Record<string, string> = {};
    chapters.forEach((chapter) => {
      newColors[chapter.id] = `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
    setColors(newColors);
  }, []); // Empty dependency array ensures this runs only once after mount

  // Handle drag end with proper type for chapter
  const handleDragEnd = (event: any, chapter: Chapter) => {
    const target = event.target as HTMLElement;

    // Store the position of the dragged item
    const { left, top } = target.getBoundingClientRect();
    const dropTarget = event.target.closest(".bucket"); // Find the closest bucket

    if (dropTarget) {
      const targetId = dropTarget.id;
      if (chapter.subject === targetId) {
        setCorrectMatches((prev) => ({
          ...prev,
          [chapter.id]: true,
        }));
      }
    }

    setPositions((prev) => ({
      ...prev,
      [chapter.id]: { x: left, y: top }, // Store the position
    }));
  };

  return (
    <div className="min-h-screenflex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Align Chapters to the Correct Subjects
      </h1>

      {/* Buckets (Subjects) */}
      <div className="flex space-x-10 mb-10">
        {subjects.map((subject) => (
          <div
            id={subject}
            key={subject}
            className="bucket bg-transparent border-4 border-gray-500 rounded-lg p-5 w-64 min-h-[300px] relative"
            style={{
              borderColor: correctMatches[subject] ? "green" : "gray",
            }}
          >
            {/* Show a tag when correct match occurs */}
            {correctMatches[subject] && (
              <motion.div
              className="absolute top-2 right-2 bg-green-500 text-white px-4 py-1 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              >
                Correct!
              </motion.div>
            )}
            <h2 className="text-2xl  font-semibold text-gray-700 mb-4">{subject}</h2>
          </div>
        ))}
      </div>

      {/* Free-floating chapters */}
      <div className="mt-10 mb-20 relative">
        {chapters.map((chapter) => (
          <motion.div
            key={chapter.id}
            className="rounded-lg p-3 mb-4 text-center z-50 shadow-md cursor-pointer absolute"
            style={{
              left: positions[chapter.id]?.x || 0, // Track position
              top: positions[chapter.id]?.y || 0,  // Track position
              backgroundColor: colors[chapter.id] || "gray", // Use the generated color
            }}
            drag
            dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
            onDragEnd={(event) => handleDragEnd(event, chapter)}
          >
            {chapter.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Game;
