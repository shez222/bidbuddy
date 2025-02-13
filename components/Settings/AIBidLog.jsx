// app/settings/AIBidLog.jsx
'use client';

import React, { useState } from 'react';

// === Your custom animations & theme classes ===
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
`;

export default function AIBidLog() {
  // Months to display
  const months = ['Dec 2024', 'Jan 2025', 'Feb 2025'];
  const [activeMonth, setActiveMonth] = useState('Jan 2025');

  // Example data for the table
  const exampleLogs = [
    { date: 'Wednesday, 1st January', bids: 28 },
    { date: 'Thursday, 2nd January', bids: 48 },
    { date: 'Friday, 3rd January', bids: 54 },
    { date: 'Saturday, 4th January', bids: 26 },
    { date: 'Sunday, 5th January', bids: 11 },
    { date: 'Monday, 6th January', bids: 4 },
    { date: 'Tuesday, 7th January', bids: 48 },
    { date: 'Wednesday, 8th January', bids: 59 },
    { date: 'Thursday, 9th January', bids: 60 },
    { date: 'Friday, 10th January', bids: 44 },
    { date: 'Saturday, 11th January', bids: 39 },
    { date: 'Sunday, 12th January', bids: 13 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200
      dark:from-gray-900 dark:to-gray-800 bg-diagonal-lines animate-fadeInUp p-6 md:p-10">
      {/* Inject the custom CSS */}
      <style>{customStyles}</style>

      {/* Main card container */}
      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-md
        rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700
        overflow-hidden animate-tiltRealistic">

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500
          to-red-400 opacity-10 pointer-events-none" />

        {/* Card content */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Heading row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent
              bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              AI Monthly Log
            </h1>

            {/* Month tabs */}
            <div className="flex flex-wrap gap-2">
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMonth(m)}
                  className={`px-4 py-2 rounded-md font-semibold transition 
                    ${activeMonth === m
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Total Bids */}
            <div className="text-gray-700 dark:text-gray-100 font-bold text-lg md:text-xl">
              TOTAL BIDS: <span className="ml-1 text-2xl">434</span>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Date
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Bids
                  </th>
                </tr>
              </thead>
              <tbody>
                {exampleLogs.map((log, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 dark:border-gray-600
                      hover:bg-gray-50 dark:hover:bg-gray-600/20 transition-colors"
                  >
                    <td className="p-4 text-blue-600 dark:text-blue-400 underline">
                      {log.date}
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-100">
                      {log.bids}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
