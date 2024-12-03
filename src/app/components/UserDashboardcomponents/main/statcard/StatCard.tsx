import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StatCard: FC<{ title: string; value: string; bgColor: string }> = ({ title, value, bgColor }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Convert the string value to a number
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''), 10); 

  // Animate the number increment
  useEffect(() => {
    let start = 0;
    const end = targetValue;
    const duration = 2; // Duration of animation in seconds
    const incrementTime = (duration * 1000 ) / end;

    const interval = setInterval(() => {
      if (start < end) {
        start += 1;
        setAnimatedValue(start);
      } else {
        clearInterval(interval);
      }
    }, incrementTime);

    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <motion.div
      className={`card shadow-lg px-4 py-10 ${bgColor} text-gray-900`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="card-title">{title}</h2>
      <p className="text-2xl font-bold">{animatedValue}</p>
    </motion.div>
  );
};

export default StatCard;
