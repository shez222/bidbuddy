// components/RealisticButton.jsx
'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/contexts/LanguageContext';

const RealisticButton = ({
  label,
  onClick,
  loading,
  icon,
  type = 'button',
  className,
  size = 'md', // Added size prop for flexibility
}) => {
  const { theme } = useTheme();
  const { translations } = useTranslation();

  const baseClasses = `
    relative
    flex items-center justify-center
    rounded-full
    font-semibold
    cursor-pointer
    shadow-md
    transition-transform duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Size variants
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-36 h-36 text-lg',
  };

  const themeClasses =
    theme === 'dark'
      ? `
          bg-gradient-to-br from-gray-700 to-gray-900
          hover:from-gray-600 hover:to-gray-800
          focus:ring-gray-500
        `
      : `
          bg-gradient-to-br from-blue-500 to-blue-700
          hover:from-blue-600 hover:to-blue-800
          focus:ring-blue-500
        `;

  const loadingSpinner = (
    <svg
      className="animate-spin h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  );

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${themeClasses} ${className}`}
      disabled={loading}
      aria-label={label}
      whileHover={!loading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!loading ? { scale: 0.95, y: 0 } : {}}
      initial={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' }}
      animate={{
        boxShadow: loading
          ? '0px 5px 15px rgba(0,0,0,0.5)'
          : '0px 5px 15px rgba(0,0,0,0.3)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Loading Spinner */}
      {loading && loadingSpinner}

      {/* Icon */}
      {icon && !loading && (
        typeof icon === 'string' ? (
          <img src={icon} alt={`${label} icon`} className="h-6 w-6" />
        ) : (
          <span className="h-6 w-6">{icon}</span>
        )
      )}

      {/* Label */}
      {!loading && (
        <span className={`absolute ${size === 'lg' ? 'text-lg' : 'text-base'}`}>
          {label}
        </span>
      )}
    </motion.button>
  );
};

RealisticButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.string, // URL or path to the icon image
    PropTypes.element, // React element (e.g., icon component)
  ]),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

RealisticButton.defaultProps = {
  loading: false,
  icon: null,
  type: 'button',
  className: '',
  size: 'md',
};

export default RealisticButton;
