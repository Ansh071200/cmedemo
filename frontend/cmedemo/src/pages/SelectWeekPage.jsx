// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";

// const SelectWeekPage = () => {
//   const [week, setWeek] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Retrieve the employeeId from query params
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const employeeId = searchParams.get("employeeId");

//   const handleProceed = () => {
//     if (!week) {
//       setError("Please select a week.");
//       return;
//     }
//     navigate(`/preferences?week=${week}&employeeId=${employeeId}`); // Pass employeeId and week to PreferencesPage
//   };

//   return (
//     <div className="h-screen bg-black border-white text-white flex flex-col items-center justify-center">
//       <motion.div
//         className="w-full max-w-sm text-center"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeInOut" }}
//       >
//         <h1 className="text-3xl font-bold mb-6 text-neon-blue">
//           Select a Week
//         </h1>
//         <select
//           value={week}
//           onChange={(e) => setWeek(e.target.value)}
//           className="w-full p-3 rounded bg-black border border-blue-950 text-white focus:outline-none focus:ring focus:ring-blue-950 mb-4"
//         >
//           <option value="">Select Week</option>
//           <option value="week-1">Week 1</option>
//           <option value="week-2">Week 2</option>
//           <option value="week-3">Week 3</option>
//           <option value="week-4">Week 4</option>
//         </select>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <motion.button
//           onClick={handleProceed}
//           className="w-full py-3 bg-blue-950 hover:bg-blue-950 text-white font-bold rounded shadow-lg"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Proceed
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default SelectWeekPage;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Function to get the start of the next week (Monday)
const getNextMonday = (date) => {
  const dayOfWeek = date.getDay();
  const diff = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const nextMonday = new Date(date);
  nextMonday.setDate(date.getDate() + diff);
  return nextMonday;
};

const getWeekRange = (startOfWeek) => {
  const start = new Date(startOfWeek);
  const end = new Date(startOfWeek);
  end.setDate(startOfWeek.getDate() + 4); // Friday of the week
  
  const startDate = start.toISOString().split('T')[0];
  const endDate = end.toISOString().split('T')[0];
  
  return [startDate, endDate];
};

const SelectWeekPage = () => {
  const [currentWeekRange, setCurrentWeekRange] = useState([]);
  const [nextWeekRange, setNextWeekRange] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const employeeId = searchParams.get("employeeId");
  const userName = searchParams.get("userName");

  useEffect(() => {
    const today = new Date();
    
    // Calculate next Monday
    const nextMonday = getNextMonday(today);
    const [currentStart, currentEnd] = getWeekRange(nextMonday); // This is the first range (next week)
    const [nextStart, nextEnd] = getWeekRange(new Date(nextMonday.setDate(nextMonday.getDate() + 7))); // The second range (week after next)
    
    setCurrentWeekRange([currentStart, currentEnd]);
    setNextWeekRange([nextStart, nextEnd]);
  }, []);

  const handleProceed = () => {
    if (!selectedRange) {
      setError("Please select a date range.");
      return;
    }
  
    // Split the selectedRange into date parts
    const dateParts = selectedRange.split("-");
    
    // Reconstruct the startDate and endDate
    const startDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
    const endDate = `${dateParts[3]}-${dateParts[4]}-${dateParts[5]}`;
  
    // Ensure that startDate and endDate are valid and then navigate
    if (startDate && endDate) {
      navigate(`/preferences?startDate=${startDate}&endDate=${endDate}&employeeId=${employeeId}&userName=${userName}`);
    } else {
      setError("Invalid date range selected.");
    }
  };
  

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-sm text-center border p-8 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="text-3xl font-bold mb-8 text-neon-blue">
          Select Date Range
        </h1>

        {/* Dropdown for selecting date range */}
        <div className="mb-6">
          <span className="block text-xl mb-4">Select the Week</span>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="w-full p-4 rounded bg-black border border-blue-950 text-white focus:outline-none focus:ring focus:ring-blue-950"
          >
            <option value="">Date Ranges</option>
            <option value={`${currentWeekRange[0]}-${currentWeekRange[1]}`}>
              Upcoming Week: {currentWeekRange[0]} to {currentWeekRange[1]}
            </option>
            <option value={`${nextWeekRange[0]}-${nextWeekRange[1]}`}>
              Next Week: {nextWeekRange[0]} to {nextWeekRange[1]}
            </option>
          </select>
        </div>

        {error && <p className="text-red-500 mb-6">{error}</p>}

        <motion.button
          onClick={handleProceed}
          className="w-full py-3 bg-blue-950 hover:bg-blue-950 text-white font-bold rounded shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SelectWeekPage;
