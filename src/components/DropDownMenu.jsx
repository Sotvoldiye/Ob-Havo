import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { cities } from '../Request'

export default function DropDownMenu({onSelect}) {
    const [selectedCity, setSelectedCity] = useState("London")

    const handleChange = (value) => {
      setSelectedCity(value)
      onSelect(value) 
    }
    return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button variant="outline">Open</button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={selectedCity} onValueChange={handleChange}>
          {cities.map((city) => (
            <DropdownMenuRadioItem key={city} value={city}>
              {city}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>)
}
