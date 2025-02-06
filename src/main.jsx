import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WeatherProvider } from "./DataFetcher";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WeatherProvider>
    <div className = "min-h-screen bg-[#F0F4F8]">
      <App />
    </div>
  </WeatherProvider>
);

