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
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start">
        {/* Left Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 mb-8 md:mb-0">
          <div className="relative">
            {timelineImages.map((imageUrl, index) => (
              <div
                key={index}
                className="flex items-center justify-center mb-12 md:mb-80 md:mt-24"
              >
                <img
                  src={imageUrl}
                  alt={`Timeline image ${index + 1}`}
                  className="w-full h-48 md:h-64 object-cover border-white shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Timeline Section */}
        <div className="w-full md:w-1/2 md:pl-8 sticky md:top-16 z-10">
          <h2 className="text-2xl md:text-3xl text-primary-a10 font-bold mb-6 text-center md:text-left">
            Academic Year Timeline:
          </h2>
          <div className="space-y-6">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:space-x-4 hover:bg-primary-a50 p-4 rounded-lg transition"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black text-white text-xl md:text-2xl font-bold rounded-md">
                  {item.icon}
                </div>
                <div className="mt-2 md:mt-0">
                  <h3 className="text-base md:text-lg text-primary-a20 font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {item.description}
                  </p>
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
