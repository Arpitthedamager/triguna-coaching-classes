"use client";
import { useSession } from 'next-auth/react';

const UserProfile = () => {
  const { data: session } = useSession();
  if (!session) return <p>Loading...</p>;

  return (
    <div className="bg-primary-content p-6 rounded shadow">
      <h2 className="text-2xl">Profile</h2>
      <p><strong>Name:</strong> {session.user?.name}</p>
      <p><strong>Email:</strong> {session.user?.email}</p>
    </div>
  );
};

export default UserProfile;
