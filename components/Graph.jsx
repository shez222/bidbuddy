// components/Graph.jsx
'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Graph = ({ title, labels, dataPoints }) => {
  const { translations } = useTranslation();
  const { theme } = useTheme();

  // Defensive checks
  if (!Array.isArray(labels) || !Array.isArray(dataPoints)) {
    console.error('Labels and DataPoints must be arrays.');
    return null; // Or render a fallback UI
  }

  if (labels.length !== dataPoints.length) {
    console.error('Labels and DataPoints arrays must have the same length.');
    return null; // Or render a fallback UI
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: translations[title] || title,
        data: dataPoints,
        fill: false, // No fill to simplify
        backgroundColor: theme === 'dark' ? 'rgba(255, 99, 132, 0.5)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        pointBackgroundColor: theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adjust its height
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: theme === 'dark' ? '#fff' : '#333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: translations[title] || title,
        color: theme === 'dark' ? '#fff' : '#333',
        font: {
          size: 18,
          weight: 'bold',
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
        displayColors: false, // Hide the color box in tooltips
        callbacks: {
          label: function (context) {
            return `${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#333',
          font: {
            size: 12,
          },
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
      },
      y: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#333',
          font: {
            size: 12,
          },
          beginAtZero: true,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="relative bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

// Define PropTypes for better type checking
Graph.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

// Define default props in case props are missing
Graph.defaultProps = {
  title: 'graph',
  labels: [],
  dataPoints: [],
};

export default Graph;












// // components/Graph.jsx
// 'use client';

// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';
// import { useTranslation } from '@/contexts/LanguageContext';
// import { useTheme } from '@/contexts/ThemeContext';
// import { useRef, useEffect, useState } from 'react';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Graph = ({ title, labels, dataPoints }) => {
//   const { translations } = useTranslation();
//   const { theme } = useTheme();
//   const chartRef = useRef(null);
//   const [gradient, setGradient] = useState(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const chart = chartRef.current;
//       const ctx = chart.ctx;

//       // Create a gradient
//       const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//       gradient.addColorStop(0, theme === 'dark' ? 'rgba(255, 99, 132, 0.5)' : 'rgba(75, 192, 192, 0.2)');
//       gradient.addColorStop(1, theme === 'dark' ? 'rgba(255, 99, 132, 0)' : 'rgba(75, 192, 192, 0)');

//       setGradient(gradient);
//     }
//   }, [theme, chartRef]);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: translations[title],
//         data: dataPoints,
//         fill: true,
//         backgroundColor: gradient || 'rgba(75, 192, 192, 0.2)', // Fallback if gradient is not set yet
//         borderColor: theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
//         tension: 0.4,
//         pointBackgroundColor: theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
//         pointBorderColor: '#fff',
//         pointHoverRadius: 6,
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false, // Allows the chart to adjust its height
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           color: theme === 'dark' ? '#fff' : '#333',
//           font: {
//             size: 14,
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: translations[title],
//         color: theme === 'dark' ? '#fff' : '#333',
//         font: {
//           size: 18,
//           weight: 'bold',
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
//         displayColors: false, // Hide the color box in tooltips
//         callbacks: {
//           label: function (context) {
//             return `${context.parsed.y}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: theme === 'dark' ? '#fff' : '#333',
//           font: {
//             size: 12,
//           },
//         },
//         grid: {
//           color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
//         },
//       },
//       y: {
//         ticks: {
//           color: theme === 'dark' ? '#fff' : '#333',
//           font: {
//             size: 12,
//           },
//           beginAtZero: true,
//         },
//         grid: {
//           color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
//         },
//       },
//     },
//     animation: {
//       duration: 1000,
//       easing: 'easeOutQuart',
//     },
//   };

//   return (
//     <div className="relative bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg h-96">
//       <Line ref={chartRef} data={chartData} options={options} />
//     </div>
//   );
// };

// export default Graph;
