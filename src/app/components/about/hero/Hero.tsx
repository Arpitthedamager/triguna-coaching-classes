"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";


const Hero = () => {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    "Empower Your Learning Journey!",
    "Unlock Your True Potential!",
    "Join a Community of Achievers!",
    "Transform Your Dreams Into Reality!",
    "Excellence in Education, Redefined!",
    "Step Into a Bright Future!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary-content">
      {/* Navbar */}
      <nav className="relative bg-primary-a50 py-4 flex justify-between items-center z-10 px-4 md:px-8 shadow-lg">
        <motion.div
          className="text-lg font-extrabold text-yellow-500"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          TCC
        </motion.div>

        <motion.div
          className="hidden lg:flex space-x-8 text-gray-50 font-semibold"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/aboutus" className="text-gray-200">
            About Us
          </Link>
          <Link href="/signin" className="hover:text-gray-200">
            Enroll Now
          </Link>
          <Link href="/contact" className="hover:text-gray-200">
            Contact
          </Link>
        </motion.div>

        <Link href="/signin">
          <motion.button
            className="px-6 py-2 bg-yellow-500 text-[#241448] font-bold rounded-lg hover:bg-yellow-400 shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1326947/pexels-photo-1326947.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000a0] to-[#00000040]"></div>

        <div className="relative z-10 text-white max-w-3xl text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empowering Students, One Step at a Time
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Discover a world of knowledge with our experienced faculty and
            comprehensive resources.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* <Link > */}
            <Link
              href="/about"
              className="px-6 py-3 bg-yellow-500 text-[#241448] font-bold rounded-lg shadow-md hover:bg-yellow-400"
            >
              Learn More
            </Link>
            {/* </Link> */}
            {/* <Link href="/contact"> */}
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#241448] font-bold rounded-lg shadow-md hover:bg-gray-200"
            >
              Contact Us
            </Link>
            {/* </Link> */}
          </motion.div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-primery-a50 text-gray-800">
        <div className="container mx-auto px-4 sm:px-8 lg:px-20">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {questions[currentQuestion]}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At EduSpark, we are dedicated to fostering a passion for
                learning and personal growth. Our innovative methods and
                state-of-the-art resources help students excel and achieve their
                dreams.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/4143792/pexels-photo-4143792.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Students Learning"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
