import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('color-theme');
    if (
      storedTheme === 'dark' ||
      (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDarkMode = !darkMode;
    setDarkMode(isDarkMode);
    localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center justify-between px-4 py-2 gap-x-4 rounded-full transition-colors duration-500 border-1 ${
        darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-200 text-black border-gray-400'
      }`}
    >
      <span className="text-sm font-medium">{darkMode ? 'Dark' : 'Light'}</span>
      <div
        className={`h-6 w-6 rounded-full shadow-md bg-white flex items-center justify-center transform transition-transform duration-500 ${
          darkMode ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
          {darkMode ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12l-4 4m0 0l-4-4m4 4V3" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 16v2m-6.364-9.364l1.414 1.414m12.728 0l-1.414 1.414M4 12h2m12 0h2m-6-6.364l1.414 1.414m0 12.728l-1.414-1.414M12 4a8 8 0 100 16 8 8 0 000-16z" />
          )}
        </svg>
      </div>
    </button>
  );
};

export default DarkModeToggle;