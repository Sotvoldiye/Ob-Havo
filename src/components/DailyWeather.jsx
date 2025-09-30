import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "./ui/carousel";

export default function DailyWeather({ daily }) {
  const todayStr = new Date().toISOString().split("T")[0];
  const todayData = daily?.[todayStr] || []; // himoya

  return (
    <div className="w-full flex justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 py-4 sm:py-6 dark:from-[#1e1f26] dark:via-[#2b2d31] dark:to-[#1e1f26]">
      <Carousel className="w-full max-w-[800px] px-2 sm:px-4">
        <CarouselContent className="flex flex-row gap-2 sm:gap-4 items-center">
          {todayData.length > 0 ? (
            todayData.map((day) => {
              const time = day.dt_txt.split(" ")[1].slice(0, 5);
              const weather = day.weather[0];

              return (
                <CarouselItem
                  key={day.dt}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 px-1 sm:px-2 min-w-[100px]"
                >
                  <div className="flex flex-col items-center justify-center bg-white dark:bg-[#2c2f33] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition hover:scale-[1.03] duration-200 ease-in-out">
                    {/* Time */}
                    <p className="text-[11px] sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      {time}
                    </p>

                    {/* Icon */}
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={weather.description}
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 capitalize mt-1 text-center">
                      {weather.description}
                    </p>

                    {/* Temperature */}
                    <p className="mt-2 text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                      {Math.round(day.main.temp)}°C
                    </p>
                  </div>
                </CarouselItem>
              );
            })
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center w-full">
              Bugungi prognoz topilmadi
            </p>
          )}
        </CarouselContent>

        {/* Agar navigatsiya kerak bo‘lsa, commentni ochib ishlatish mumkin */}
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
