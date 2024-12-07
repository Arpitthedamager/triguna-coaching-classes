"use client";

import React from "react";

const AcademicTimeline = () => {
  // Timeline item data without images
  const timelineItems = [
    {
      title: "Important Dates",
      description: "Stay informed with our key academic dates and events",
      icon: "ℹ️",
    },
    {
      title: "Results",
      description: "Stay informed on every result",
      icon: "📈",
    },
    {
      title: "Test Schedule",
      description: "Stay informed with our class test series",
      icon: "📝",
    },
    {
      title: "Registration of JEE",
      description: "Stay informed with registration forms and admit cards",
      icon: "📋",
    },
  ];

  // Separate constant for image URLs
  const timelineImages = [
    "/2.jpg", // Image for Important Dates
    "/images/results.jpg", // Image for Results
    "/2.jpg", // Image for Test Schedule
    "/images/jee-registration.jpg", // Image for JEE Registration
  ];

  return (
    <section className="py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start">
        {/* Left Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 mb-8 md:mb-0">
          <div className="relative">
            {/* Timeline Line */}
            {timelineImages.map((imageUrl, index) => (
              <div
                key={index}
                className="flex items-center justify-center mb-80"
              >
                <img
                  src={imageUrl}
                  alt={`Timeline image ${index + 1}`}
                  className="w-full h-64 object-cover border-white shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Timeline Section */}
        <div className="w-full md:w-1/2 md:pl-8 sticky top-16 z-10">
          <h2 className="text-3xl font-bold mb-4">Academic Year Timeline:</h2>
          <div className="space-y-4">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 hover:bg-gray-100 p-4 rounded-lg transition"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-black text-white text-2xl font-bold rounded-md">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicTimeline;
