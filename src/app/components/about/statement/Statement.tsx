"use client";

import { motion } from "framer-motion";

const Statement = () => {
  return (
    <section className="py-16 px-40 bg-primary-content">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Animated Heading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-800">
              Statement of Beliefs
            </h2>
          </motion.div>

          {/* Image */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src="https://cdn.dorik.com/60d808c119777c001197db2e/6159487c88e0ff001f9e0c9b/images/Mask-group_ajdllld1.png"
              alt="Statement of Beliefs"
              className="w-full  rounded-lg shadow-lg"
              loading="lazy"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="text-gray-600 text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p>
              And looked first and not coffee relieved for and to there phase.
              By descriptions, not checks, broad. Commas, little the text and on
              six he spare world; To politely ago. Self-interest, a win handed
              epic a rung flows researches linux how the essential thing paper
              avoids the to a rippedup, by her present of it to my he in the as
              slight tone a ability now the there good behavioural opinion, any
              the overall hall higher control from have anyone and road, it for
              respect.
            </p>
          </motion.div>

          {/* Horizontal Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-full max-w-lg"
          >
            <hr className="border-t-2 border-gray-300" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Statement;
