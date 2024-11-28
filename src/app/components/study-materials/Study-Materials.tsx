"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";

const StudyMaterials: FC = () => {
  const [filter, setFilter] = useState<string>("");

  const materials = [
    { id: 1, title: "Math Notes", description: "Algebra, Calculus, Geometry", type: "notes" },
    { id: 2, title: "Physics Videos", description: "Tutorials & Lessons", type: "videos" },
    { id: 3, title: "History eBooks", description: "Download History Resources", type: "ebooks" },
    { id: 4, title: "Chemistry Notes", description: "Periodic Table & Reactions", type: "notes" },
    { id: 5, title: "Biology Videos", description: "Anatomy & Botany Lessons", type: "videos" },
  ];

  // Filtered materials based on the selected type
  const filteredMaterials = filter
    ? materials.filter((material) => material.type === filter)
    : materials;

  return (
    <div className="p-6">
      {/* Filter Section */}
      <header className="flex items-center justify-between mb-6">
        <motion.h1
          className="text-3xl font-bold text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Study Materials
        </motion.h1>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">All</option>
            <option value="notes">Notes</option>
            <option value="videos">Videos</option>
            <option value="ebooks">eBooks</option>
          </select>
        </div>
      </header>

      {/* Materials Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <motion.div
              key={material.id}
              className="card shadow-xl p-4 rounded-lg bg-white border"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="text-lg font-semibold">{material.title}</h3>
              <p className="text-gray-600">{material.description}</p>
              <a
                href="#"
                className="btn btn-primary mt-2 inline-block text-blue-600 hover:underline"
              >
                {material.type === "videos" ? "Watch Now" : "Download"}
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudyMaterials;
