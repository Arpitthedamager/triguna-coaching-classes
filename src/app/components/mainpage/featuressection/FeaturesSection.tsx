"use client";

import React from "react";
import Image from "next/image";

const FeatureCard = ({ imageSrc, altText, title }: { imageSrc: string; altText: string; title: string }) => {
  return (
    <div>

    <div className="relative m-3">
      <Image
        src={imageSrc}
        alt={altText}
        width={150}
        height={150}
        className="w-full h-64 rounded-t-lg mb-4"
        loading="lazy"
        />
    </div>
      <h3 className="text-2xl text-gray-800">{title}</h3>
        </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      imageSrc: "https://via.placeholder.com/150",
      altText: "Expert Faculty",
      title: "Expert Faculty Committed to Your Success",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      altText: "Tailored Coaching",
      title: "Tailored Coaching Plans for Every Student",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      altText: "Academic Excellence",
      title: "Proven Track Record of Academic Excellence",
    },
  ];

  return (
    <section className="text-center  py-10 px-6 lg:px-20 xl:px-52">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-6xl font-bold text-gray-800 mb-4">
          Unlock Your Potential with Expert Coaching
        </h2>
        <p className="text-2xl text-gray-600">
          Our expert facilities are dedicated to nurturing each student's unique abilities. Experience personalized coaching that leads to outstanding academic results.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative mb-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            imageSrc={feature.imageSrc}
            altText={feature.altText}
            title={feature.title}
          />
        ))}
      </div>

      {/* Call to Action */}
      <button className="bg-yellow-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-yellow-400">
        Sign up
      </button>
    </section>
  );
};

export default FeaturesSection;
