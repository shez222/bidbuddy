'use client';

import React, { useState, Fragment } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';

// ====== Your custom animations & styles (inline for simplicity) ======
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

// Example data for demonstration
const sampleSkillsetsData = [
  {
    id: 1,
    name: 'API',
    skills: 'API, API Development, API Integration, FastAPI, GraphQL, REST API, RESTful API, Web API'
  },
  {
    id: 2,
    name: 'Automation',
    skills: 'Automation, Make.com, Zapier'
  },
  {
    id: 3,
    name: 'CMS',
    skills: 'CMS, Shopify, Shopify Development, Squarespace, Webflow, Wix'
  },
  {
    id: 4,
    name: 'Desktop & ERP',
    skills: 'Desktop Application, ERP Software'
  },
  {
    id: 5,
    name: 'Frontend',
    skills: 'Angular, Bootstrap, CSS, Frontend Development, HTML, HTML5, Next.js, PSD to HTML, React.js, React.js Framework, TailWind, Tailwind CSS, Web Design, Website Design'
  },
  {
    id: 6,
    name: 'Frontend',
    skills: 'Next.js, React.js, React.js Framework, Redux.js'
  },
  {
    id: 7,
    name: 'LAMP',
    skills: 'Core PHP, Laravel, PHP'
  },
  {
    id: 8,
    name: 'MERN',
    skills: 'Backend Development, Database Development, Express JS, Google Firebase, MongoDB, Node.js'
  },
  {
    id: 9,
    name: 'Mobile',
    skills: 'Android App Development, App Developer, App Development, Hybrid App, Mobile App Development, Progressive Web Apps, React Native, Web Application'
  },
  {
    id: 10,
    name: 'Wordpress',
    skills: 'Elementor, WordPress, WordPress Design, WordPress Plugin'
  }
];

export default function SkillsetsSettings() {
  const [skillsets, setSkillsets] = useState(sampleSkillsetsData);

  // Table & search states
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');  // 'add' or 'edit'
  const [editingSkillset, setEditingSkillset] = useState(null);

  // Form fields for modal
  const [nameField, setNameField] = useState('');
  const [skillsField, setSkillsField] = useState('');

  // ~~~~~~~~~~~~ Filtering & Pagination ~~~~~~~~~~~~~
  const filteredSkillsets = skillsets.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredSkillsets.length;
  const totalPages = Math.ceil(totalEntries / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentPageData = filteredSkillsets.slice(startIndex, endIndex);

  function handlePageChange(direction) {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }

  // ~~~~~~~~~~~~ Modal & Form Logic ~~~~~~~~~~~~~
  function openAddModal() {
    setModalMode('add');
    resetForm();
    setIsModalOpen(true);
  }

  function openEditModal(skillset) {
    setModalMode('edit');
    setEditingSkillset(skillset);
    setNameField(skillset.name);
    setSkillsField(skillset.skills);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function resetForm() {
    setNameField('');
    setSkillsField('');
    setEditingSkillset(null);
  }

  function handleModalSubmit(e) {
    e.preventDefault();
    // Basic validations:
    if (!nameField.trim()) {
      alert('Name is required.');
      return;
    }

    if (modalMode === 'add') {
      // Add new skillset
      const newId = skillsets.length ? Math.max(...skillsets.map(s => s.id)) + 1 : 1;
      const newSkillset = {
        id: newId,
        name: nameField.trim(),
        skills: skillsField.trim() || 'No skills listed'
      };
      setSkillsets([...skillsets, newSkillset]);
    } else {
      // Edit existing skillset
      const updated = skillsets.map(s => {
        if (s.id === editingSkillset.id) {
          return {
            ...s,
            name: nameField.trim(),
            skills: skillsField.trim() || 'No skills listed'
          };
        }
        return s;
      });
      setSkillsets(updated);
    }

    // Cleanup and close
    resetForm();
    setIsModalOpen(false);
  }

  // ~~~~~~~~~~~~ Render ~~~~~~~~~~~~~
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 bg-diagonal-lines animate-fadeInUp p-6 md:p-10">
      <style>{customStyles}</style>
      
      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 overflow-hidden animate-tiltRealistic">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 opacity-10 pointer-events-none" />

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              Skill Sets
            </h1>
            <button
              onClick={openAddModal}
              className="ml-auto px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm md:text-base font-semibold transition-transform transform hover:scale-105 shadow-lg"
            >
              Add Skill Set
            </button>
          </div>

          {/* Controls (show entries, search) */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="showEntries" className="text-gray-600 dark:text-gray-300 font-medium">
                Show
              </label>
              <select
                id="showEntries"
                className="block w-20 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100"
                value={showEntries}
                onChange={(e) => {
                  setShowEntries(Number(e.target.value));
                  setCurrentPage(1); // reset to page 1
                }}
              >
                {[10, 20, 30].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <span className="text-gray-600 dark:text-gray-300 font-medium">entries</span>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
              <label htmlFor="search" className="sr-only">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                className="w-56 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset to page 1
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Name
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
                {currentPageData.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600/20 transition-colors"
                  >
                    <td className="p-4 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                      {item.name}
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                      {item.skills}
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <ActionsDropdown
                        onEdit={() => openEditModal(item)}
                        onDelete={() => handleDelete(item.id)}
                        onView={() => alert(`Viewing "${item.name}" skill set.`)}
                      />
                    </td>
                  </tr>
                ))}
                {/* If no data found */}
                {currentPageData.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No skill sets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200
                  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200
                  ${(currentPage === totalPages || totalPages === 0)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog
        as="div"
        className="relative z-50"
        open={isModalOpen}
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className="relative w-full max-w-xl rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl 
              transition-all transform animate-fadeInUp"
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-500 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <Dialog.Title className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-100">
              {modalMode === 'add' ? 'Add Skill Set' : 'Edit Skill Set'}
            </Dialog.Title>
            
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                    text-gray-800 dark:text-gray-100 focus:outline-none"
                  value={nameField}
                  onChange={(e) => setNameField(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Skills
                </label>
                <textarea
                  rows={3}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                    text-gray-800 dark:text-gray-100 focus:outline-none"
                  placeholder="Comma-separated skills (e.g. Angular, React, Node.js)"
                  value={skillsField}
                  onChange={(e) => setSkillsField(e.target.value)}
                />
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold transition"
                >
                  {modalMode === 'add' ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
  
  // ~~~~~~~~~~~~ Additional Functions ~~~~~~~~~~~~~
  function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this skill set?');
    if (confirmDelete) {
      setSkillsets(skillsets.filter(s => s.id !== id));
    }
  }
}

// ~~~~~~~~~~~~ Actions Dropdown ~~~~~~~~~~~~~
function ActionsDropdown({ onEdit, onDelete, onView }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center items-center w-full px-3 py-2 bg-blue-600 text-white 
            rounded-md font-medium hover:bg-blue-500 focus:outline-none 
            focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Actions
          <ChevronDownIcon className="ml-2 h-5 w-5" />
        </Menu.Button>
      </div>

      {/* Using z-50 so dropdown appears above everything else */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="z-50 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 
            rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-100`}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-500`}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onView}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-100`}
                >
                  View
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
