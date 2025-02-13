// components/Header.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import {
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  BriefcaseIcon,
  PhoneIcon
} from '@heroicons/react/24/solid';

import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/contexts/LanguageContext';

const Header = () => {
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { translations } = useTranslation();

  // If there's no user, don't render the header
  if (!user) return null;

  return (
    <header
      className="
        bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
        dark:from-gray-800 dark:via-gray-900 dark:to-black
        shadow-md
        text-white
      "
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link href="/dashboard">
          <div className="flex items-center space-x-2 cursor-pointer group">
            <h1
              className="
                text-xl font-bold 
                tracking-wider
                transition-transform 
                group-hover:scale-105
              "
            >
              BidBuddy
            </h1>
          </div>
        </Link>

        {/* Center Nav (visible on md+ screens) */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="flex items-center space-x-1 transition-transform hover:scale-105"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center space-x-1 transition-transform hover:scale-105"
          >
            <BriefcaseIcon className="w-4 h-4" />
            <span>Projects</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center space-x-1 transition-transform hover:scale-105"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>Contact</span>
          </Link>
        </nav>

        {/* Right Side: Theme Toggle + User Menu */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              focus:outline-none
              p-2 rounded-full
              hover:bg-white/10
              transition-colors
            "
            title="Toggle Theme"
          >
            {theme === 'light' ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
          </button>

          {/* User Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button
              className="
                flex items-center space-x-2
                focus:outline-none 
                hover:bg-white/10 
                px-3 py-2 
                rounded-full
                transition-colors
              "
            >
              <img
                src={ '/user.jpeg'}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:inline font-semibold">
                {user.username}
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Menu.Items
              className="
                absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700
                border border-gray-200 dark:border-gray-600
                rounded-md shadow-lg z-20
                focus:outline-none
              "
            >
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/switch-account"
                    className={`
                      block px-4 py-2 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-600
                      ${active ? 'bg-gray-100 dark:bg-gray-600' : ''}
                    `}
                  >
                    {translations.switch_account}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {/* Implement toggle auto-bidding */}}
                    className={`
                      w-full text-left px-4 py-2 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-600
                      ${active ? 'bg-gray-100 dark:bg-gray-600' : ''}
                    `}
                  >
                    {translations.toggle_auto_bidding}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/settings"
                    className={`
                      block px-4 py-2 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-600
                      ${active ? 'bg-gray-100 dark:bg-gray-600' : ''}
                    `}
                  >
                    {translations.more_settings}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/guide"
                    className={`
                      block px-4 py-2 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-600
                      ${active ? 'bg-gray-100 dark:bg-gray-600' : ''}
                    `}
                  >
                    {translations.guide}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`
                      w-full text-left px-4 py-2 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-600
                      ${active ? 'bg-gray-100 dark:bg-gray-600' : ''}
                    `}
                  >
                    {translations.logout}
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
