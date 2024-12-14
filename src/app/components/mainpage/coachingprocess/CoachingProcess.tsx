"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FeatureCard = ({ imageSrc, altText, title }: { imageSrc: string; altText: string; title: string }) => {
  return (
    <motion.div
      className="relative m-3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Image
        src={imageSrc}
        alt={altText}
        width={150}
        height={150}
        className="w-full h-64 rounded-t-lg mb-4"
        loading="lazy"
      />
      <h3 className="text-2xl text-gray-800">{title}</h3>
    </motion.div>
  );
};

const CoachingProcess = () => {
  const features = [
    {
      imageSrc: "https://via.placeholder.com/150",
      altText: "Guidance",
      title: "Step-by-Step Guidance for Every Student",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      altText: "Interactive Learning",
      title: "Interactive Learning and Engaging Activities",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      altText: "Assessments",
      title: "Regular Assessments to Track Progress",
    },
  ];

  return (
    <section className="text-center pt-36 py-10 px-6 lg:px-20 xl:px-52">
      {/* Heading */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-6xl font-bold text-gray-800 mb-4">
          Discover Our Unique Coaching Process
        </h2>
        <p className="text-2xl text-gray-600">
          At our coaching center, we prioritize personalized learning experiences tailored to each student&apos;s needs. Our
          dedicated educators guide students through a structured curriculum designed to foster academic excellence and
          confidence.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            imageSrc={feature.imageSrc}
            altText={feature.altText}
            title={feature.title}
          />
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.button
        className="bg-yellow-500 text-white px-10 py-5 rounded-lg font-bold hover:bg-yellow-400"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Join Now
      </motion.button>
    </section>
  );
};

export default CoachingProcess;
