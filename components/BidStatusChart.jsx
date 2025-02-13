// components/BidStatusChart.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const BidStatusChart = ({ data }) => {
  const { translations } = useTranslation();
  const { theme } = useTheme();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && typeof data === 'object') {
      const { failed, passed } = data;

      // Validate that failed and passed are numbers
      if (typeof failed !== 'number' || typeof passed !== 'number') {
        console.error('Failed and Passed bids must be numbers.');
        setChartData(null);
        return;
      }

      setChartData({
        labels: [translations.failed_bids || 'Failed Bids', translations.passed_bids || 'Passed Bids'],
        datasets: [
          {
            data: [failed, passed],
            backgroundColor: theme === 'dark'
              ? ['#f87171', '#60a5fa'] // Dark mode colors: Tailwind Red-400 and Blue-400
              : ['#ef4444', '#3b82f6'], // Light mode colors: Tailwind Red-500 and Blue-500
            hoverBackgroundColor: theme === 'dark'
              ? ['#fca5a5', '#93c5fd']
              : ['#fca5a5', '#93c5fd'],
            borderWidth: 1,
          },
        ],
      });
    } else {
      console.error('Data prop is missing or not an object.');
      setChartData(null);
    }
  }, [data, translations, theme]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme === 'dark' ? '#fff' : '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
        titleColor: theme === 'dark' ? '#fff' : '#333',
        bodyColor: theme === 'dark' ? '#fff' : '#333',
        borderColor: theme === 'dark' ? '#444' : '#ccc',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
      },
    },
  };

  if (!chartData) {
    return (
      <div className="w-full h-64 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300">No data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

// Define PropTypes for better type checking
BidStatusChart.propTypes = {
  data: PropTypes.shape({
    failed: PropTypes.number.isRequired,
    passed: PropTypes.number.isRequired,
  }).isRequired,
};

// Define default props in case props are missing
BidStatusChart.defaultProps = {
  data: {
    failed: 0,
    passed: 0,
  },
};

export default BidStatusChart;













// // components/BidStatusChart.jsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { useTranslation } from '@/contexts/LanguageContext';
// import { useTheme } from '@/contexts/ThemeContext';
// import PropTypes from 'prop-types';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const BidStatusChart = ({ data }) => {
//   const { translations } = useTranslation();
//   const { theme } = useTheme();
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     if (data && typeof data === 'object') {
//       const { failed, passed } = data;

//       // Validate that failed and passed are numbers
//       if (typeof failed !== 'number' || typeof passed !== 'number') {
//         console.error('Failed and Passed bids must be numbers.');
//         setChartData(null);
//         return;
//       }

//       setChartData({
//         labels: [translations.failed_bids || 'Failed Bids', translations.passed_bids || 'Passed Bids'],
//         datasets: [
//           {
//             data: [failed, passed],
//             backgroundColor: theme === 'dark'
//               ? ['#FF6384', '#36A2EB'] // Dark mode colors
//               : ['#FF6384', '#36A2EB'], // Light mode colors
//             hoverBackgroundColor: theme === 'dark'
//               ? ['#FF6384CC', '#36A2EBCC']
//               : ['#FF6384CC', '#36A2EBCC'],
//           },
//         ],
//       });
//     } else {
//       console.error('Data prop is missing or not an object.');
//       setChartData(null);
//     }
//   }, [data, translations, theme]);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           color: theme === 'dark' ? '#fff' : '#333',
//           font: {
//             size: 14,
//           },
//         },
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
//         titleColor: theme === 'dark' ? '#fff' : '#333',
//         bodyColor: theme === 'dark' ? '#fff' : '#333',
//         borderColor: theme === 'dark' ? '#444' : '#ccc',
//         borderWidth: 1,
//         cornerRadius: 8,
//         padding: 10,
//       },
//     },
//   };

//   if (!chartData) {
//     return (
//       <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg h-96 flex items-center justify-center">
//         <p className="text-gray-700 dark:text-gray-300">No data available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg h-96">
//       <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
//         {translations.bid_status || 'Bid Status'}
//       </h2>
//       <Pie data={chartData} options={options} />
//     </div>
//   );
// };

// // Define PropTypes for better type checking
// BidStatusChart.propTypes = {
//   data: PropTypes.shape({
//     failed: PropTypes.number.isRequired,
//     passed: PropTypes.number.isRequired,
//   }).isRequired,
// };

// // Define default props in case props are missing
// BidStatusChart.defaultProps = {
//   data: {
//     failed: 0,
//     passed: 0,
//   },
// };

// export default BidStatusChart;
