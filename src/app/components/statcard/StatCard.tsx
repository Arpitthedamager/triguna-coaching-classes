import { FC } from 'react';
import { motion } from 'framer-motion';

const StatCard: FC<{ title: string; value: string; bgColor: string }> = ({ title, value, bgColor }) => {
  return (
    <motion.div
      className={`card shadow-lg p-4 ${bgColor} text-white`}
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
