// app/settings/FreelancerProfiles.jsx
'use client';

import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const customStyles = `
@keyframes tiltRealistic {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(1.5deg) scale(1.01); }
  50%  { transform: rotate(-1.5deg) scale(0.99); }
  75%  { transform: rotate(1deg) scale(1); }
  100% { transform: rotate(0deg) scale(1); }
}
@keyframes fadeInUp {
  0%   {opacity: 0; transform: translate3d(0, 30px, 0);}
  100% {opacity: 1; transform: translate3d(0, 0, 0);}
}
.animate-tiltRealistic {
  animation: tiltRealistic 6s infinite ease-in-out;
}
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}
.bg-diagonal-lines {
  background-image: linear-gradient(
    135deg, rgba(255,255,255,0.15) 25%, transparent 25%
  ),
  linear-gradient(
    225deg, rgba(255,255,255,0.15) 25%, transparent 25%
  ),
  linear-gradient(
    45deg, rgba(255,255,255,0.15) 25%, transparent 25%
  ),
  linear-gradient(
    315deg, rgba(255,255,255,0.15) 25%, transparent 25%
  );
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
`;

// Main Component
export default function FreelancerProfiles() {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      title: 'CMS Developer',
      skills: 'WordPress, Shopify Development, WordPress Plugin, Wix'
    },
    {
      id: 2,
      title: 'MERN Stack Expert',
      skills: 'node.js, Next.js, React.js'
    },
    {
      id: 3,
      title: 'LAMP Stack Expert',
      skills: 'PHP, Core PHP, Laravel, WordPress, WordPress Plugin'
    }
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal open/close
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleRefreshProfiles() {
    // Refresh logic here
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  // Filter by searchTerm
  const filteredProfiles = profiles.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 
      dark:from-gray-900 dark:to-gray-800 bg-diagonal-lines animate-fadeInUp p-6 md:p-10">
      <style>{customStyles}</style>

      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl 
        shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 
        overflow-hidden animate-tiltRealistic">
        
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 
          to-red-400 opacity-10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent 
              bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              Freelancer Profiles
            </h1>
            <button
              onClick={handleRefreshProfiles}
              className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 
                text-white font-semibold transition shadow-md"
            >
              Refresh Profiles
            </button>
          </div>

          {/* Success message */}
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-md">
              <strong>Success!</strong> Profiles refreshed successfully.
            </div>
          )}

          {/* Controls row */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="showEntries" className="text-gray-600 dark:text-gray-300 font-medium">
                Show
              </label>
              {/* Hardcoded 30 for demonstration */}
              <select
                id="showEntries"
                className="block w-20 p-2 rounded-md border border-gray-300 
                  dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100"
                defaultValue={30}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <span className="text-gray-600 dark:text-gray-300 font-medium">entries</span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="search" className="sr-only">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                className="w-56 p-2 rounded-md border border-gray-300 
                  dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 
                  focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Title
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Skills
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-600/20">
                    <td className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <span className="inline-block mr-2 text-yellow-500">★</span>
                      {p.title}
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-600">
                      {p.skills}
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => setIsEditOpen(true)}
                        className="px-4 py-2 rounded-md bg-indigo-600 text-white 
                          hover:bg-indigo-500 transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {/* If none found */}
                {filteredProfiles.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No profiles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Example pagination row */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <p className="text-gray-600 dark:text-gray-300">
              Showing 1 to {filteredProfiles.length} of {filteredProfiles.length} entries
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-md border border-gray-300 
                  dark:border-gray-600 text-gray-700 dark:text-gray-200 
                  opacity-50 cursor-not-allowed"
              >
                Previous
              </button>
              <button
                className="px-3 py-1 rounded-md border border-gray-300 
                  dark:border-gray-600 text-gray-700 dark:text-gray-200 
                  opacity-50 cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The "Edit Freelancer Profile" popup */}
      <EditFreelancerProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
}

/* 
  This component reuses your EditFreelancerProfile.jsx code as a 
  *modal* (using Headless UI Dialog).
*/
function EditFreelancerProfileModal({ isOpen, onClose }) {
  // Example states
  const [profileTitle, setProfileTitle] = useState('CMS Developer');
  const [hourlyRate, setHourlyRate] = useState(30);

  // Example skill sets
  const skillSets = [
    'API', 'Automation', 'CMS', 'Desktop & ERP', 'Frontend', 'Frontend',
    'LAMP', 'MERN', 'Mobile', 'Wordpress'
  ];

  // “Applicable Skills”
  const allSkills = [
    'Blog Design', 'CMS', 'Core PHP', 'CSS', 'Elementor', 'HTML', 'Landing Pages',
    'Laravel', 'Mobile App Development', 'MySQL', 'PSD to HTML', 'React.js',
    'Shopify', 'Shopify Development', 'Shopify Templates', 'Squarespace',
    'Website Design', 'Wix', 'WordPress', 'WordPress Design', 'WordPress Multilingual',
    'WordPress Plugin', 'Next.js', 'Node.js', 'PHP'
  ];
  const [selectedSkills, setSelectedSkills] = useState([
    'Shopify Development', 'WordPress Plugin', 'Wix', 'WordPress'
  ]);

  function toggleSkill(skill) {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  }

  function checkAll() {
    setSelectedSkills(allSkills);
  }

  function uncheckAll() {
    setSelectedSkills([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Submit logic
    alert(`Profile updated: ${profileTitle}, Skills: ${selectedSkills.join(', ')}`);
    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0" 
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100" 
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        {/* Dialog panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95" 
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100" 
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="relative w-full max-w-4xl bg-white dark:bg-gray-800/80 
                  rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 
                  p-6 md:p-8 overflow-y-auto"
              >
                <Dialog.Title as="h2" className="sr-only">
                  Edit Freelancer Profile
                </Dialog.Title>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 
                    hover:text-red-500 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="mb-4">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-transparent 
                    bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                    Edit Freelancer Profile
                  </h1>
                </div>

                {/* Notice */}
                <div className="bg-yellow-100 border border-yellow-200 rounded-md p-4 mb-6">
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      Bid on project containing any of the selected skills 
                      will be linked to this profile.
                    </li>
                    <li>
                      If a skill is in more than one profile, Bidman will select 
                      by alphabetical order. To prevent this, don&apos;t assign 
                      the same skill to multiple profiles.
                    </li>
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Profile Title */}
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
                      Profile Title
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">★</span>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md border border-gray-300 
                          dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        value={profileTitle}
                        onChange={(e) => setProfileTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
                      Hourly Rate
                    </label>
                    <input
                      type="number"
                      className="w-40 p-2 rounded-md border border-gray-300 
                        dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                    />
                  </div>

                  {/* Skill Sets */}
                  <div>
                    <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                      Skill Sets
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {skillSets.map((set) => (
                        <span
                          key={set}
                          className="inline-block px-3 py-1 rounded-full bg-blue-600 
                            text-white text-sm shadow cursor-default"
                        >
                          {set}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Applicable Skills */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        Applicable Skills
                      </h2>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={checkAll}
                          className="px-3 py-1 rounded-md bg-green-500 text-white 
                            hover:bg-green-400 text-sm"
                        >
                          Check All
                        </button>
                        <button
                          type="button"
                          onClick={uncheckAll}
                          className="px-3 py-1 rounded-md bg-red-500 text-white 
                            hover:bg-red-400 text-sm"
                        >
                          Uncheck All
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {allSkills.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1 rounded-md border text-sm 
                              ${isSelected 
                                ? 'bg-green-600 text-white border-green-700' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300'
                              }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-500 
                        text-white font-semibold transition-all shadow-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
