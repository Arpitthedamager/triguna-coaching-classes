"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [randomPositions, setRandomPositions] = useState<{ top: string; left: string }[]>([]);

  // Generate random positions for background dots after initial render (client-side)
  useEffect(() => {
    const positions = Array.from({ length: 40 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setRandomPositions(positions);
  }, []);
  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#8b50fc] to-[#570df8 ] text-white py-20 px-6 lg:px-20 xl:px-52 overflow-hidden">
      {/* Background Spot with Framer Motion */}
      <motion.div
        id="contact-us"
        className="absolute top-auto -bottom-1/2 left-0 w-[400px] h-[400px] rounded-full bg-yellow-400 blur-[200px]"
        initial={{
          opacity: 0,
          scale: 0.5,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}  // Runs animation when in view
        viewport={{ once: true }}  // Ensures it runs only once
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {randomPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
            style={{
              top: position.top,
              left: position.left,
            }}
            initial={{ opacity: 0, y: "0%" }}
            animate={{
              y: ["0%", "100%"],
              x: ["-10%", "10%"],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 0.5 + 0.2,  // Add random delay for background elements
            }}
            whileInView={{ opacity: 1, y: ["0%", "100%"] }}  // Runs animation when in view
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}  // Runs animation when in view
        viewport={{ once: true }}  // Ensures it runs only once
      >
        {/* Branding Section */}
        <div className="space-y-4">
          <motion.h1
            className="text-3xl font-bold text-yellow-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            whileInView={{ opacity: 1, x: 0 }}  // Runs animation when in view
            viewport={{ once: true }}  // Ensures it runs only once
          >
            Triguna Coaching Classes
          </motion.h1>
          <p className="text-white">
            Empowering students with knowledge and skills for a brighter future.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">Quick Links</h2>
          <ul className="space-y-2">
            {["Home", "About Us", "Contact"].map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                whileInView={{ opacity: 1, x: 0 }}  // Runs animation when in view
                viewport={{ once: true }}  // Ensures it runs only once
              >
                <a
                  href={`${link.toLowerCase().replace(/\s+/g, "")}`}
                  className="text-white hover:text-yellow-400 transition"
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
          <p className="text-white mb-2">
            Kalindi Vihar B-Block, Tedi Bhagiya, Agra 282006
          </p>
          <p className="text-white mb-2">
            Email:{" "}
            <a
              href="mailto:info@trigunaclasses.com"
              className="hover:text-yellow-400"
            >
              info@trigunaclasses.com
            </a>
          </p>
          <p className="text-white mb-2">
            Phone:{" "}
            <a
              href="tel:+917891234567"
              className="hover:text-yellow-400"
            >
              +91 7891234567
            </a>
          </p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl hover:text-yellow-400 transition"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.4,
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Copyright Section */}
      <motion.div
        className="text-center mt-10 text-xl text-gray-600 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}  // Runs animation when in view
        viewport={{ once: true }}  // Ensures it runs only once
      >
        <p>&copy; {currentYear} Triguna Coaching Classes. All Rights Reserved.</p>
      </motion.div>

      {/* Additional Animated Element */}
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <motion.div
          className="orange-elipse"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}  // Added delay for this element
          whileInView={{ scale: 1 }}  // Runs animation when in view
          viewport={{ once: true }}  // Ensures it runs only once
        />
      </div>
    </footer>
  );
};

export default Footer;
