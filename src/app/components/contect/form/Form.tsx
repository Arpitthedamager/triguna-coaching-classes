"use client";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const whatsappMessage = `Hello!%0A%0AYou have a new contact form submission:%0A%0AName: ${encodeURIComponent(
      data.name as string
    )}%0AEmail: ${encodeURIComponent(
      data.email as string
    )}%0AContact Number: ${encodeURIComponent(
      data.contactNumber as string
    )}%0AMessage: ${encodeURIComponent(
      data.message as string
    )}%0A%0AThank you!`;
    const groupMessageLink = `https://wa.me/?text=${whatsappMessage}`;
    window.open(groupMessageLink, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 mt-16 max-w-6xl mx-auto px-4 md:px-6">
      {/* Left Section */}
      <motion.div
        className="w-full md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-900">Get In Touch</h2>
        <p className="text-gray-700">
          Feel free to contact us using the information below or via the form.
        </p>
        <div className="space-y-4">
          <motion.div
            className="flex gap-4 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-primary-a20 text-white rounded-full transition-transform">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h4 className="font-bold text-left text-gray-900">Address</h4>
              <a
                href="https://www.google.com/maps/place/Triguna+Coaching+Classes/@27.2248173,78.0587476,823m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39747b48dbb8692b:0x78872c32e0b2a866!8m2!3d27.2248173!4d78.0587476!16s%2Fg%2F11hkp1qzfz?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="text-gray-600 hover:text-primary-a30 transition"
              >
                B-294, A Block, Kalindi Vihar, Agra, Uttar Pradesh 282006{" "}
              </a>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-primary-a20 text-white rounded-full transition-transform">
              <FaPhoneAlt />
            </div>
            <div>
              <h4 className="font-bold text-left text-gray-900">
                Phone Number
              </h4>
              <a
                href="tel:+919917989914"
                className="text-gray-600 hover:text-primary-a30 transition"
              >
                +91 9917989914
              </a>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-primary-a20 text-white rounded-full transition-transform">
              <FaEnvelope />
            </div>
            <div>
              <h4 className="font-bold text-left text-gray-900">E-Mail</h4>
              <a
                href="mailto:trigunacoachingclasses@gmail.com"
                className="text-gray-600 hover:text-primary-a30 transition"
              >
                trigunacoachingclasses@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
        <div className="mt-6">
          <h4 className="font-bold text-left text-gray-900">Follow Us:</h4>
          <div className="flex gap-4 mt-2">
            {[
              { icon: FaFacebookF, link: "https://www.facebook.com/people/Triguna-Coaching-Classes/100063716935409/" },
              { icon: FaTwitter, link: "#" },
              { icon: FaInstagram, link: "#" },
              { icon: FaLinkedinIn, link: "#" },
            ].map(({ icon: Icon, link }, index) => (
              <motion.a
                key={index}
                href={link}
                target="_blank"
                whileHover={{ scale: 1.2 }}
                className="w-10 h-10 flex items-center justify-center bg-primary-a20 text-white rounded-full"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="w-full md:w-1/2 bg-white p-8 md:ml-10 rounded-3xl shadow-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-primary-a20 text-center">
          Send a Message
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-6 text-left text-gray-500 space-y-4"
        >
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "contactNumber", label: "Contact Number", type: "tel" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-gray-400 font-medium">
                {label}
              </label>
              <motion.input
                id={id}
                name={id}
                type={type}
                whileFocus={{ scale: 1.03 }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-a20 focus:border-primary-a20"
                required
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-400 font-medium"
            >
              Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              rows={4}
              whileFocus={{ scale: 1.03 }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-a30 focus:border-primary-a20"
              required
            ></motion.textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full py-2 px-4 bg-primary-a30 text-white font-semibold rounded-md hover:bg-primary-a20 transition"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
