import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function DailyWeather({ daily }) {
  const days = [];
  const todayStr = new Date().toISOString().split('T')[0]; // "2025-06-06"
  days.push(daily[todayStr]);
  console.log(daily);
  return (
   <Carousel className="w-md">
     <CarouselContent>
    {days[0]?.map((day) => {
      console.log(day.dt_txt);
      return(
      <CarouselItem key={day.dt} className="basis-1/3">
        <div className="flex flex-col items-start ml-5">
          <p>{day.dt_txt.split(" ")[1]}</p>
          {day.weather.map((weather) => (
            <div key={weather.id} className="flex flex-col items-start">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                width="30px"
                alt={weather.description}
              />
              <p>{weather.description}</p>
            </div>
          ))}
        </div>
      </CarouselItem>
    )})}
     
  </CarouselContent>

   </Carousel>
  );
}
