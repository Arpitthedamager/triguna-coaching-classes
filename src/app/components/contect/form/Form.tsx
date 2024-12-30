"use client";
import { motion } from "framer-motion";

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Construct the WhatsApp message
    const whatsappMessage = `Hello!%0A%0AYou have a new contact form submission:%0A%0AName: ${encodeURIComponent(
      data.name as string
    )}%0AEmail: ${encodeURIComponent(
      data.email as string
    )}%0AContact Number: ${encodeURIComponent(
      data.contactNumber as string
    )}%0AMessage: ${encodeURIComponent(data.message as string)}%0A%0AThank you!`;
    const groupMessageLink = `https://wa.me/?text=${whatsappMessage}`;

    // Open the WhatsApp group with a pre-filled message
    window.open(groupMessageLink, "_blank");
  };

  return (
    <motion.div
      className="mt-16 text-gray-600 bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-gray-600 font-medium"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-600 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
