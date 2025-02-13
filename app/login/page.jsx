// app/login/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemedButton from '@/components/ThemedButton';
import { useUser } from '@/contexts/UserContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Implement your authentication logic here
    // For demonstration, we'll mock a user
    const mockUser = {
      username: 'john_doe',
      image: '/user.png', // Ensure you have a user.png in public/
    };
    login(mockUser);
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          BidBuddy {translations.login}
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4 text-left">
            <label className="block text-gray-700 dark:text-gray-300">{translations.username}</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
              placeholder={translations.username}
            />
          </div>
          <div className="mb-6 text-left">
            <label className="block text-gray-700 dark:text-gray-300">{translations.password}</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
              placeholder={translations.password}
            />
          </div>
          <ThemedButton
            label={translations.login}
            type="submit"
            loading={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white"
          />
        </form>
        <div className="mt-6 text-center">
          <a href="/signup" className="text-primary hover:underline">
            {translations.dont_have_account}
          </a>
        </div>
        {/* Include the OAuth sign-up option */}
        <div className="mt-6">
          <h2 className="text-center text-gray-600 dark:text-gray-400 mb-4">
            {translations.or_connect_with}
          </h2>
          <ThemedButton
            label={translations.authorize_freelancer}
            onClick={() => window.location.href = '/api/authorize'}
            loading={loading}
            icon="/freelancer_logo.png" // Ensure this image exists in public/
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 w-full flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
}
