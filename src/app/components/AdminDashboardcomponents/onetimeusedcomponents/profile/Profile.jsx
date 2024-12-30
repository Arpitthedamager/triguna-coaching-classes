import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for session management
import { signOut } from "next-auth/react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: session, status } = useSession(); // Getting session data with next-auth

  // Check if session is loaded
  useEffect(() => {
    if (status === "loading") return;
    if (!session)  return;
    
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile?email=${session.user?.email}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.user?.email}`, // Sending email as bearer token
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setTempProfile(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [session, status]);

  const handleInputChange = (e) => {
    if (tempProfile) {
      setTempProfile({
        ...tempProfile,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user?.email}`, // Using email to authorize the request
        },
        body: JSON.stringify(tempProfile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setTempProfile(updatedProfile);
        setIsEditing(false);
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const cancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, type: "spring", stiffness: 80 },
    },
    exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.5 } },
  };

  const buttonHover = {
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" },
  };

  
  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (!session) {
    return <p>Not signed in</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="text-gray-500 rounded-full bg-gradient-to-br from-pink-100 via-primary-content to-blue-100 min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="bg-white p-8 rounded-full shadow-lg w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      >
        <h2 className="text-4xl font-bold text-center text-primary-a20 mb-8">
          My Profile
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Profile Image */}
          <motion.div
            className="relative w-40 h-40 rounded-full overflow-hidden shadow-md"
            whileHover="hover"
            variants={containerVariants}
          >
            <img
              src={profile.profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Profile Information */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.div
                  key="view"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Full Name</p>
                    <p className="text-gray-600">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Email Address</p>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Phone Number</p>
                    <p className="text-gray-600">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Address</p>
                    <p className="text-gray-600">{profile.address}</p>
                  </div>
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="btn bg-primary-a20 text-white hover:bg-primary-a30 mt-6"
                    whileHover={buttonHover.hover}
                  >
                    Edit Profile
                  </motion.button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn bg-red-900 text-white py-2 px-4 rounded-lg"
                  >
                    Sign Out
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="edit"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={tempProfile?.name || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={tempProfile?.email || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={tempProfile?.phone || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">
                        Address
                      </span>
                    </label>
                    <textarea
                      name="address"
                      value={tempProfile?.address || ""}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered w-full"
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-4 mt-4">
                    <motion.button
                      onClick={cancelEdit}
                      className="btn btn-ghost"
                      whileHover={buttonHover.hover}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={saveProfile}
                      className="btn btn-primary"
                      whileHover={buttonHover.hover}
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
