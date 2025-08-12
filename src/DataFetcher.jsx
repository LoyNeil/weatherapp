import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for weather data
export const WeatherContext = createContext();

// Provider Component
export function WeatherProvider({ children }) {
  const [city, setCity] = useState("Hosur"); // Default city
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!city || city.trim() === "") return; // Prevent empty city errors

        console.log("Fetching weather for:", city);

        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
            city.trim()
          )}?unitGroup=us&key=LA2M5HDL796ZDWW3H8ED7YNU2&contentType=json`
        );

        console.log("API Response:", response.data); // Log the API response
        setWeatherData(response.data);
      } catch (err) {
        console.error("Axios Error:", err);
      }
    };

    fetchData();
  }, [city]); // Trigger API call when city changes

  // Provide the context value
  const value = {
    city,
    setCity,
    weatherData,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

// Custom Hook for using the context
export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}