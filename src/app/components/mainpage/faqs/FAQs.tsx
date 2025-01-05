"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
 
const faqs: FAQItem[] = [
  {
    question: "What courses are offered at Triguna Coaching Classes?",
    answer:
      "We offer comprehensive coaching for high school and higher secondary students, focusing on subjects like Mathematics, SST, Physics, Chemistry and Biology, as well as competitive exams such as JEE, NEET.",
  },
  {
    question: "What are the qualifications of your teaching faculty?",
    answer:
      "Our faculty members are highly experienced and qualified, holding advanced degrees in their respective fields with a proven track record of helping students excel academically.",
  },
  {
    question: "How can I enroll in your programs?",
    answer:
      "You can enroll by visiting our center or through the 'Register' button on our website. For assistance, feel free to contact us at [contact details].",
  },
  {
    question: "Do you provide study materials and regular tests?",
    answer:
      "Yes, we provide detailed study materials like notes, books pdf, test papers on our website and conduct weekly tests to track students' progress and help them prepare effectively for their exams.",
  },
  {
    question: "Is there a demo class available before enrollment?",
    answer:
      "Absolutely! We offer demo classes to help students and parents experience our teaching methodology and determine if it's the right fit for their needs.",
  },
];

  // State to track the currently open FAQ
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Open/close the selected FAQ
  };

  return (
    <motion.section
      className="text-primary-a20 text-center py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-52"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="py-10">
        {/* Heading */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Frequently asked questions answered
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            In this section, you can address common questions efficiently regarding our programs.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-200 pb-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question Section */}
              <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
                  {faq.question}
                </h3>
                <motion.button
                  className="transform transition-transform"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-label={`Toggle answer for: ${faq.question}`}
                >
                  ↓
                </motion.button>
              </div>

              {/* Answer Section with Animation */}
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-left text-sm sm:text-base md:text-lg text-gray-700">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQs;
