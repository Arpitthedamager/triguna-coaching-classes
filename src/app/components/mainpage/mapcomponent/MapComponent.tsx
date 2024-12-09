"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MapComponent: React.FC = () => {
  // Static Map Image URL for Triguna Coaching Classes, India
  const mapImageUrl = "/map/map.png";

  // Google Maps Link
  const googleMapsLink = "https://www.google.com/maps/place/Triguna+Coaching+Classes/@27.2248173,78.0561727,823m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39747b48dbb8692b:0x78872c32e0b2a866!8m2!3d27.2248173!4d78.0587476!16s%2Fg%2F11hkp1qzfz?entry=ttu";

  // Ref and InView for animation trigger
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="py-10 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold text-center text-primary-a20 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Visit Our Place
        </motion.h2>

        {/* Map Container with Animation */}
        <motion.div
          className="relative w-full h-80 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          {/* Link to Google Maps */}
          <motion.a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Image Map */}
            <img
              src={mapImageUrl}
              alt="Triguna Coaching Classes Location"
              className="w-full h-full object-cover"
            />
          </motion.a>

          {/* Optional Marker using DaisyUI */}
          <motion.div
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-primary-500 text-white px-2 py-1 rounded-md"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Triguna Coaching Classes
          </motion.div>
        </motion.div>

        {/* Address Below Map with Animation */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.p
            className="text-lg font-semibold text-gray-700"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Kalindi Vihar B-Block, Tedi Bhagiya, Agra 282006
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MapComponent;
