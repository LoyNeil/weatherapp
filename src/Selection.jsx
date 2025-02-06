import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWeather } from "./DataFetcher";

export function Selection() {
  const { setCity } = useWeather();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch city suggestions from API-Ninjas
  useEffect(() => {
    if (!inputValue || inputValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(inputValue.trim())}`,
          {
            headers: {
              "X-Api-Key": "FKLS401H6kA2LSl1855zcQ==bmR6EhgBn6ZJpSv9",
            },
          }
        );

        // Extract city data from the response
        const cities = response.data.map((city) => ({
          name: city.name,
          countryCode: city.country,
        }));

        setSuggestions(cities);
      } catch (err) {
        console.error("API-Ninjas API Error:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [inputValue]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
  };

  // Handle city selection
  const handleCitySelect = (cityName) => {
    setInputValue(cityName);
    setSuggestions([]);
    setShowDropdown(false);
    setCity(cityName); // Update the city state in WeatherProvider
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      {/* Input Field */}
      <input
        type="text" 
        placeholder="Enter City"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
      />

      {/* Dropdown Suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-black border border-black rounded-md mt-1 max-h-40 overflow-y-auto shadow-md">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleCitySelect(city.name)}
              className="p-2 cursor-pointer hover:bg-black-100"
            >
              {city.name}, {city.countryCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}