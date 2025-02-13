// app/guide/page.jsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import { useTranslation } from '@/contexts/LanguageContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const GuidePage = () => {
  const { translations } = useTranslation();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{translations.guide}</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <p className="text-gray-700 dark:text-gray-300">
              {/* Replace with actual guide content */}
              Welcome to BidBuddy! Here's how you can use the platform effectively:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
              <li>Connect your Freelancer account to start auto-bidding.</li>
              <li>Manage your skills and preferences in the settings.</li>
              <li>Monitor your bids and analytics on the dashboard.</li>
              <li>Customize your auto-bidding strategies for optimal results.</li>
              {/* Add more guide points as needed */}
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default GuidePage;
