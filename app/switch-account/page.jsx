// app/switch-account/page.jsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import ThemedButton from '@/components/ThemedButton';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/contexts/LanguageContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const SwitchAccountPage = () => {
  const { translations } = useTranslation();
  const router = useRouter();

  const handleSwitch = () => {
    // Implement switch account logic, e.g., logout and redirect to login
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{translations.switch_account}</h2>
          <ThemedButton
            label={translations.switch_account}
            onClick={handleSwitch}
            className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-3"
          />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default SwitchAccountPage;
