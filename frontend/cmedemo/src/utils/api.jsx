export const getPreferences = async (employeeId, startDate, endDate) => {
    try {
      const response = await fetch(`http://localhost:8080/preferences?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`);
      // console.log(response)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching preferences:', error);
      return null;
    }
  };

  export const submitPreferences = async (preferences) => {
    try {
      const response = await fetch('http://localhost:8080/preferences', {
        method: 'POST',
        body: JSON.stringify(preferences),
        headers: { 'Content-Type': 'application/json' }
      });

      console.log(response)
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('Error submitting preferences:', error);
      return null;
    }
  };
  