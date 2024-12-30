"use client";

import { motion } from "framer-motion";

const HeaderSection = () => (
  <motion.div
    className="text-center py-16"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="text-5xl md:text-6xl font-extrabold text-primary-a20">
      Contact Us
    </h1>
    <p className="mt-6 text-lg md:text-xl text-gray-700">
      Have any questions? Reach out to us, and we&apos;ll get back to you as soon as
      possible. We&apos;re here to help and support you in your learning journey.
    </p>
    <div className="flex justify-center mt-8 space-x-6">
      <motion.div
        className=" shadow-md rounded-lg p-6 md:p-8 text-center max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-primary-a20">Email Us</h3>
        <p className="text-gray-600 mt-2">
          Send us an email at{" "}
          <a
            href="mailto:support@example.com"
            className="text-primary-a20 hover:underline"
          >
            support@example.com
          </a>
        </p>
      </motion.div>
      <motion.div
        className="shadow-md rounded-lg p-6 md:p-8 text-center max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-primary-a20">Call Us</h3>
        <p className="text-gray-600 mt-2">
          Speak to us directly at{" "}
          <a
            href="tel:+1234567890"
            className="text-primary-a20 hover:underline"
          >
            +1 (234) 567-890
          </a>
        </p>
      </motion.div>
      <motion.div
        className=" shadow-md rounded-lg p-6 md:p-8 text-center max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-primary-a20">Visit Us</h3>
        <p className="text-gray-600 mt-2">
          Come by our office at{" "}
          <span className="text-primary-a20">
            123 Education Street, Cityville, ED 12345
          </span>
        </p>
      </motion.div>
    </div>
  </motion.div>
);

export default HeaderSection;
