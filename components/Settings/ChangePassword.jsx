// app/settings/ChangePassword.jsx
'use client';

import React, { useState } from 'react';

const customStyles = `
@keyframes tiltRealistic {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(1.5deg) scale(1.01); }
  50%  { transform: rotate(-1.5deg) scale(0.99); }
  75%  { transform: rotate(1deg) scale(1); }
  100% { transform: rotate(0deg) scale(1); }
}
@keyframes fadeInUp {
  0% {opacity: 0; transform: translate3d(0, 30px, 0);}
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

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!oldPass || !newPass || !confirmPass) {
      alert('All fields are required.');
      return;
    }
    if (newPass !== confirmPass) {
      alert('New password and confirm password do not match.');
      return;
    }
    // TODO: handle password change logic
    alert('Password changed successfully!');
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 
      dark:from-gray-900 dark:to-gray-800 bg-diagonal-lines animate-fadeInUp p-6 md:p-10">
      <style>{customStyles}</style>

      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800/80 backdrop-blur-md 
        rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 
        overflow-hidden animate-tiltRealistic">
        
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 
          to-red-400 opacity-10 pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-transparent 
            bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
            Change Password
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                Old Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-md border border-gray-300 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-md border border-gray-300 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-md border border-gray-300 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
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
        </div>
      </div>
    </div>
  );
}
