"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const FeatureCard = ({
  imageSrc,
  altText,
  title,
}: {
  imageSrc: string;
  altText: string;
  title: string;
}) => {
  return (
    <motion.div
      className="relative m-3"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={imageSrc}
        alt={altText}
        width={150}
        height={150}
        className="w-full h-64 rounded-t-lg mb-4"
        loading="lazy"
      />
      <h3 className="text-lg sm:text-xl md:text-2xl text-gray-800">{title}</h3>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      imageSrc: "/main/tc.jpg",
      altText: "Customized Learning",
      title: "Customized Learning Plans for Every Student",
    },
    {
      imageSrc: "/main/t.jpg",
      altText: "Comprehensive Course Material",
      title: "Comprehensive Course Material and Resources",
    },
    {
      imageSrc: "/main/pt.jpg",
      altText: "24/7 Availability",
      title: "24/7 Availability for Doubts and Queries",
    },
    {
      imageSrc: "/main/pe.jpg",
      altText: "Interactive Learning",
      title: "Interactive Learning Environment to Keep You Engaged",
    },
    {
      imageSrc: "/main/tcp.jpg",
      altText: "Consistent Evaluations",
      title: "Regular Evaluations to Measure Progress",
    },
    {
      imageSrc: "/main/ptr.jpg",
      altText: "Expert Mentors",
      title: "Expert Mentors Who Guide You to Success",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <section className="text-center md:pt-36 py-10 px-6 lg:px-20 xl:px-52">
      {/* Heading */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          Achieve Your Academic Goals with Our Coaching
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600">
          Our institute offers personalized coaching and guidance to help
          students achieve their academic aspirations. With expert mentors,
          interactive lessons, and continuous support, your success is our
          priority.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="relative md:hidden lg:hidden">
        <FeatureCard
          imageSrc={features[currentIndex].imageSrc}
          altText={features[currentIndex].altText}
          title={features[currentIndex].title}
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 text-2xl sm:text-3xl text-gray-600 p-2 transition"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-2xl sm:text-3xl text-gray-600 p-2 transition"
        >
          &gt;
        </button>
      </div>

      {/* Desktop View */}
      <motion.div
        className="md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 hidden relative mb-8"
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
        {features.slice(0, 3).map((feature, index) => (
          <FeatureCard
            key={index}
            imageSrc={feature.imageSrc}
            altText={feature.altText}
            title={feature.title}
          />
        ))}
      </motion.div>

      {/* Call to Action */}
      <Link href="/signin">
        <motion.button
          className="bg-yellow-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-yellow-400"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Get Started Now
        </motion.button>
      </Link>
    </section>
  );
};

export default FeaturesSection;
