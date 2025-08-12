import React from "react";
import { CityName } from "./CityName";
import { RainStatus } from "./RainStatus";
import { HumidStatus } from "./HumidStatus";
import { Prediction } from "./Prediction";
// import { WeatherProvider } from "./DataFetcher";
import {Selection} from "./Selection"

export function Content() {
  return (
    // <WeatherProvider>
    <div>
      <Selection />
      <div className="w-full h-full mt-5 ml-2">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mr-4">
          {/* City Name */}
          <div className="col-span-1">
            <CityName />
          </div>

          {/* Rain Status */}
          <div className="col-span-1">
            <RainStatus />
          </div>

          {/* Humidity Status */}
          <div className="col-span-1">
            <HumidStatus />
          </div>

          {/* Prediction */}
          <div className="col-span-full">
            <Prediction />
          </div>
        </div>
      </div>
      </div>
    // </WeatherProvider>
  );
}
