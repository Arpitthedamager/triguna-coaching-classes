"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const chaptersData = [
  { id: "1", name: "Electrostatics", subject: "Physics" },
  { id: "2", name: "Organic Chemistry", subject: "Chemistry" },
  { id: "3", name: "Calculus", subject: "Math" },
  { id: "4", name: "Magnetism", subject: "Physics" },
  { id: "5", name: "Inorganic Chemistry", subject: "Chemistry" },
  { id: "6", name: "Probability", subject: "Math" },
  { id: "7", name: "Fluid Mechanics", subject: "Physics" },
  { id: "8", name: "Astrophysics", subject: "Physics" },
  { id: "9", name: "Biochemistry", subject: "Chemistry" },
  { id: "10", name: "Algebra", subject: "Math" },
];

const subjects = ["Physics", "Chemistry", "Math"];

const Game = () => {
  const [colors, setColors] = useState<Record<string, string>>({});
  useEffect(() => {
    const newColors: Record<string, string> = {};
    chapters.forEach((chapter) => {
      newColors[chapter.id] = `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
    setColors(newColors);
  }, []);

  const [score, setScore] = useState(0);
  const [chapters, setChapters] = useState(
    chaptersData.map((chapter) => ({ ...chapter, location: "spawnBucket" }))
  );

  const handleDragEnd = (event: any, chapter: any, targetBucket: string) => {
    const { left, top, right, bottom } = event.target.getBoundingClientRect();
    const dropTarget = document.getElementById(targetBucket);
    if (!dropTarget) return;

    const targetRect = dropTarget.getBoundingClientRect();
    const isDropped =
      left < targetRect.right &&
      right > targetRect.left &&
      top < targetRect.bottom &&
      bottom > targetRect.top;

    if (isDropped) {
      // Update chapter location
      setChapters((prev) =>
        prev.map((item) =>
          item.id === chapter.id ? { ...item, location: targetBucket } : item
        )
      );

      // Update score if dropped correctly
      if (targetBucket === chapter.subject) {
        setScore((prev) => prev + 1);
      } else if (chapter.location === chapter.subject) {
        setScore((prev) => prev - 1); // Reduce score if a correct chapter is moved incorrectly
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Drag Chapters Freely to Their Subject Buckets
      </h1>

      {/* Buckets for Subjects */}
      <div className="flex space-x-10 mb-10">
        {subjects.map((subject) => (
          <div
            id={subject}
            key={subject}
            className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.08)] rounded-lg p-5 w-52 min-h-[300px] bg-white relative flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {subject}
            </h2>
            <p className="text-sm text-gray-500">Drag chapters here!</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {chapters
                .filter((chapter) => chapter.location === subject)
                .map((chapter) => (
                  <motion.div
                    key={chapter.id}
                    className="bg-blue-200 rounded-lg p-3 shadow-md cursor-pointer w-48 text-center"
                    drag
                    dragConstraints={{
                      top: -500,
                      bottom: 500,
                      left: -500,
                      right: 500,
                    }}
                    dragElastic={0.5}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onDragEnd={(event) =>
                      handleDragEnd(event, chapter, subject)
                    }
                  >
                    {chapter.name}
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Spawn Bucket */}
      <div
        id="spawnBucket"
        className="shadow-lg rounded-lg p-5 w-full max-w-3xl min-h-[300px] bg-blue-100 relative flex flex-wrap items-start justify-center gap-4"
      >
        <h2 className="w-full text-center text-xl font-semibold text-blue-700 mb-4">
          All Chapters
        </h2>
        {chapters
          .filter((chapter) => chapter.location === "spawnBucket")
          .map((chapter, index) => (
            <motion.div
              key={chapter.id}
              className="bg-blue-200 rounded-lg p-3 shadow-md cursor-pointer z-50 w-48 text-center"
              drag
              dragConstraints={{
                top: -500,
                bottom: 500,
                left: -500,
                right: 500,
              }}
              dragElastic={0.5}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onDragEnd={(event) =>
                handleDragEnd(event, chapter, "spawnBucket")
              }
              style={{
                position: "absolute",
                top: `${(index % 3) * 60}px`, // Stack vertically
                left: `${Math.floor(index / 3) * 160}px`, // Offset to next column
                backgroundColor: colors[chapter.id] || "gray", // Use the generated color
              }}
            >
              {chapter.name}
            </motion.div>
          ))}
      </div>

      {/* Winning Message */}
      {score === chaptersData.length && (
        <motion.div
          className="fixed top-10 right-10 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          Excellent Work!
        </motion.div>
      )}
    </div>
  );
};

export default Game;
