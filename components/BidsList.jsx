// components/BidsList.jsx
'use client';

import React, { useState, useMemo } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { format, parseISO, isWithinInterval } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Utility function for sorting
const sortData = (data, sortConfig) => {
  if (!sortConfig.key) return data;

  return [...data].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // If sorting by date, convert to Date objects
    if (sortConfig.key === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // If sorting by amount, convert to numbers
    if (sortConfig.key === 'amount') {
      aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
      bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};

const BidsList = () => {
  const { translations } = useTranslation();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProject, setFilterProject] = useState('');
  const [filterAmountMin, setFilterAmountMin] = useState('');
  const [filterAmountMax, setFilterAmountMax] = useState('');
  const [filterDateStart, setFilterDateStart] = useState(null);
  const [filterDateEnd, setFilterDateEnd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bidsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  // Expanded Mock Data
  const bids = [
    { id: 1, project: 'Project Alpha', date: '2025-01-05', amount: '$500', status: 'active' },
    { id: 2, project: 'Project Beta', date: '2025-01-06', amount: '$750', status: 'completed' },
    { id: 3, project: 'Project Gamma', date: '2025-01-07', amount: '$600', status: 'active' },
    { id: 4, project: 'Project Delta', date: '2025-01-08', amount: '$900', status: 'completed' },
    { id: 5, project: 'Project Epsilon', date: '2025-01-09', amount: '$450', status: 'active' },
    { id: 6, project: 'Project Zeta', date: '2025-01-10', amount: '$800', status: 'completed' },
    { id: 7, project: 'Project Eta', date: '2025-01-11', amount: '$700', status: 'active' },
    { id: 8, project: 'Project Theta', date: '2025-01-12', amount: '$650', status: 'completed' },
    { id: 9, project: 'Project Iota', date: '2025-01-13', amount: '$550', status: 'active' },
    { id: 10, project: 'Project Kappa', date: '2025-01-14', amount: '$950', status: 'completed' },
    // Add more bids as needed
  ];

  // Handle Sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort Bids
  const filteredAndSortedBids = useMemo(() => {
    let filtered = bids;

    // Filter by Status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((bid) => bid.status === filterStatus);
    }

    // Filter by Project Name
    if (filterProject.trim() !== '') {
      filtered = filtered.filter((bid) =>
        bid.project.toLowerCase().includes(filterProject.toLowerCase())
      );
    }

    // Filter by Amount Range
    if (filterAmountMin !== '' || filterAmountMax !== '') {
      filtered = filtered.filter((bid) => {
        const amount = parseFloat(bid.amount.replace(/[^0-9.-]+/g, ''));
        const min = filterAmountMin !== '' ? parseFloat(filterAmountMin) : Number.MIN_VALUE;
        const max = filterAmountMax !== '' ? parseFloat(filterAmountMax) : Number.MAX_VALUE;
        return amount >= min && amount <= max;
      });
    }

    // Filter by Date Range
    if (filterDateStart && filterDateEnd) {
      filtered = filtered.filter((bid) => {
        const bidDate = parseISO(bid.date);
        return isWithinInterval(bidDate, { start: filterDateStart, end: filterDateEnd });
      });
    }

    // Sort Data
    return sortData(filtered, sortConfig);
  }, [
    bids,
    filterStatus,
    filterProject,
    filterAmountMin,
    filterAmountMax,
    filterDateStart,
    filterDateEnd,
    sortConfig,
  ]);

  // Pagination Logic
  const indexOfLastBid = currentPage * bidsPerPage;
  const indexOfFirstBid = indexOfLastBid - bidsPerPage;
  const currentBids = filteredAndSortedBids.slice(indexOfFirstBid, indexOfLastBid);
  const totalPages = Math.ceil(filteredAndSortedBids.length / bidsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset Filters
  const resetFilters = () => {
    setFilterStatus('all');
    setFilterProject('');
    setFilterAmountMin('');
    setFilterAmountMax('');
    setFilterDateStart(null);
    setFilterDateEnd(null);
    setSortConfig({ key: '', direction: 'ascending' });
    setCurrentPage(1);
  };

  // Get Sort Icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="ml-1" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <FaSortUp className="ml-1" />;
    }
    return <FaSortDown className="ml-1" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {/* Status Filter */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              {translations.status || 'Status'}
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
            >
              <option value="all">{translations.all || 'All'}</option>
              <option value="active">{translations.active || 'Active'}</option>
              <option value="completed">{translations.completed || 'Completed'}</option>
            </select>
          </div>

          {/* Project Name Search */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              {translations.project || 'Project'}
            </label>
            <input
              type="text"
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              placeholder={translations.search_project || 'Search Project'}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
            />
          </div>

          {/* Amount Range Filter */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                {translations.amount_min || 'Amount Min'}
              </label>
              <input
                type="number"
                value={filterAmountMin}
                onChange={(e) => setFilterAmountMin(e.target.value)}
                placeholder="$0"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                {translations.amount_max || 'Amount Max'}
              </label>
              <input
                type="number"
                value={filterAmountMax}
                onChange={(e) => setFilterAmountMax(e.target.value)}
                placeholder="$1000"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="mt-4 md:mt-0">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">
            {translations.date_range || 'Date Range'}
          </label>
          <div className="flex space-x-2">
            <DatePicker
              selected={filterDateStart}
              onChange={(date) => setFilterDateStart(date)}
              selectsStart
              startDate={filterDateStart}
              endDate={filterDateEnd}
              placeholderText={translations.start_date || 'Start Date'}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
            />
            <DatePicker
              selected={filterDateEnd}
              onChange={(date) => setFilterDateEnd(date)}
              selectsEnd
              startDate={filterDateStart}
              endDate={filterDateEnd}
              minDate={filterDateStart}
              placeholderText={translations.end_date || 'End Date'}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          {translations.reset_filters || 'Reset Filters'}
        </button>
      </div>

      {/* Bids List */}
      <div className="grid grid-cols-1 gap-6">
        {currentBids.length > 0 ? (
          currentBids.map((bid) => (
            <motion.div
              key={bid.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:justify-between hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              {/* Bid Details */}
              <div className="flex flex-col md:flex-row items-center md:items-start">
                {/* Project Icon */}
                <div className="flex-shrink-0">
                  <img
                    src="/icons/robot.svg" // Replace with relevant icon
                    alt="Project Icon"
                    className="h-12 w-12 mr-4"
                  />
                </div>
                {/* Project Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {bid.project}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {format(parseISO(bid.date), 'PPP')}
                  </p>
                </div>
              </div>

              {/* Bid Status and Amount */}
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bid.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-200'
                      : bid.status === 'completed'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  {translations[bid.status] || bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </span>
                {/* Amount */}
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {bid.amount}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-700 dark:text-gray-200">
            {translations.no_bids_found || 'No bids found.'}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                currentPage === index + 1
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Define PropTypes for better type checking
BidsList.propTypes = {
  // If you plan to pass bids as props in the future
  // bidsData: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     project: PropTypes.string.isRequired,
  //     date: PropTypes.string.isRequired, // ISO date string
  //     amount: PropTypes.string.isRequired, // e.g., "$500"
  //     status: PropTypes.oneOf(['active', 'completed']).isRequired,
  //   })
  // ),
};

// Define default props in case props are missing
BidsList.defaultProps = {
  // bidsData: [],
};

export default BidsList;









