"use client";

import React, { useEffect, useState } from "react";

const AcademicTimeline = () => {
  const timelineItems = [
    {
      title: "Important Dates",
      description: "Stay informed with our key academic dates and events",
      icon: "ℹ️",
      image: "/images/important-dates.jpg", // Replace with actual image paths
    },
    {
      title: "Results",
      description: "Stay informed on every result",
      icon: "📈",
      image: "/images/results.jpg", // Replace with actual image paths
    },
    {
      title: "Test Schedule",
      description: "Stay informed with our class test series",
      icon: "📝",
      image: "/images/test-schedule.jpg", // Replace with actual image paths
    },
    {
      title: "Registration of JEE",
      description: "Stay informed with registration forms and admit cards",
      icon: "📋",
      image: "/images/jee-registration.jpg", // Replace with actual image paths
    },
  ];

  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisibleIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".timeline-image");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-64 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start">
        {/* Left Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 mb-8 md:mb-0">
          <div className="relative">
            {/* Timeline Line */}
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-center mb-8 opacity-0 transition-opacity duration-500 ${
                  visibleIndex >= index ? "opacity-100" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover border-white shadow-md timeline-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Timeline Section */}
        <div className="w-full md:w-1/2 sticky md:pl-8">
          <h2 className="text-3xl font-bold mb-4 sticky top-16 z-10">Academic Year Timeline:</h2>
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
