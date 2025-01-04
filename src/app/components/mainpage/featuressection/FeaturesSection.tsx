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
        className="w-full h-52 md:h-64 rounded-t-lg mb-4"
        loading="lazy"
      />
      <h3 className="text-lg md:text-2xl text-gray-800">{title}</h3>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      imageSrc: "/main/pef.jpg",
      altText: "Expert Faculty",
      title: "Expert Faculty Committed to Your Success",
    },
    {
      imageSrc: "/main/tcp.jpg",
      altText: "Tailored Coaching",
      title: "Tailored Coaching Plans for Every Student",
    },
    {
      imageSrc: "/main/ptr.jpg",
      altText: "Academic Excellence",
      title: "Proven Track Record of Academic Excellence",
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
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-center pt-20 md:pt-36 py-10 px-6 lg:px-20 xl:px-52">
      {/* Heading */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Unlock Your Potential with Expert Coaching
        </h2>
        <p className="text-base md:text-xl text-gray-600">
          Our expert facilities are dedicated to nurturing each student&apos;s
          unique abilities. Experience personalized coaching that leads to
          outstanding academic results.
        </p>
      </motion.div>

      {/* Features Section */}
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
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            imageSrc={feature.imageSrc}
            altText={feature.altText}
            title={feature.title}
          />
        ))}
      </motion.div>

      {/* Mobile Slideshow */}
      <div className="lg:hidden md:hidden relative">
        <FeatureCard
          imageSrc={features[currentIndex].imageSrc}
          altText={features[currentIndex].altText}
          title={features[currentIndex].title}
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 text-4xl text-gray-600 p-2 transition"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-4xl text-gray-600 p-2 transition"
        >
          &gt;
        </button>
      </div>

      {/* Call to Action */}
      <Link href="/signin">
        <motion.button
          className="bg-yellow-500 text-white px-6 py-3 md:px-10 md:py-5 rounded-lg font-bold hover:bg-yellow-400 mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Sign up
        </motion.button>
      </Link>
    </section>
  );
};

export default FeaturesSection;
