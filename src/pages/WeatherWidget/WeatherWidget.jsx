import React, { useState } from 'react'
import WeatherCountry from '../weatherCountry/WeatherCountry'
import CitySelector from '../../components/CitySelector'

export default function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState("London")
  const handleCitySelect = (city) => {
    setSelectedCity(city );
  }
  return (
    <div className='mt-2 flex justify-center items-center flex-col w-full h-full'>
       <CitySelector onSelect={handleCitySelect}/> 
       <WeatherCountry cities={[selectedCity]}/>


    </div>
  )
}
