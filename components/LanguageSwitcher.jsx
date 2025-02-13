// components/LanguageSwitcher.jsx
'use client';

import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    // Add more languages as needed
  ];

  return (
    <div className="absolute top-4 right-16 flex space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-2 py-1 rounded ${
            lang.code === language ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
