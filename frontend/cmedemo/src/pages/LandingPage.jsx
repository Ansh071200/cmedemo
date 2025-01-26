// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png"; // Adjust the path if necessary

// const LandingPage = () => {
//   const [employeeId, setEmployeeId] = useState(""); // State to track Employee ID input value
//   const [userName, setUserName] = useState(""); // State to track User Name input value
//   const navigate = useNavigate(); // For navigation
//   const [showPrompt, setShowPrompt] = useState(Boolean);

//   // Function to handle Enter key press
//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && employeeId.trim() !== "" && userName.trim() !== "") {
//       navigate(`/selectweek?employeeId=${employeeId}&userName=${userName}`); // Pass both Employee ID and User Name via query parameters
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
//       {/* CME Logo Animation */}
//       {!showPrompt && (
//         <motion.img
//           src={logo}
//           alt="CME Logo"
//           className="w-auto h-auto"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 2 }}
//           onAnimationComplete={() => setShowPrompt(true)} // Switch to prompt after fade-out
//         />
//       )}

//       {/* Prompt for Employee ID and User Name */}
//       {showPrompt && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="text-center"
//         >
//           <h1 className="text-2xl font-bold neon-blue mb-4">
//             Fill Your Food Sheets
//           </h1>
//           <label htmlFor="employeeId" className="block text-lg mb-2">
//             Enter your Employee ID:
//           </label>
//           <input
//             type="text"
//             id="employeeId"
//             value={employeeId}
//             onChange={(e) => setEmployeeId(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Employee ID"
//             className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 mb-4"
//           />
//           <label htmlFor="userName" className="block text-lg mb-2">
//             Enter your Name:
//           </label>
//           <input
//             type="text"
//             id="userName"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Your Name"
//             className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
//           />
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path if necessary

const LandingPage = () => {
  const [employeeId, setEmployeeId] = useState(""); // State to track Employee ID input value
  const [userName, setUserName] = useState(""); // State to track User Name input value
  const navigate = useNavigate(); // For navigation
  const [showPrompt, setShowPrompt] = useState(Boolean);

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && employeeId.trim() !== "" && userName.trim() !== "") {
      navigate(`/selectweek?employeeId=${employeeId}&userName=${userName}`); // Pass both Employee ID and User Name via query parameters
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {/* CME Logo Animation */}
      {!showPrompt && (
        <motion.img
          src={logo}
          alt="CME Logo"
          className="w-auto h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          onAnimationComplete={() => setShowPrompt(true)} // Switch to prompt after fade-out
        />
      )}

      {/* Prompt for Employee ID and User Name */}
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center flex-col flex"
        >
          <h1 className="text-2xl font-bold neon-blue mb-4">
            Fill Your Food Sheets
          </h1>
          <label htmlFor="employeeId" className="block text-lg mb-2">
            Enter your Employee ID and Name:
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Employee ID"
            className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 mb-4"
          />
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your Name"
            className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;

