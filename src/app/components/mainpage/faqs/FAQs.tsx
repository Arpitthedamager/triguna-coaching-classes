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
    {
      question: "What is the class schedule?",
      answer:
        "Our classes are scheduled after school hours or on weekends to accommodate students' needs. Please contact us for detailed information regarding the timetable.",
    },
    {
      question: "Do you offer online classes?",
      answer:
        "Yes, we offer both in-person and online classes to provide flexibility and convenience to our students.",
    },
    {
      question: "How do I make a payment for the course?",
      answer:
        "You can make payments via bank transfer, online payment gateways, or in-person at our center. For more details, please visit our payment section on the website.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "We offer a refund within 7 days of enrollment, provided the student has not attended more than one class. Please refer to our refund policy for more details.",
    },
    {
      question: "How do I get updates about classes and exams?",
      answer:
        "We send regular updates via email and text messages to keep students informed about upcoming classes, tests, and important announcements.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const visibleFAQs = showMore ? faqs : faqs.slice(0, 5);

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
          {visibleFAQs.map((faq, index) => (
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

        {/* Show More / Show Less Button */}
        {faqs.length > 5 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              className="text-primary-a20 font-semibold hover:underline"
              onClick={toggleShowMore}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </motion.div>
        )}
      </div>

      {/* Structured Data for FAQ (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </motion.section>
  );
};

export default FAQs;
