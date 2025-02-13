// app/dashboard/page.jsx
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Graph from "@/components/Graph";
import BidStatusChart from "@/components/BidStatusChart";
import BidsList from "@/components/BidsList";
import RealisticButton from "@/components/RealisticButton";
import { useTranslation } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const { translations } = useTranslation();
  const [autoBidding, setAutoBidding] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleAutoBidding = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAutoBidding(!autoBidding);
    setLoading(false);
    // Implement actual auto-bidding toggle logic here (e.g., API call)
    toast.success(
      autoBidding
        ? translations.auto_bidding_off_confirmation ||
            "Auto-Bidding has been turned off."
        : translations.auto_bidding_on_confirmation ||
            "Auto-Bidding has been turned on."
    );
  };

  // Mock data for Line Graphs
  const totalBidsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    dataPoints: [120, 150, 170, 80, 200, 130, 160],
  };

  const last7DaysBidsData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    dataPoints: [10, 20, 15, 30, 25, 35, 40],
  };

  // Mock data for Bid Status Chart
  const bidStatusData = {
    failed: 30,
    passed: 70,
  };

  // Validate data before passing
  const isTotalBidsDataValid =
    Array.isArray(totalBidsData.labels) &&
    Array.isArray(totalBidsData.dataPoints) &&
    totalBidsData.labels.length === totalBidsData.dataPoints.length;

  const isLast7DaysBidsDataValid =
    Array.isArray(last7DaysBidsData.labels) &&
    Array.isArray(last7DaysBidsData.dataPoints) &&
    last7DaysBidsData.labels.length === last7DaysBidsData.dataPoints.length;

  const isBidStatusDataValid =
    bidStatusData &&
    typeof bidStatusData.failed === "number" &&
    typeof bidStatusData.passed === "number";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="flex flex-col items-center space-y-4 py-16 bg-slate-500 rounded-xl shadow-md">
                <RealisticButton
                  onClick={toggleAutoBidding}
                  loading={loading}
                  icon={
                    autoBidding ? (
                      <img
                        src="/auto-on.svg"
                        alt="Auto On"
                        className="h-6 w-6"
                      />
                    ) : (
                      <img
                        src="/auto-off.svg"
                        alt="Auto Off"
                        className="h-6 w-6"
                      />
                    )
                  }
                  className={`${
                    autoBidding
                      ? "from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 dark:from-green-600 dark:to-green-800"
                      : "from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 dark:from-red-600 dark:to-red-800"
                  }`}
                  size="lg"
                />
                <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
                  {autoBidding
                    ? translations.auto_bidding_enabled ||
                      "Auto Bidding Enabled"
                    : translations.auto_bidding_disabled ||
                      "Auto Bidding Disabled"}
                </p>
              </div>
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
                whileHover={{ scale: 1.02 }}
              >
                <BidsList />
              </motion.div>
            </div>

            {/* Right Side - Graphs and Charts */}
            <div className="w-full  flex flex-col space-y-6">
              {/* Total Bids and Last 7 Days Bids in a Grid */}
              {/* Total Bids Graph */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 md:p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                  {translations.total_bids || "Total Bids"}
                </h2>
                {isTotalBidsDataValid ? (
                  <Graph
                    title="total_bids"
                    labels={totalBidsData.labels}
                    dataPoints={totalBidsData.dataPoints}
                    color="indigo"
                  />
                ) : (
                  <p className="text-red-500">
                    Invalid data for Total Bids Graph.
                  </p>
                )}
              </motion.div>

              {/* Last 7 Days Bids Graph */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 md:p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                  {translations.last_7_days_bids || "Last 7 Days Bids"}
                </h2>
                {isLast7DaysBidsDataValid ? (
                  <Graph
                    title="last_7_days_bids"
                    labels={last7DaysBidsData.labels}
                    dataPoints={last7DaysBidsData.dataPoints}
                    color="green"
                  />
                ) : (
                  <p className="text-red-500">
                    Invalid data for Last 7 Days Bids Graph.
                  </p>
                )}
              </motion.div>

              {/* Bid Status Chart */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 md:p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                  {translations.bid_status || "Bid Status"}
                </h2>
                {isBidStatusDataValid ? (
                  <BidStatusChart data={bidStatusData} />
                ) : (
                  <p className="text-red-500">
                    Invalid data for Bid Status Chart.
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Floating Action Button */}
          <motion.div
            className="fixed bottom-6 right-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <RealisticButton
              label="+"
              onClick={() => {
                // Implement add new bid functionality
                toast.info(
                  translations.add_new_bid ||
                    "Add new bid functionality coming soon!"
                );
              }}
              icon={<FaPlus className="text-white h-4 w-4" />}
              className="from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 dark:from-blue-600 dark:to-blue-800"
              size="lg" // Ensured FAB is prominent
            />
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// // app/dashboard/page.jsx
// 'use client';

// import React, { useState } from 'react';
// import Header from '@/components/Header';
// import Graph from '@/components/Graph';
// import BidStatusChart from '@/components/BidStatusChart';
// import BidsList from '@/components/BidsList';
// import RealisticButton from '@/components/RealisticButton';
// import { useTranslation } from '@/contexts/LanguageContext';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { motion } from 'framer-motion';
// import { FaPlus } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// export default function DashboardPage() {
//   const { translations } = useTranslation();
//   const [autoBidding, setAutoBidding] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toggleAutoBidding = async () => {
//     setLoading(true);
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     setAutoBidding(!autoBidding);
//     setLoading(false);
//     // Implement actual auto-bidding toggle logic here (e.g., API call)
//     toast.success(
//       autoBidding
//         ? translations.auto_bidding_off_confirmation || 'Auto-Bidding has been turned off.'
//         : translations.auto_bidding_on_confirmation || 'Auto-Bidding has been turned on.'
//     );
//   };

//   // Mock data for Line Graphs
//   const totalBidsData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     dataPoints: [120, 150, 170, 80, 200, 130, 160],
//   };

//   const last7DaysBidsData = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//     dataPoints: [10, 20, 15, 30, 25, 35, 40],
//   };

//   // Mock data for Bid Status Chart
//   const bidStatusData = {
//     failed: 30,
//     passed: 70,
//   };

//   // Validate data before passing
//   const isTotalBidsDataValid =
//     Array.isArray(totalBidsData.labels) &&
//     Array.isArray(totalBidsData.dataPoints) &&
//     totalBidsData.labels.length === totalBidsData.dataPoints.length;

//   const isLast7DaysBidsDataValid =
//     Array.isArray(last7DaysBidsData.labels) &&
//     Array.isArray(last7DaysBidsData.dataPoints) &&
//     last7DaysBidsData.labels.length === last7DaysBidsData.dataPoints.length;

//   const isBidStatusDataValid =
//     bidStatusData &&
//     typeof bidStatusData.failed === 'number' &&
//     typeof bidStatusData.passed === 'number';

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//         <Header />
//         <main className="container mx-auto p-6">
//           {/* Main Content */}
//           <div className="flex flex-col lg:flex-row lg:space-x-6">
//             {/* Left Side - Button and Bids List */}
//             <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start mb-6 lg:mb-0 space-y-4">
//               <RealisticButton
//                 label={
//                   autoBidding
//                     ? translations.auto_bidding_on || 'Auto On'
//                     : translations.auto_bidding_off || 'Auto Off'
//                 }
//                 onClick={toggleAutoBidding}
//                 loading={loading}
//                 icon={autoBidding ? '/icons/auto-on.svg' : '/icons/auto-off.svg'} // Ensure these icons exist
//                 className={`${
//                   autoBidding
//                     ? 'from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 dark:from-green-600 dark:to-green-800'
//                     : 'from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 dark:from-red-600 dark:to-red-800'
//                 }`}
//               />
//               <p className="text-lg text-gray-700 dark:text-gray-300 text-center lg:text-left">
//                 {autoBidding
//                   ? translations.auto_bidding_enabled || 'Auto Bidding Enabled'
//                   : translations.auto_bidding_disabled || 'Auto Bidding Disabled'}
//               </p>
//               {/* Bids List */}
//               <div className="w-full">
//                 <motion.div
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <BidsList />
//                 </motion.div>
//               </div>
//             </div>

//             {/* Right Side - Graphs and Charts */}
//             <div className="w-full lg:w-2/3 flex flex-col space-y-6">
//               {/* Total Bids Graph */}
//               <motion.div
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
//                   {translations.total_bids || 'Total Bids'}
//                 </h2>
//                 {isTotalBidsDataValid ? (
//                   <Graph
//                     labels={totalBidsData.labels}
//                     dataPoints={totalBidsData.dataPoints}
//                     color="indigo"
//                   />
//                 ) : (
//                   <p className="text-red-500">Invalid data for Total Bids Graph.</p>
//                 )}
//               </motion.div>

//               {/* Last 7 Days Bids Graph */}
//               <motion.div
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
//                   {translations.last_7_days_bids || 'Last 7 Days Bids'}
//                 </h2>
//                 {isLast7DaysBidsDataValid ? (
//                   <Graph
//                     labels={last7DaysBidsData.labels}
//                     dataPoints={last7DaysBidsData.dataPoints}
//                     color="green"
//                   />
//                 ) : (
//                   <p className="text-red-500">Invalid data for Last 7 Days Bids Graph.</p>
//                 )}
//               </motion.div>

//               {/* Bid Status Chart */}
//               <motion.div
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
//                   {translations.bid_status || 'Bid Status'}
//                 </h2>
//                 {isBidStatusDataValid ? (
//                   <BidStatusChart data={bidStatusData} />
//                 ) : (
//                   <p className="text-red-500">Invalid data for Bid Status Chart.</p>
//                 )}
//               </motion.div>
//             </div>
//           </div>

//           {/* Floating Action Button */}
//           <motion.div
//             className="fixed bottom-6 right-6"
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <RealisticButton
//               label="+"
//               onClick={() => {
//                 // Implement add new bid functionality
//                 toast.info(translations.add_new_bid || 'Add new bid functionality coming soon!');
//               }}
//               icon={<FaPlus className="text-white h-4 w-4" />}
//               className="from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 dark:from-blue-600 dark:to-blue-800"
//             />
//           </motion.div>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }

// // app/dashboard/page.jsx
// 'use client';

// import React, { useState } from 'react';
// import Header from '@/components/Header';
// import Graph from '@/components/Graph';
// import BidStatusChart from '@/components/BidStatusChart';
// import BidsList from '@/components/BidsList';
// import ThemedButton from '@/components/ThemedButton';
// import { useTranslation } from '@/contexts/LanguageContext';
// import ProtectedRoute from '@/components/ProtectedRoute';

// export default function DashboardPage() {
//   const { translations } = useTranslation();
//   const [autoBidding, setAutoBidding] = useState(false);

//   const toggleAutoBidding = () => {
//     setAutoBidding(!autoBidding);
//     // Implement auto-bidding toggle logic here (e.g., API call)
//   };

//   // Mock data for Line Graphs
//   const totalBidsData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     dataPoints: [120, 150, 170, 80, 200, 130, 160],
//   };

//   const last7DaysBidsData = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//     dataPoints: [10, 20, 15, 30, 25, 35, 40],
//   };

//   // Mock data for Bid Status Chart
//   const bidStatusData = {
//     failed: 30,
//     passed: 70,
//   };

//   // Validate data before passing
//   const isTotalBidsDataValid =
//     Array.isArray(totalBidsData.labels) &&
//     Array.isArray(totalBidsData.dataPoints) &&
//     totalBidsData.labels.length === totalBidsData.dataPoints.length;

//   const isLast7DaysBidsDataValid =
//     Array.isArray(last7DaysBidsData.labels) &&
//     Array.isArray(last7DaysBidsData.dataPoints) &&
//     last7DaysBidsData.labels.length === last7DaysBidsData.dataPoints.length;

//   const isBidStatusDataValid =
//     bidStatusData &&
//     typeof bidStatusData.failed === 'number' &&
//     typeof bidStatusData.passed === 'number';

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
//         <Header />
//         <main className="container mx-auto p-6">
//           {/* Overview Section */}
//           <section className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
//               {translations.dashboard_overview}
//             </h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Total Bids Card */}
//               <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                 <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                   {translations.total_bids}
//                 </h2>
//                 {isTotalBidsDataValid ? (
//                   <Graph
//                     labels={totalBidsData.labels}
//                     dataPoints={totalBidsData.dataPoints}
//                     color="indigo"
//                   />
//                 ) : (
//                   <p className="text-red-500">Invalid data for Total Bids Graph.</p>
//                 )}
//               </div>

//               {/* Last 7 Days Bids Card */}
//               <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                 <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                   {translations.last_7_days_bids}
//                 </h2>
//                 {isLast7DaysBidsDataValid ? (
//                   <Graph
//                     labels={last7DaysBidsData.labels}
//                     dataPoints={last7DaysBidsData.dataPoints}
//                     color="green"
//                   />
//                 ) : (
//                   <p className="text-red-500">Invalid data for Last 7 Days Bids Graph.</p>
//                 )}
//               </div>

//               {/* Bid Status Chart Card */}
//               <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                 <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                   {translations.bid_status}
//                 </h2>
//                 {isBidStatusDataValid ? (
//                   <BidStatusChart data={bidStatusData} />
//                 ) : (
//                   <p className="text-red-500">Invalid data for Bid Status Chart.</p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* Bids List Section */}
//           <section className="mb-8">
//             <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
//                 {translations.bids_list}
//               </h2>
//               {/* <ThemedButton
//                 label={autoBidding ? translations.auto_bidding_on : translations.auto_bidding_off}
//                 onClick={toggleAutoBidding}
//                 className={`${
//                   autoBidding
//                     ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
//                     : 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
//                 }`}
//               /> */}
//             </div>
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//               <BidsList />
//             </div>
//           </section>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }
