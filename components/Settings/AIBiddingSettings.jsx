// app/settings/AIBiddingSettings.jsx
'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

/* Shared or inline styles for animations, diagonal lines, and custom scrollbars */
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

/* Custom Scrollbar Styles */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 4px;
}
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #a0aec0 transparent;
}
`;

export default function AIBiddingSettings() {
  const [isManageCountriesOpen, setIsManageCountriesOpen] = useState(false);

  // Example form state
  const [paymentVerified, setPaymentVerified] = useState('Does not matter');
  const [emailVerified, setEmailVerified] = useState('Does not matter');
  const [depositMade, setDepositMade] = useState('Does not matter');
  const [minRating, setMinRating] = useState('Does not matter');
  const [minProjects, setMinProjects] = useState(0);
  const [minFixedBudget, setMinFixedBudget] = useState('1500');
  const [minHourlyBudget, setMinHourlyBudget] = useState('100');

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Add your form submission logic here
    alert('AI Bids Settings saved!');
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200
      dark:from-gray-900 dark:to-gray-800 bg-diagonal-lines animate-fadeInUp p-6 md:p-10">
      <style>{customStyles}</style>

      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl
        shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700
        overflow-hidden animate-tiltRealistic">

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500
          to-red-400 opacity-10 pointer-events-none" />

        {/* Card content */}
        <div className="relative z-10">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent 
            bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
            AI Bids Settings
          </h1>

          {/* Notice block */}
          <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
            <strong>Notice!</strong> These filters are exclusively used for AI bids.
            If a project does not meet the AI bids requirements, Bidman will place a non-AI bid.
          </div>

          {/* The form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-8">
            {/* Client Filters */}
            <div>
              <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                Client Filters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Payment verified</label>
                  <select
                    className="w-full p-2 rounded-md border border-gray-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    value={paymentVerified}
                    onChange={(e) => setPaymentVerified(e.target.value)}
                  >
                    <option>Does not matter</option>
                    <option>Required</option>
                    <option>Not required</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Email verified</label>
                  <select
                    className="w-full p-2 rounded-md border border-gray-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    value={emailVerified}
                    onChange={(e) => setEmailVerified(e.target.value)}
                  >
                    <option>Does not matter</option>
                    <option>Required</option>
                    <option>Not required</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Deposit made</label>
                  <select
                    className="w-full p-2 rounded-md border border-gray-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    value={depositMade}
                    onChange={(e) => setDepositMade(e.target.value)}
                  >
                    <option>Does not matter</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Minimum rating</label>
                  <select
                    className="w-full p-2 rounded-md border border-gray-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  >
                    <option>Does not matter</option>
                    <option>3+</option>
                    <option>4+</option>
                    <option>5 only</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Minimum projects</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    value={minProjects}
                    onChange={(e) => setMinProjects(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Project Budget */}
            <div>
              <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                Project Budget
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Min fixed budget (in USD)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    value={minFixedBudget}
                    onChange={(e) => setMinFixedBudget(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Min hourly budget (in USD)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    value={minHourlyBudget}
                    onChange={(e) => setMinHourlyBudget(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Countries */}
            <div>
              <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                Countries
              </h2>
              <button
                type="button"
                onClick={() => setIsManageCountriesOpen(true)}
                className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 
                  dark:bg-gray-600 dark:hover:bg-gray-500 transition"
              >
                Manage countries for AI bids
              </button>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white
                  font-semibold transition-all shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Manage Countries Modal */}
      <ManageCountries
        isOpen={isManageCountriesOpen}
        onClose={() => setIsManageCountriesOpen(false)}
      />
    </div>
  );
}

/* ========== ManageCountries component (the modal) ========== */
function ManageCountries({ isOpen, onClose }) {
  // Expanded country list for testing with many entries
  const [countries, setCountries] = useState([
    { name: 'Afghanistan', active: true },
    { name: 'Albania', active: true },
    { name: 'Algeria', active: true },
    { name: 'American Samoa', active: true },
    { name: 'Andorra', active: true },
    { name: 'Angola', active: true },
    { name: 'Antigua and Barbuda', active: true },
    { name: 'Argentina', active: true },
    { name: 'Armenia', active: true },
    { name: 'Australia', active: true },
    { name: 'Austria', active: true },
    { name: 'Azerbaijan', active: true },
    { name: 'Bahamas', active: true },
    { name: 'Bahrain', active: true },
    { name: 'Bangladesh', active: true },
    { name: 'Barbados', active: true },
    { name: 'Belarus', active: true },
    { name: 'Belgium', active: true },
    { name: 'Belize', active: true },
    { name: 'Benin', active: true },
    { name: 'Bhutan', active: true },
    { name: 'Bolivia', active: true },
    { name: 'Bosnia and Herzegovina', active: true },
    { name: 'Botswana', active: true },
    { name: 'Brazil', active: true },
    { name: 'Brunei', active: true },
    { name: 'Bulgaria', active: true },
    { name: 'Burkina Faso', active: true },
    { name: 'Burundi', active: true },
  ]);

  function toggleCountry(index, newVal) {
    setCountries((prev) => {
      const updated = [...prev];
      updated[index].active = newVal;
      return updated;
    });
  }

  function handleSubmit() {
    // TODO: handle saving countries
    alert('Countries saved!');
    onClose();
  }

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      {/* Modal Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto custom-scroll bg-white dark:bg-gray-800/80 
            backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 animate-fadeInUp"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 
            to-red-400 opacity-10 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300
              hover:text-red-500 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <Dialog.Title className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-100">
            Manage AI Countries
          </Dialog.Title>

          {/* Countries grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((c, idx) => (
              <div
                key={c.name}
                className="flex items-center justify-between gap-2 p-3 
                  bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 
                  shadow-sm transition-transform hover:scale-[1.02]"
              >
                <span className="text-gray-700 dark:text-gray-100 text-sm font-medium truncate">
                  {c.name}
                </span>
                <FancyToggleSwitch
                  checked={c.active}
                  onChange={(newVal) => toggleCountry(idx, newVal)}
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-md bg-gray-500 hover:bg-gray-400 text-white 
                font-semibold transition"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white 
                font-semibold transition"
            >
              Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

/* 
  Updated FancyToggleSwitch using a hidden checkbox approach.
  This ensures reliable toggling on click.
*/
function FancyToggleSwitch({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors duration-200 ${
          checked ? 'bg-green-500' : 'bg-red-500'
        }`}
      ></div>
      <div
        className={`absolute left-0 top-0 w-5 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${
          checked ? 'translate-x-6' : '-translate-x-1'
        }`}
      ></div>
    </label>
  );
}
