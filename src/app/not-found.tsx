"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div className="lg:px-24 md:px-16 px-4 pt-40 items-center min-h-screen flex justify-center overflow-x-hidden flex-col lg:flex-row md:gap-28 gap-16 bg-primary-content">
      {/* Left Section: Text and Button */}
      <div className="w-full lg:w-1/2 xl:w-1/2 relative lg:pb-0">
        <div className="relative">
          {/* 404 Image with a girl sitting */}
          <div className="relative">
            <motion.img
              src="https://i.ibb.co/G9DC8S0/404-2.png"
              alt="404 Error Image"
              className="relative z-10 w-full max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            {/* Girl sitting on 404 */}
            <motion.img
              src="/404/girl.png"
              alt="Girl sitting on 404 text"
              className="absolute z-20 -top-36 left-1/2 transform -translate-x-1/2 -translate-y-[30%]" // Adjusted position upwards
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          {/* Text */}
          <motion.div
            className="mt-8 text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="my-2 text-secondary font-bold text-2xl sm:text-3xl md:text-4xl">
              Looks like you&apos;ve found the doorway to the great nothing
            </h1>
            <p className="my-2 text-white text-sm sm:text-base">
              Sorry about that! Please visit our homepage to get where you need to go.
            </p>
            {/* Button with Link */}
            <Link href="/" passHref>
              <motion.button
                className="sm:w-full lg:w-auto my-2 border-indigo-600 rounded-md py-4 px-8 text-center bg-indigo-600 hover:bg-indigo-800 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Go back to home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Section: Another Image */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full lg:w-1/2 xl:w-1/2"
      >
        <img
          src="https://i.ibb.co/ck1SGFJ/Group.png"
          alt="Illustration"
          className="w-full max-w-sm md:max-w-md mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
