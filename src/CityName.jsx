import React from "react";
import { useWeather } from "./DataFetcher";

export function CityName() {
  const { city, weatherData } = useWeather();

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-md min-h-[200px] p-6 bg-white/30 shadow-lg rounded-lg backdrop-blur-xs">
        <h2 className="text-center text-xl font-bold text-black">
          City Name: {city}
        </h2>
        {weatherData ? (
          <div className="mt-4 text-center text-black text-lg">
            <p>🌡 Temperature: {weatherData?.currentConditions?.temp}°C</p>
            <p>📈 Max Temp: {weatherData?.days?.[0]?.tempmax}°C</p>
            <p>📉 Min Temp: {weatherData?.days?.[0]?.tempmin}°C</p>
          </div>
        ) : (
          <p className="text-center text-white mt-4">
            Loading temperature data...
          </p>
        )}
      </div>
    </div>
  );
}
