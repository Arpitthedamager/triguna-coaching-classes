import { FC } from 'react';
import { motion } from 'framer-motion';

const StatCard: FC<{ title: string; value: string; bgColor: string }> = ({ title, value, bgColor }) => {
  return (
    <motion.div
      className={`card shadow-lg px-4 py-10 ${bgColor} text-gray-900`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="card-title">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
};

export default StatCard;
