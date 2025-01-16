"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Define user and filter interfaces
interface User {
  _id: string;
  name: string;
  email: string;
  class: number;
  role: string;
  profileImage?: string;
  subjects: { [key: string]: boolean };
}

interface Filters {
  class: string;
  subjects: string;
}

const UserEdit = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({ class: "", subjects: "" });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state


  // Fetch users on component mount
  useEffect(() => {
    // setLoading(true); // Set loading to true when fetching data
    fetch("/api/edituser")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
      setLoading(false); // Set loading to false even if there's an error
      // console.log("Users fetched successfully!");
      
  }, []);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter((user) => {
    const matchesClass = filters.class
      ? user.class === parseInt(filters.class)
      : true;
    const matchesSubject = filters.subjects
      ? user.subjects[filters.subjects]
      : true;
    return matchesClass && matchesSubject;
  });

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      fetch("/api/edituser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: userId }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed t  o delete user");
          return res.json();
        })
        .then(() => {
          setUsers((prev) => prev.filter((user) => user._id !== userId));
          alert("User deleted successfully!");
          setSelectedUser(null);
        })
        .catch((err) => alert("Error deleting user: " + err.message));
    }
  };

  const handleSave = () => {
    if (!selectedUser) return;

    fetch("/api/edituser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedUser),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
      })
      .then((updatedUser: User) => {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        alert("User updated successfully!");
        setSelectedUser(null);
      })
      .catch((err) => alert("Error updating user: " + err.message));
  };

  const handleSubjectChange = (subject: string) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        subjects: {
          ...selectedUser.subjects,
          [subject]: !selectedUser.subjects[subject],
        },
      });
    }
  };

  return (
    <div className="p-6 text-gray-600 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Filters Section */}
        <motion.div
          className="mb-6 p-4 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex space-x-4 items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Add Students</h2>

            <Link href="/register">
              <button className="p-2 m-2 items-center bg-primary-a20 text-white">
                add student
              </button>
            </Link>
          </div>
          <div className="flex space-x-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Filter by Class:
              </label>
              <select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Classes</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Filter by Subject:
              </label>
              <select
                name="subjects"
                value={filters.subjects}
                onChange={handleFilterChange}
                className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Subjects</option>
                <option value="physics">Physics</option>
                <option value="math">Math</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>
          </div>
        </motion.div>
         {/* Loading Spinner */}
         {loading && (
          <div className="flex justify-center items-center ">
            <h2 className="text-2xl font-semibold text-gray-800">Loading Users...</h2>
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* Users List Section */}
        {!loading && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex md:flex-col items-center space-x-6 mb-4">
                <img
                  src={user.profileImage || "/default-avatar.jpg"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    Class: {user.class || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">Role: {user.role}</p>
                  <p className="text-sm text-gray-500">
                    Subjects:{" "}
                    {Object.keys(user.subjects)
                      .filter((subject) => user.subjects[subject]) // Only include subjects with value true
                      .map(
                        (subject) =>
                          subject.charAt(0).toUpperCase() + subject.slice(1)
                      ) // Capitalize first letter
                      .join(", ") || "None"}
                  </p>{" "}
                </div>
              </div>
              <button
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
            </motion.div>
          ))}
        </motion.div>
        )}

        {/* Edit User Modal */}
        {selectedUser && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Edit User</h2>

              {/* User Edit Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700">Name:</label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                    className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Email:</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser((prev) =>
                        prev ? { ...prev, email: e.target.value } : null
                      )
                    }
                    className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Class:</label>
                  <input
                    type="number"
                    value={selectedUser.class || ""}
                    onChange={(e) =>
                      setSelectedUser((prev) =>
                        prev
                          ? { ...prev, class: parseInt(e.target.value) }
                          : null
                      )
                    }
                    className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Role:</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser((prev) =>
                        prev ? { ...prev, role: e.target.value } : null
                      )
                    }
                    className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-gray-700">
                    Subjects
                  </h3>
                  {Object.keys(selectedUser.subjects).map((subject) => (
                    <div key={subject} className="flex items-center mb-2">
                      <label className="mr-2 capitalize">{subject}</label>
                      <input
                        type="checkbox"
                        checked={selectedUser.subjects[subject]}
                        onChange={() => handleSubjectChange(subject)}
                        className="h-5 w-5"
                      />
                      <span className="ml-2">
                        {selectedUser.subjects[subject]
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => setSelectedUser(null)} // Reset selected user
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(selectedUser._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEdit;
