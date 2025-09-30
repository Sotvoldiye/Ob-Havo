import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import CitySelector from '../../components/CitySelector';
import WeatherCountry from '../weatherCountry/WeatherCountry';
import SVGGrafik from '../../components/SVGGrafik';
export default function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState("London");

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className={` min-h-screen `}>

              <WeatherCountry cities={[selectedCity]} handleCitySelect={handleCitySelect}/>
    </div>
  );
}
