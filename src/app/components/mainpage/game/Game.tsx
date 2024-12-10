"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Game: React.FC = () => {
  const chapters = [
    { id: "phy1", name: "Kinematics", subject: "phy", color: "bg-red-300" },
    { id: "phy2", name: "Dynamics", subject: "phy", color: "bg-yellow-300" },
    { id: "chy1", name: "Organic Chemistry", subject: "chy", color: "bg-green-300" },
    { id: "chy2", name: "Inorganic Chemistry", subject: "chy", color: "bg-blue-300" },
    { id: "math1", name: "Algebra", subject: "math", color: "bg-purple-300" },
    { id: "math2", name: "Calculus", subject: "math", color: "bg-pink-300" },
    { id: "chy3", name: "Organic Chemistry", subject: "chy", color: "bg-green-300" },
    { id: "chy4", name: "Inorganic Chemistry", subject: "chy", color: "bg-blue-300" },
    { id: "math3", name: "Algebra", subject: "math", color: "bg-purple-300" },
    { id: "math4", name: "Calculus", subject: "math", color: "bg-pink-300" },
    { id: "chy5", name: "Organic Chemistry", subject: "chy", color: "bg-green-300" },
    { id: "chy6", name: "Inorganic Chemistry", subject: "chy", color: "bg-blue-300" },
    { id: "math5", name: "Algebra", subject: "math", color: "bg-purple-300" },
    { id: "math6", name: "Calculus", subject: "math", color: "bg-pink-300" },
  ];

  const [gameState, setGameState] = useState<Record<string, string>>(
    chapters.reduce((acc, chapter) => ({ ...acc, [chapter.id]: "unplaced" }), {})
  );

  const [animationKey, setAnimationKey] = useState<number>(0); // Key to trigger bounce animation

  const handleDrop = (chapterId: string, subject: string) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (chapter && chapter.subject === subject) {
      setGameState((prevState) => ({ ...prevState, [chapterId]: subject }));
      setAnimationKey((prev) => prev + 1); // Trigger bounce animation
    }
  };

  const isGameComplete =
    Object.values(gameState).filter((state) => state === "unplaced").length === 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
      <h1 className="text-2xl text-primary-a20 font-bold">Sort the Chapters into the Correct Mugs!</h1>
      <div className="relative w-full max-w-2xl h-80 bg-white bg-opacity-60 border border-gray-300 rounded-lg p-4 flex justify-center items-center overflow-hidden shadow-lg">
        {chapters.map((chapter) =>
          gameState[chapter.id] === "unplaced" ? (
            <motion.div
              key={chapter.id}
              className={`cursor-grab ${chapter.color} text-sm font-medium px-4 py-2 rounded shadow-lg absolute`}
              drag
              dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
              whileHover={{ scale: 1.1 }} // Adds a slight scale when hovering
              whileDrag={{ scale: 1.2, rotate: 5 }} // Adds a little rotation and scale during drag
              transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooths out the drag effect
              animate={
                gameState[chapter.id] !== "unplaced"
                  ? { scale: 1.1, y: -10, transition: { type: "spring", stiffness: 500, damping: 20 } }
                  : {} // Bounce effect when placed correctly
              }
              onDragEnd={(event, info) => {
                const snapThreshold = 50; // Threshold to consider "snapping"
                const snapX = info.point.x;
                const snapY = info.point.y;

                // Example: Assign positions for subjects (like mugs) here
                const subjectPosition = {
                  phy: { x: 100, y: 100 },
                  chy: { x: 300, y: 100 },
                  math: { x: 500, y: 100 },
                };

                for (const [subject, { x, y }] of Object.entries(subjectPosition)) {
                  if (
                    Math.abs(snapX - x) < snapThreshold &&
                    Math.abs(snapY - y) < snapThreshold
                  ) {
                    handleDrop(chapter.id, subject);
                    break;
                  }
                }
              }}
            >
              {chapter.name}
            </motion.div>
          ) : null
        )}
      </div>

      {isGameComplete && (
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="text-lg font-bold">🎉 You are the Best Student! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default Game;
