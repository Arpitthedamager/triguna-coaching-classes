"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Define Notice interface
interface Notice {
  id: number;
  title: string;
  author: string;
  image: string;
}

const   NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>([
    { id: 1, title: "Notice A", author: "Author A", image: "https://via.placeholder.com/100" },
    { id: 2, title: "Notice B", author: "Author B", image: "https://via.placeholder.com/100" },
  ]);
  const [modalData, setModalData] = useState<Notice | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrEditNotice = (notice: Notice) => {
    if (isEditing) {
      setNotices((prev) => prev.map((n) => (n.id === notice.id ? notice : n)));
    } else {
      setNotices((prev) => [...prev, { ...notice, id: Date.now() }]);
    }
    setModalData(null);
  };

  const handleDeleteNotice = (id: number) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  return (
    <div>
      <h2>Admin Notice Board</h2>
      <button onClick={() => setModalData({ id: 0, title: "", author: "", image: "" })}>
        Add Notice
      </button>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            {notice.title} by {notice.author}
            <button onClick={() => {
              setModalData(notice);
              setIsEditing(true);
            }}>Edit</button>
            <button onClick={() => handleDeleteNotice(notice.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {modalData && (
        <div>
          <h3>{isEditing ? "Edit Notice" : "Add Notice"}</h3>
          <input
            type="text"
            value={modalData?.title || ""}
            onChange={(e) => setModalData((prev) => prev ? { ...prev, title: e.target.value } : null)}
          />
          <input
            type="text"
            value={modalData?.author || ""}
            onChange={(e) => setModalData((prev) => prev ? { ...prev, author: e.target.value } : null)}
          />
          <input
            type="text"
            value={modalData?.image || ""}
            onChange={(e) => setModalData((prev) => prev ? { ...prev, image: e.target.value } : null)}
          />
          <button onClick={() => handleAddOrEditNotice(modalData)}>Save</button>
          <button onClick={() => setModalData(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default  NoticeBoard;
