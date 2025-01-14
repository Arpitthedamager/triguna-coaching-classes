"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
// import Image from "next/image";

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#8b50fc] to-[#570df8] text-white md:py-20 py-6 px-6 lg:px-20 xl:px-52 overflow-hidden">
      {isClient && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ["0%", "100%"],
                x: ["-10%", "10%"],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Navbar */}
      <nav
        aria-label="Breadcrumb"
        className="relative flex justify-between items-center mb-10 z-10"
      >
        <motion.div
          className="text-lg font-bold"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
          height={140}
          width={140}
            src="/logo.png" // Update this with your image path
            alt="Logo"
            className="" // Adjust the size as needed
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
        <motion.div
          className="hidden lg:flex space-x-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/" className="text-gray-300">
            Home
          </Link>
          <Link href="/aboutus" className="hover:text-gray-300">
            About Us
          </Link>
          <Link href="/signin" className="hover:text-gray-300">
            Enroll Now
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </motion.div>
        <Link href="/signin">
          <motion.button
            className="px-6 py-2 bg-yellow-500 text-[#241448] font-bold rounded-lg hover:bg-yellow-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center z-10">
        {/* Left Section */}
        <motion.div
          className="text-center lg:text-left mb-10 lg:mb-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
            Welcome to TRIGUNA
          </h1>
          <h2 className="text-lg lg:text-xl mb-8">
            Welcome to Triguna Coaching Classes, Top coaching in Agra Achieve
            your dreams here with the best faculties and study materials.
          </h2>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start space-y-4 lg:space-y-0 lg:space-x-4">
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-yellow-500 text-[#241448] font-bold rounded-lg hover:bg-yellow-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now
              </motion.button>
            </Link>
            <Link href="/signin">
              <motion.button
                className="px-8 py-4 bg-[#241448] text-white font-bold rounded-lg hover:bg-[#362161]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </Link>
          </div>
          <motion.h3
            className="text-sm text-gray-100 mt-2 md:mt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            The New Way To Achieve Success Expert coaching in Agra
          </motion.h3>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="md:flex hidden items-center justify-center space-x-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Student 2 */}
          <motion.img
            src="/teacher/sir2.jpg"
            alt="Student 2"
            className="rounded-full w-34 h-80 lg:w-36 lg:h-96 relative object-cover border-4 border-[#5631AE] shadow-xl"
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          {/* Middle Column */}
          <div className="flex flex-col relative z-10 top-20">
            {/* Student 1 */}
            <motion.img
              src="/teacher/sir1.jpg"
              alt="Student 1"
              className="rounded-full w-34 h-80 lg:w-36 lg:h-96 relative bottom-52 object-cover border-4 border-[#241448] shadow-lg"
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            {/* Student 3 */}
            <motion.img
              src="/topstudents/7.jpg"
              alt="Student 3"
              className="rounded-full w-34 h-80 lg:w-36 lg:h-96 relative object-cover border-4 border-[#241448] shadow-lg"
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
          {/* Student 2 Duplicate */}
          <motion.img
            src="/topstudents/2.jpg"
            alt="Student 2 Duplicate"
            className="rounded-full relative top-40 w-34 h-80 lg:w-36 lg:h-96 object-cover border-4 border-[#5631AE] shadow-xl"
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
