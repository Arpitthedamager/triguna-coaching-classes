"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <motion.div
      className="h-auto md:h-96 bg-fixed bg-cover bg-center text-white py-8 px-6 md:px-52 rounded-lg flex flex-col md:flex-row md:justify-between items-center space-y-6 md:space-y-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ backgroundImage: "url('/2.jpg')" }}
    >
      {/* Text Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="text-center md:text-left"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-1"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          Join Our Learning Community Today
        </motion.h2>
        <motion.p
          className="text-sm md:text-lg mb-4"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          Get in touch to learn more about Programs and Schedules.
        </motion.p>
      </motion.div>

      {/* Button Section */}
      <Link href="/aboutus">
      <motion.button
        className="bg-orange-500 text-black px-6 md:px-8 font-bold py-3 md:py-4 rounded-lg hover:bg-orange-600 transition duration-300"
        // onClick={() => alert("Learn more about us!")}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        About us
      </motion.button>
        </Link>
    </motion.div>
  );
};

export default Banner;
