import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function DailyWeather({ daily }) {
  const days = [];
  const todayStr = new Date().toISOString().split('T')[0]; // "2025-06-06"
  days.push(daily[todayStr]);
  console.log(daily);
  return (
<div className="w-full flex justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 py-6 dark:from-[#1e1f26] dark:via-[#2b2d31] dark:to-[#1e1f26]">
  <Carousel className="w-full max-w-[900px]">
    <CarouselContent className="flex flex-wrap justify-center gap-4">
      {days[0]?.map((day) => {
        const time = day.dt_txt.split(" ")[1].slice(0, 5);
        const weather = day.weather[0];

        return (
          <CarouselItem
            key={day.dt}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 p-3"
          >
            <div className="flex flex-col items-center justify-center bg-white dark:bg-[#2c2f33] rounded-2xl p-7 shadow-lg transition hover:scale-105 duration-200 ease-in-out">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                {time}
              </p>

              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="w-12 h-12"
              />

              <p className="text-xs text-gray-600 dark:text-gray-300 capitalize mt-1">
                {weather.description}
              </p>

              <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
                {Math.round(day.main.temp)}°C
              </p>
            </div>
          </CarouselItem>
        );
      })}
    </CarouselContent>
  </Carousel>
</div>

  );
}
