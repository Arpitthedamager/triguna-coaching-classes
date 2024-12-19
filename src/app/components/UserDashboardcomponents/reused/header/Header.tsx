import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between p-4 pt-0  bg-transparent">
      <h1 className="md:text-xl ml-5 md:ml-0 text-lg font-bold text-SessionContext">My Dashboard</h1>
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <Link href="/StudyMaterials">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered rounded-full w-full max-w-xs sm:max-w-36 pr-0"
            />
          <div className="bg-primary-a30 right-0 top-1/2 transform -translate-y-1/2 absolute text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
            <span>👤</span>
          </div>
            </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
