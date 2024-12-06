"use client";

import React from "react";

const AcademicTimeline = () => {
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

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 mb-8 md:mb-0">
          <div className="bg-gray-300 rounded-lg h-64 md:h-80"></div>
        </div>

        {/* Right Timeline Section */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">Academic Year Timeline:</h2>
          <div className="space-y-6">
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
