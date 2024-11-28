import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Sidebar: FC = () => {
  // Variants for Framer Motion animations
  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { duration: 0.5 } },
  };

  const menuItemVariants = {
    hidden: { x: '-50%', opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1, // Stagger the menu items
      },
    }),
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', active: true },
    { label: 'Profile', path: '/profile' },
    { label: 'Study Materials', path: '/study-materials' },
    { label: 'Students', path: '/students' },
    { label: 'Exams', path: '/exams' },
    { label: 'Results', path: '/results' },
    { label: 'Fees', path: '/fees' },
  ];

  // Share logic
  const handleShare = async () => {
    const shareData = {
      title: 'Invite to Triguna Coaching Classes',
      text: 'Join Triguna Coaching Classes with me! Click the link below to get started.',
      url: 'https://trigunacoaching.in', // Replace with your invite link
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        alert('Invitation shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Share API
      navigator.clipboard.writeText(shareData.url);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <motion.aside
      className="w-64 bg-base-100 shadow-lg h-screen flex flex-col justify-between"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sidebar header */}
      <div className="p-4">
        <h2 className="text-2xl font-bold pb-4 pl-2 text-primary">Triguna Coaching Classes</h2>
        <ul className="menu p-0">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              className={`font-semibold rounded-full ${
                item.active ? 'bg-primary-a20 text-white' : 'text-gray-400'
              } hover:bg-primary-a20 hover:text-white`}
              custom={index}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link href={item.path}>{item.label}</Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Sidebar footer */}
      <motion.div
        className="p-4 bg-transparent text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <motion.img
            src="/slidebar/slidebarimage.svg"
            alt="Invite"
            className="w-56 h-56"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
            className="btn bg-primary-a20 text-white mt-4 px-8 hover:bg-primary-a30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={handleShare} // Attach the share logic here
          >
            Invite Friend
          </motion.button>
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
