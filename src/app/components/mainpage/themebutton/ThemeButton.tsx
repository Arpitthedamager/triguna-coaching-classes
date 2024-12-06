"use client";
import { useEffect, useState } from "react";
// import { signOut } from "next-auth/react";

const ThemeButton: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'night' | 'mytheme' | null>(null); // Initial state as null

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as 'light' | 'night' | 'mytheme') || "light";
    document.documentElement.setAttribute("data-theme", savedTheme); // Set the theme based on saved preference
    setTheme(savedTheme);

    // Remove the invisible class from body once the theme is set
    document.documentElement.classList.remove("invisible");
  }, []);

  const toggleTheme = () => {
    // Toggle between light, night, and mytheme
    const newTheme = theme === "light" ? "night" : theme === "night" ? "mytheme" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Apply the theme to the root element
    localStorage.setItem("theme", newTheme); // Store the theme in localStorage
  };

  // If theme is null, don't render the button yet (to avoid flicker)
  if (theme === null) {
    return null;
  }

  return (
    <>
    <button onClick={toggleTheme} className="btn btn-primary mt-4">
      Toggle Theme
    </button>
     {/* <button
     onClick={() => signOut({ callbackUrl: "/" })}
     className="btn btn-primary text-white py-2 px-4 rounded-lg"
     >
     Sign Out
   </button> */}
     </>
  );
};

export default ThemeButton;
