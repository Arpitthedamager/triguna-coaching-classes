"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
  // FAQ Data
  const faqs: FAQItem[] = [
    {
      question: "What subjects does your institution offer?",
      answer:
        "Our institution offers a wide range of subjects including Science, Arts, Commerce, and specialized courses in technology.",
    },
    {
      question: "How can I contact admissions support?",
      answer:
        "You can contact our admissions support via email at support@institution.com or call us at +1 234 567 890.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "Our refund policy allows you to request a refund within 30 days of enrollment if you meet the eligibility criteria.",
    },
  ];

  // State to track the currently open FAQ
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Open/close the selected FAQ
  };

  return (
    <motion.section
      className="text-primary-a20 py-10 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="py-10 px-6 lg:px-20 xl:px-52">
        {/* Heading */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold mb-2">
            Frequently asked questions answered
          </h2>
          <p className="text-gray-600 text-xl">
            In this section, you can address common questions efficiently
            regarding our programs.
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
                <h3 className="text-2xl font-medium">{faq.question}</h3>
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
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
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
