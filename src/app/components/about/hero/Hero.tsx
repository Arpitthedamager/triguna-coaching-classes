"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="bg-primary-content">
        {/* Navbar */}
        <nav className="relative bg-primary-a50 py-4 flex justify-between items-center z-10 px-4 md:px-8">
          <motion.div
            className="text-lg font-bold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Logo
          </motion.div>
          
          <motion.div
            className="hidden lg:flex space-x-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a href="#about" className="hover:text-gray-300">About</a>
            <a href="#enroll" className="hover:text-gray-300">Enroll Now</a>
            <a href="#contact" className="hover:text-gray-300">Contact</a>
            <a href="#notes" className="hover:text-gray-300">Notes</a>
          </motion.div>

          <Link href="/signin">
            <motion.button
              className="px-6 py-2 bg-yellow-500 text-[#241448] font-bold rounded-lg hover:bg-yellow-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </Link>
        </nav>

        {/* Hero Section */}
        <section
          className="relative h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1326947/pexels-photo-1326947.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-opacity-30"></div>
          <div className="container mx-auto px-4 sm:px-8 lg:px-40 h-full flex items-center">
            <div className="relative z-10 text-white max-w-2xl">
              <ul className="flex space-x-4 text-white text-xl sm:text-3xl">
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2"
                  >
                    <span>Home</span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    >
                      <path
                        fill="currentColor"
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-4xl sm:text-5xl">
                    About Us
                  </a>
                </li>
              </ul>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-6xl sm:text-5xl md:text-6xl font-bold">
                  Know us Better
                </h1>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
