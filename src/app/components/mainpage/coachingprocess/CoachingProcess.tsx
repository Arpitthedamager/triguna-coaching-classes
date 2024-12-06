"use client";

import React from "react";

const CoachingProcess = () => {
  const features = [
    {
      title: "Step-by-Step Guidance for Every Student",
    },
    {
      title: "Interactive Learning and Engaging Activities",
    },
    {
      title: "Regular Assessments to Track Progress",
    },
  ];

  return (
    <section className="py-16 text-center px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Discover Our Unique Coaching Process
        </h2>
        <p className="text-gray-600 mb-8">
          At our coaching center, we prioritize personalized learning experiences tailored to each student's needs. Our
          dedicated educators guide students through a structured curriculum designed to foster academic excellence and
          confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-24 bg-gray-300 rounded-md mb-4"></div>
            <p className="text-gray-700 font-medium">{feature.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoachingProcess;
