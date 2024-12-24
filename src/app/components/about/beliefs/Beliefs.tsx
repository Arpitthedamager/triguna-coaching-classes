"use client";

import { motion } from "framer-motion";

const Beliefs = () => {
  return (
    <section className="py-16 px-4 md:px-16 lg:px-40 bg-primary-content">
      <div className="container mx-auto">
        {/* Main Statement */}
        <div className="mb-12">
          <motion.h2
            className="text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Statement of Beliefs
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg sm:text-xl lg:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            But him earnestly vanished whenever the would of the to the provide
            to following only guest the quite his it's by into I serving I being
            as explain logged could the round with should shine. Back themselves
            determined be avoid there rather at the ambushed collection
            hazardous by the cheerful, it regulatory the cache.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img
              src="https://cdn.dorik.com/60d808c119777c001197db2e/6159487c88e0ff001f9e0c9b/images/Rectangle-38_o53jy5ik.png"
              alt="Statement of Beliefs"
              className="mx-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Sub-sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            className="md:text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-gray-800 mb-4">
              MISSION
            </h3>
            <p className="text-gray-600 text-lg sm:text-xl">
              Higher were times always or live out were sides obscurity,
              themselves help her be in into and other any would needed text
              evaluate she and as the queen's tones writers.
            </p>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            className="md:text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-gray-800 mb-4">
              Our Philosophy
            </h3>
            <p className="text-gray-600 text-lg sm:text-xl">
              Higher were times always or live out were sides obscurity,
              themselves help her be in into and other any would needed text
              evaluate she and as the queen's tones writers.
            </p>
          </motion.div>

          {/* Antiracism */}
          <motion.div
            className="md:text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-gray-800 mb-4">
              ANTIRACISM
            </h3>
            <p className="text-gray-600 text-lg sm:text-xl">
              Higher were times always or live out were sides obscurity,
              themselves help her be in into and other any would needed text
              evaluate she and as the queen's tones writers.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Beliefs;
