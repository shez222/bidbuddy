// components/ThemedButton.jsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/contexts/LanguageContext';

const ThemedButton = ({ label, onClick, loading, icon, type = 'button', className }) => {
  const { theme } = useTheme();
  const { translations } = useTranslation();

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold ${className} ${
        theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
      }`}
      disabled={loading}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {icon && <img src={icon} alt="icon" className="h-5 w-5 mr-2" />}
      {label}
    </button>
  );
};

export default ThemedButton;
