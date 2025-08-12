import React, { useEffect, useState } from "react";
import { Content } from "./Content";
import { useWeather } from "./DataFetcher";


function App() {
  const { weatherData, city } = useWeather();
  const [backgroundImage, setBackgroundImage] = useState("/weather.jpg");

  useEffect(() => {
    if (weatherData) {
      const rainAmount = weatherData?.days?.[0]?.precip;
      const tempera = weatherData?.currentConditions?.temp;

      console.log("Rain:", rainAmount, "Temperature:", tempera);

      if (rainAmount > 0.1) {
        setBackgroundImage("/rain.jpg");
      } else if (tempera > 80) {
        setBackgroundImage("/temperature.jpeg");
      } else {
        setBackgroundImage("/weather.jpg");
      }
    }
  }, [weatherData]); // Runs whenever weatherData changes

  console.log("Updated Background Image:", backgroundImage);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
      <img
        className="absolute h-full w-full opacity-60 object-cover"
        src={backgroundImage}
        alt="Background"
      />
      <div className="relative z-10 text-white text-center bg-black/30 p-6 rounded-lg">
        <p className="text-3xl font-bold">Weather Status</p>
        <div className="mt-4">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
