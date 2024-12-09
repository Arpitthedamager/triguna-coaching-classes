"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer 
    className="relative bg-gradient-to-b from-[#8b50fc] to-[#570df8 ] text-white py-20 px-6 lg:px-20 xl:px-52 overflow-hidden"
    // className="relative bg-gradient-to-b  from-[#8b50fc] to-[#570df8] text-white py-20 px-6 lg:px-20 xl:px-52 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
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

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Branding Section */}
        <div className="space-y-4">
          <motion.h1
            className="text-3xl font-bold text-yellow-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Triguna Coaching Classes
          </motion.h1>
          <p className="text-gray-300">
            Empowering students with knowledge and skills for a brighter future.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">Quick Links</h2>
          <ul className="space-y-2">
            {["Home", "Courses", "About Us", "Contact"].map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Address & Contact */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">Contact Us</h2>
          <p className="text-gray-300 mb-2">
            Kalindi Vihar B-Block, Tedi Bhagiya, Agra 282006
          </p>
          <p className="text-gray-300 mb-2">
            Email:{" "}
            <a
              href="mailto:info@trigunaclasses.com"
              className="hover:text-yellow-400"
            >
              info@trigunaclasses.com
            </a>
          </p>
          <p className="text-gray-300 mb-2">
            Phone:{" "}
            <a
              href="tel:+917891234567"
              className="hover:text-yellow-400"
            >
              +91 7891234567
            </a>
          </p>
          <div className="flex space-x-4 mt-4">
            {["facebook", "twitter", "instagram", "linkedin"].map((platform, index) => (
              <motion.a
                key={index}
                href={`https://${platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400 transition"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                <i className={`fab fa-${platform} text-2xl`}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Copyright Section */}
      <motion.div
        className="text-center mt-10 text-gray-400 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p>&copy; {new Date().getFullYear()} Triguna Coaching Classes. All Rights Reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
