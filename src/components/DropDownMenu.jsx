import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
export default function DropDownMenu({ onSelect, options = [] }) {
  const [selectedCity, setSelectedCity] = useState(options[0] || "London");

  const handleChange = (value) => {
    setSelectedCity(value);
    onSelect(value);
  };

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="border px-4 py-2 rounded-sm">
        {selectedCity || "Shahar tanlang"}
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      {options.length > 0 ? (
        <DropdownMenuRadioGroup value={selectedCity} onValueChange={handleChange}>
          {options.map((city) => (
            <DropdownMenuRadioItem key={city} value={city}>
              {city}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      ) : (
        <p className="p-4 text-center text-gray-500">Shahar topilmadi</p>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
  );
}
