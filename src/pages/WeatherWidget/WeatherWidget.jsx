import React, { useState } from 'react'
import WeatherCountry from '../weatherCountry/WeatherCountry'
import DropDownMenu from '../../components/DropDownMenu'

export default function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState("London")
  const handleCitySelect = (city) => {
    setSelectedCity(city );
  }
  return (
    <div className='ml-2 mt-2 flex justify-center items-start'>
       <DropDownMenu onSelect={handleCitySelect}/>
       <WeatherCountry cities={[selectedCity]}/>


    </div>
  )
}
