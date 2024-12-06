// src/components/Game.tsx

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const chaptersData = [
  { id: "1", name: "Photosynthesis", subject: "Science" },
  { id: "2", name: "Trigonometry", subject: "Math" },
  { id: "3", name: "World War II", subject: "History" },
  { id: "4", name: "Atoms and Molecules", subject: "Science" },
  { id: "5", name: "Calculus", subject: "Math" },
  { id: "6", name: "French Revolution", subject: "History" },
];

const subjects = ["Science", "Math", "History"];

const Game = () => {
  const [chapters, setChapters] = useState(chaptersData);
  const [score, setScore] = useState(0);
  const [positions, setPositions] = useState<Record<string, string>>({});

  const handleDragEnd = (event: any, chapter: any, subject: string) => {
    const target = event.target as HTMLElement;
    const { left, top, right, bottom } = target.getBoundingClientRect();
    const dropTarget = document.getElementById(subject);
    if (!dropTarget) return;

    const targetRect = dropTarget.getBoundingClientRect();
    const isCorrect =
      left < targetRect.right &&
      right > targetRect.left &&
      top < targetRect.bottom &&
      bottom > targetRect.top;

    if (isCorrect && chapter.subject === subject) {
      setScore((prev) => prev + 1);
      setPositions((prev) => ({ ...prev, [chapter.id]: subject }));
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Align Chapters to the Correct Subjects
      </h1>

      <div className="flex space-x-10 mb-10">
        {subjects.map((subject) => (
          <div
            id={subject}
            key={subject}
            className="bg-white shadow-lg rounded-lg p-5 w-64 min-h-[300px] relative"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {subject}
            </h2>
            {Object.entries(positions)
              .filter(([_, target]) => target === subject)
              .map(([chapterId]) => {
                const chapter = chapters.find((c) => c.id === chapterId);
                return (
                  <div
                    key={chapterId}
                    className="bg-green-200 rounded-lg p-3 mb-2 text-center shadow-md"
                  >
                    {chapter?.name}
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      <div className="mt-10 mb-20">
        {chapters
          .filter((chapter) => !positions[chapter.id])
          .map((chapter) => (
            <motion.div
              key={chapter.id}
              className="bg-blue-200 rounded-lg p-3 mb-4 text-center shadow-md cursor-pointer"
              drag
              dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
              dragElastic={0.5}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onDragEnd={(event) => handleDragEnd(event, chapter, chapter.subject)}
            >
              {chapter.name}
            </motion.div>
          ))}
      </div>

      {score === chaptersData.length && (
        <motion.div
          className="fixed top-10 right-10 bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg text-xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          Best Student!
        </motion.div>
      )}
    </div>
  );
};

export default Game;
