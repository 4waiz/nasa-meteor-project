// src/nasa.js

// Function to get a date in YYYY-MM-DD format
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fetchAsteroids = async () => {
  // Use your key from .env, or fallback to the demo key
  const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 7); // Fetch data for the next 7 days

  const startDateStr = getFormattedDate(today);
  const endDateStr = getFormattedDate(endDate);

  const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`NASA API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    
    // The API returns data grouped by date. We flatten it into a single array.
    const asteroids = [];
    if (data.near_earth_objects) {
        Object.keys(data.near_earth_objects).forEach(date => {
            data.near_earth_objects[date].forEach(asteroid => {
                asteroids.push(asteroid);
            });
        });
    }

    return asteroids;
  } catch (error) {
    console.error("Failed to fetch asteroid data:", error);
    throw error; // Re-throw the error to be caught by the calling component
  }
};