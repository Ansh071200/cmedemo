import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { submitPreferences, getPreferences } from "../utils/api";

const PreferencesPage = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const employeeId = searchParams.get("employeeId");
  const userName = searchParams.get("userName");
  const [preferences, setPreferences] = useState([]);
  const [datesAvailable, setDatesAvailable] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bulkPreference, setBulkPreference] = useState("");

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    while (start <= end) {
      dates.push(start.toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }
    setDatesAvailable(dates);
  }, [startDate, endDate]);

  const handlePreferenceChange = (date, vegPreference) => {
    setPreferences((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((p) => p.date === date);
      if (index > -1) {
        updated[index].vegPreference = vegPreference;
      } else {
        updated.push({ date, vegPreference });
      }
      return updated;
    });
  };

  const handleBulkPreferenceChange = (vegPreference) => {
    setBulkPreference(vegPreference);
    setPreferences(datesAvailable.map(date => ({
      date,
      vegPreference
    })));
  };

  const handleSubmit = async () => {

    const dataExists = await getPreferences(employeeId, startDate, endDate);

    console.log(dataExists)

    if (dataExists.length > 0) { 
      alert("You've already submitted preferences for this week.");
      return;
    }

    const preferencesData = preferences.map((preference) => ({
      employeeId,
      preferenceDate: preference.date,
      startDate,
      endDate,
      vegPreference: preference.vegPreference,
      userName,
    }));

        console.log(preferencesData)
  
    const response = await submitPreferences(preferencesData);
    if (response && response.includes("Preferences saved successfully")) {
      alert("Preferences Submitted Successfully!");
    } else {
      setErrorMessage("Failed to submit preferences. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-8">
      <motion.div
        className="w-full max-w-xl bg-black border-2 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-bold text-center neon-blue mb-4">
          Food Preferences - {startDate} to {endDate}
        </h2>
        <p className="text-center mb-6">
          Employee ID: <span className="font-bold">{employeeId}</span>
        </p>

        {/* Bulk Preference Selector */}
        <div className="mb-6 flex justify-between">
          <span className="text-xl">Select Preference for All Dates</span>
          <div className="flex space-x-4">
            <motion.button
              className="p-2 bg-green-950 text-white rounded border-2 border-blue-950"
              onClick={() => handleBulkPreferenceChange("veg")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Veg
            </motion.button>
            <motion.button
              className="p-2 bg-red-950 text-white rounded border-2 border-blue-950"
              onClick={() => handleBulkPreferenceChange("non-veg")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Non-Veg
            </motion.button>
            <motion.button
              className="p-2 bg-black text-white rounded border-2 border-blue-950"
              onClick={() => handleBulkPreferenceChange("")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              No Meal
            </motion.button>
          </div>
        </div>

        {/* Date Preferences */}
        <div
          className="space-y-6 overflow-auto max-h-96 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent"
          style={{
            scrollbarColor: "transparent transparent",
            scrollbarWidth: "thin",
          }}
        >
          {datesAvailable.map((date) => (
            <motion.div
              key={date}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span>{date}</span>
              <motion.select
                value={
                  preferences.find((p) => p.date === date)?.vegPreference || bulkPreference || ""
                }
                onChange={(e) =>
                  handlePreferenceChange(date, e.target.value)
                }
                className="p-2 bg-black text-white rounded focus:outline-none focus:ring focus:ring-blue-950"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <option value="">No Meal</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </motion.select>
            </motion.div>
          ))}
        </div>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}

        <motion.button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-blue-950 hover:bg-blue-800 rounded text-white font-bold text-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Submit Preferences
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PreferencesPage;
