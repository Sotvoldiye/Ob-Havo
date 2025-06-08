import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import CitySelector from '../../components/CitySelector';
import WeatherCountry from '../weatherCountry/WeatherDisplay';
import SVGGrafik from '../../components/SVGGrafik';

export default function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState("London");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="flex flex-col w-[100%] gap-4 p-4 mx-0">
        {/* Top control bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="text-accent p-2 border border-accent rounded hover:bg-accent hover:text-background transition flex items-center justify-center"
            style={{ minWidth: 40, minHeight: 40 }}
          >
            {darkMode ? (
              <MdLightMode className="text-white" size={24} />
            ) : (
              <MdDarkMode className="text-black" size={24} />
            )}
          </button>

          <div className="flex-1 min-w-[150px] w-full sm:w-auto">
            <CitySelector onSelect={handleCitySelect} />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full flex-1 items-center overflow-y-auto">
          <WeatherCountry cities={[selectedCity]} />
        </div>
      </div>
    </div>
  );
}
