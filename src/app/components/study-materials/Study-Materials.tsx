import { FC, useState } from "react";
import { motion } from "framer-motion";

const StudyMaterial: FC = () => {
  // Sample data for recently viewed materials
  const recentlyViewed = [
    {
      id: 3,
      visitedDate: "2024-11-20",
    },
    {
      id: 5,
      visitedDate: "2024-11-25",
    },
    {
      id: 4,
      visitedDate: "2024-11-23",
    },
    {
      id: 6,
      visitedDate: "2024-11-23",
    },{
      id: 7,
      visitedDate: "2024-11-23",
    },
  ];

  // All available materials
  const allMaterials = [
    {
      id: 3,
      title: "Physics: Mechanics",
      description: "Covers the basics of kinematics and dynamics.",
      teacher: "Prof. Alan Walker",
      image: "https://via.placeholder.com/150",
      addedDate: "2024-11-15",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 4,
      title: "Computer Science Basics",
      description: "Introduction to algorithms and programming.",
      teacher: "Ms. Rachel Green",
      image: "https://via.placeholder.com/150",
      addedDate: "2024-11-20",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 5,
      title: "Statistics for Beginners",
      description: "Learn descriptive and inferential statistics.",
      teacher: "Dr. Michael Scott",
      image: "https://via.placeholder.com/150",
      addedDate: "2024-11-25",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 6,
      title: "Introduction to Chemistry",
      description: "A beginner's guide to basic chemistry concepts.",
      teacher: "Dr. Emma Watson",
      image: "https://via.placeholder.com/150",
      addedDate: "2024-11-10",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 7,
      title: "Advanced Calculus",
      description: "An in-depth guide to multivariable calculus.",
      teacher: "Dr. John Doe",
      image: "https://via.placeholder.com/150",
      addedDate: "2024-11-05",
      downloadLink: "#",
      openLink: "#",
    },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter materials based on search query
  const filteredMaterials = allMaterials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecentlyViewed = recentlyViewed
  .map((viewed) => {
    const material = allMaterials.find((mat) => mat.id === viewed.id);
    if (material) {
      return { ...material, visitedDate: viewed.visitedDate };
    }
    return null;
  })
  .filter((material): material is NonNullable<typeof material> => material !== null) // TypeGuard to remove null values
  .sort((a, b) => {
    if (a && b) {
      return new Date(b.visitedDate).getTime() - new Date(a.visitedDate).getTime();
    }
    return 0; // Return 0 if either a or b is null, but it shouldn't happen due to the filter
  });
  const sortedRecentlyAdded = [...allMaterials].sort((a, b) => {
    if (a && b) {
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
    return 0; // Return 0 if either a or b is null, but it shouldn't happen
  });

  // Slideshow state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexViewed, setCurrentIndexViewed] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sortedRecentlyAdded.length - 3 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sortedRecentlyAdded.length - 3 ? 0 : prevIndex + 1));
  };

  const handlePrevClickViewed = () => {
    setCurrentIndexViewed((prevIndex) => (prevIndex === 0 ? filteredRecentlyViewed.length - 3 : prevIndex - 1));
  };

  const handleNextClickViewed = () => {
    setCurrentIndexViewed((prevIndex) => (prevIndex === filteredRecentlyViewed.length - 3 ? 0 : prevIndex + 1));
  };

  const renderMaterials = (materials: any[]) =>
    materials.map((material, index) => (
      <motion.div
        key={material.id}
        className="card bg-transparent p-4 rounded-lg shadow hover:shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        <img
          src={material.image}
          alt={material.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h4 className="font-bold text-gray-800">{material.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{material.description}</p>
        <span className="text-xs text-gray-500">By {material.teacher}</span>
        <div className="mt-4 space-x-4">
          <a
            href={material.downloadLink}
            className="text-primary-a20 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
          <a
            href={material.openLink}
            className="text-green-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF
          </a>
        </div>
      </motion.div>
    ));

  return (
    <motion.div
      className="bg-transparent p-6 pt-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with search bar */}
      <header className="flex items-center justify-between p-4 bg-transparent">
        <h1 className="text-xl font-bold text-SessionContext">My StudyMaterial</h1>
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered rounded-full w-full max-w-xs pr-0 text-gray-600" // Increased padding-right for the icon
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="bg-primary-a30 right-0 top-1/2 transform -translate-y-1/2 absolute text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
              <span>👤</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Displaying search results (if any) */}
      {searchQuery && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Search Results</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {renderMaterials(filteredMaterials)}
          </div>
        </div>
      )}

      {/* Recently Viewed Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recently Viewed</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {renderMaterials(filteredRecentlyViewed.slice(currentIndexViewed, currentIndexViewed + 3))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevClickViewed}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg hover:bg-primary-a20 transition duration-300"
          >
            Prev
          </button>
          <button
            onClick={handleNextClickViewed}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg hover:bg-primary-a20 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* Recently Added Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recently Added</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {renderMaterials(sortedRecentlyAdded.slice(currentIndex, currentIndex + 3))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg hover:bg-primary-a20 transition duration-300"
          >
            Prev
          </button>
          <button
            onClick={handleNextClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg hover:bg-primary-a20 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* All Materials Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">All Materials</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {renderMaterials(allMaterials.sort((a, b) => a.title.localeCompare(b.title)))}
        </div>
      </div>
    </motion.div>
  );
};

export default StudyMaterial;
  