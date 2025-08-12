import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useWeather, WeatherContext } from "./DataFetcher";

export function Prediction() {
  const [weatherData, setWeatherData] = useState(null);

  const {city, setCity} = useWeather();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&key=LA2M5HDL796ZDWW3H8ED7YNU2&contentType=json`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div>
      {/* Predictions Heading */}
      <h2 className="text-center text-black font-bold text-2xl mb-4">Predictions</h2>

      {/* Weather Data Display */}
      {!weatherData ? (
        <p className="text-center text-gray-600">Loading weather data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 backdrop-blur-md">
          {weatherData.days?.map((day, index) => (
            <div key={index} className="bg-white/30 p-4 rounded-lg shadow-md flex flex-col items-center backdrop-blur-md">
              <p className="text-lg text-black font-semibold">{day.datetime}</p>
              <p className="text-black text-center">🌅 Sunrise: {day.sunrise} | <br/> 🌇 Sunset: {day.sunset}</p>
              <p className="text-black">🌡️ Temp: {day.tempmin}°F - {day.tempmax}°F</p>
              <p className="text-black">💧 Humidity: {day.humidity}%</p>
              <p className="text-black">🌧️ Rain: {day.precip || 0} mm</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
