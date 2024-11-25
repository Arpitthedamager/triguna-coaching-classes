// app/not-found.tsx
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! The page you're looking for cannot be found.</p>
        <p className="mt-4 text-md text-gray-500">It might have been moved or deleted. Please check the URL or go back to the homepage.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
