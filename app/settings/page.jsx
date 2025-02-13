// app/settings/page.jsx
'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import SkillsSettings from '@/components/Settings/SkillsSettings';
import SkillsetsSettings from '@/components/Settings/SkillsetsSettings';
import AIBiddingSettings from '@/components/Settings/AIBiddingSettings';
import ChangePassword from '@/components/Settings/ChangePassword';
import FreelancerProfiles from '@/components/Settings/FreelancerProfiles';
import AIBidLog from '@/components/Settings/AIBidLog';
import { useTranslation } from '@/contexts/LanguageContext';

// -------------- Inline Styles & Animations ---------------
const customStyles = `
@keyframes tiltRealistic {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(1.5deg) scale(1.01); }
  50%  { transform: rotate(-1.5deg) scale(0.99); }
  75%  { transform: rotate(1deg) scale(1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.animate-tiltRealistic {
  animation: tiltRealistic 6s infinite ease-in-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.bg-diagonal-lines {
  background-image: linear-gradient(
    135deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  ),
  linear-gradient(
    225deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  ),
  linear-gradient(
    45deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  ),
  linear-gradient(
    315deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%
  );
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.hover-glow:hover {
  box-shadow: 0 0 10px rgba(255,255,255,0.15), 0 0 20px rgba(255,0,255,0.1);
  transform: scale(1.05);
  border-color: rgba(255,255,255,0.3) !important;
}
`;

// -------------- Sidebar Component ---------------
const Sidebar = ({ tabs, activeTab, onTabClick }) => {
  const { translations } = useTranslation();

  return (
    <aside
      className="
        w-full md:w-1/4 lg:w-1/4 flex-shrink-0
        h-[calc(100vh-80px)] overflow-y-auto
        bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 relative z-10
        before:content-[''] before:absolute before:inset-0 before:rounded-2xl 
        before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 
        before:opacity-10 before:pointer-events-none
        animate-tiltRealistic
      "
    >
      <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
        {translations.settings}
      </h2>
      <ul className="space-y-3">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => {
              console.log('Switching to tab:', tab.id);
              onTabClick(tab.id);
            }}
            className={`cursor-pointer py-2 px-4 rounded-xl transition-all duration-200 ease-in-out hover-glow
              ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg transform scale-105'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3">
        {/* Additional sidebar elements like LanguageSwitcher or ThemedButton can be placed here */}
      </div>
    </aside>
  );
};

// -------------- Placeholder Components ---------------
// const SkillsetsSettings = () => {
//   const { translations } = useTranslation();
//   return (
//     <div className="animate-fadeInUp">
//       <p className="text-gray-700 dark:text-gray-300">
//         {translations.manage_your_skillsets_here}
//       </p>
//       {/* Implement skillsets management UI */}
//     </div>
//   );
// };

// const AIBiddingSettings = () => {
//   const { translations } = useTranslation();
//   return (
//     <div className="animate-fadeInUp">
//       <p className="text-gray-700 dark:text-gray-300">
//         {translations.configure_ai_bidding_settings_here}
//       </p>
//       {/* Implement AI bidding settings UI */}
//     </div>
//   );
// };

const ManageTemplates = () => {
  const { translations } = useTranslation();
  return (
    <div className="animate-fadeInUp">
      <p className="text-gray-700 dark:text-gray-300">
        {translations.manage_your_templates_here}
      </p>
      {/* Implement template management UI */}
    </div>
  );
};

const ProjectFilters = () => {
  const { translations } = useTranslation();
  return (
    <div className="animate-fadeInUp">
      <p className="text-gray-700 dark:text-gray-300">
        {translations.set_your_project_filters_here}
      </p>
      {/* Implement project filters UI */}
    </div>
  );
};

const BidSettings = () => {
  const { translations } = useTranslation();
  return (
    <div className="animate-fadeInUp">
      <p className="text-gray-700 dark:text-gray-300">
        {translations.configure_your_bid_settings_here}
      </p>
      {/* Implement bid settings UI */}
    </div>
  );
};

// const FreelancerProfiles = () => {
//   const { translations } = useTranslation();
//   return (
//     <div className="animate-fadeInUp">
//       <p className="text-gray-700 dark:text-gray-300">
//         {translations.manage_freelancer_profiles_here}
//       </p>
//       {/* Implement freelancer profiles management UI */}
//     </div>
//   );
// };

// const AIBidLog = () => {
//   const { translations } = useTranslation();
//   return (
//     <div className="animate-fadeInUp">
//       <p className="text-gray-700 dark:text-gray-300">
//         {translations.view_ai_bid_logs_here}
//       </p>
//       {/* Implement AI bid log UI */}
//     </div>
//   );
// };

// const ChangePassword = () => {
//   const { translations } = useTranslation();
//   return (
//     <div className="animate-fadeInUp">
//       <p className="text-gray-700 dark:text-gray-300">
//         {translations.change_your_password_here}
//       </p>
//       {/* Implement change password UI */}
//     </div>
//   );
// };

// ------------- SettingsPage Component -------------
const SettingsPage = () => {
  const { translations } = useTranslation();
  const [activeTab, setActiveTab] = useState('skills');

  const tabs = [
    { id: 'skills', label: translations.skills },
    { id: 'skillsets', label: translations.skillsets },
    { id: 'ai_bidding_settings', label: translations.ai_bidding_settings },
    { id: 'manage_templates', label: translations.manage_templates },
    { id: 'project_filters', label: translations.project_filters },
    { id: 'bid_settings', label: translations.bid_settings },
    { id: 'freelancer_profiles', label: translations.freelancer_profiles },
    { id: 'ai_bid_log', label: translations.ai_bid_log },
    { id: 'change_password', label: translations.change_password },
  ];

  return (
    <ProtectedRoute>
      {/* Inject our custom style block */}
      <style>{customStyles}</style>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 bg-diagonal-lines bg-opacity-10">
        <Header />
        <main className="container mx-auto p-4 flex flex-col md:flex-row gap-6 animate-fadeInUp">
          <Sidebar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
          <section
            className="
              w-full md:w-3/4 lg:w-3/4 
              bg-white dark:bg-gray-800 
              rounded-lg shadow p-6 
              border border-gray-200 dark:border-gray-700 
              relative overflow-hidden
            "
          >
            {/* Subtle gradient overlay for the section */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/5 via-white/0 to-white/5 dark:from-black/5 dark:to-black/5" />
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-4 text-center  text-gray-800 dark:text-gray-200">
                {translations[activeTab]}
              </h2>
              {activeTab === 'skills' && <SkillsSettings />}
              {activeTab === 'skillsets' && <SkillsetsSettings />}
              {activeTab === 'ai_bidding_settings' && <AIBiddingSettings />}
              {activeTab === 'manage_templates' && <ManageTemplates />}
              {activeTab === 'project_filters' && <ProjectFilters />}
              {activeTab === 'bid_settings' && <BidSettings />}
              {activeTab === 'freelancer_profiles' && <FreelancerProfiles />}
              {activeTab === 'ai_bid_log' && <AIBidLog />}
              {activeTab === 'change_password' && <ChangePassword />}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsPage;
