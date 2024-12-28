"use client";
import { motion } from "framer-motion";

const teachers = [
  {
    name: "Mr. John Doe",
    subject: "Physics",
    phone: "+1 234 567 890",
    email: "john.doe@example.com",
    details: "Available: Mon-Fri, 10 AM - 3 PM",
  },
  {
    name: "Ms. Jane Smith",
    subject: "Mathematics",
    phone: "+1 987 654 321",
    email: "jane.smith@example.com",
    details: "Available: Tue-Thu, 11 AM - 2 PM",
  },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">Contact Our Teachers</h1>
        <p className="mt-4 text-lg text-gray-600">
          Reach out to your teachers for any assistance or guidance.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {teachers.map((teacher, index) => (
          <motion.div
            key={index}
            className="rounded-lg bg-white shadow-lg p-6 border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">{teacher.name}</h2>
            <p className="text-gray-600 mt-1">Subject: {teacher.subject}</p>
            <p className="text-gray-600 mt-1">Phone: {teacher.phone}</p>
            <p className="text-gray-600 mt-1">Email: {teacher.email}</p>
            <p className="text-gray-500 mt-3">{teacher.details}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
