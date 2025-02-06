import React from "react";
import { useWeather } from "./DataFetcher";

export function RainStatus() {
  const { city, weatherData } = useWeather();

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-md min-h-[200px] p-6 bg-white/30 shadow-lg rounded-lg backdrop-blur-md">
        <h2 className="text-center text-xl font-bold text-black">
          City Name: {city}
        </h2>

        {weatherData ? (
          <div className="mt-4 text-center text-black text-lg">
            <p>🌧️ Chance of Rain: {weatherData?.days?.[0]?.precip}%</p>
            <p className="mt-2 italic text-black">
              {weatherData?.description}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            Loading rain data...
          </p>
        )}
      </div>
    </div>
  );
}
