import React from "react";
import DailyWeather from "./DailyWeather";
import { Card, CardContent } from "./ui/card";

export default function WeekleyWeather({ city }) {
  //  props dan kelgan malumotni saralab shu obj ga joylashtiriladi
  const daily = {};
  // props dan kelayotgan malumotni saralab qayta nom berilyapti
  city.forEach((day) => {
    const days = day;
    const item = day.dt_txt.split(" ")[0];
    if (!daily[item]) {
      daily[item] = [];
    }
    daily[item].push(days);
  });
  // daily ni ichidagi har bir obj dan weather degan qismi olinib yangi obj yaratilyapti
  const weeklyData = Object.entries(daily).map(([date, items]) => {
    const avgTemp =
      items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;

    const weather = items[0].weather[0]; // 1-chi entry dan olish

    const pops = items[0].pop;
    return {
      date,
      avgTemp: +avgTemp.toFixed(1),
      description: weather.description,
      icon: weather.icon,
      pops: pops,
    };
  });

  const todayStr = new Date().toISOString().split("T")[0]; // "2025-06-06"
  // 3. UI chiqish
  return (
    <div className="flex flex-col items-start w-full">
    <Card className="w-full mt-2 bg-white dark:bg-[#2c2f33] text-[#212529] dark:text-[#f8f9fa] rounded-xl shadow">
      <DailyWeather daily={daily} />
  
      {weeklyData.slice(0, 5).map((day) => {
        const dateWeek = day.date;
        const dateDay = new Date(dateWeek);
        const dayName = dateDay.toLocaleDateString("en-US", {
          weekday: "long",
        });
  
        return (
          <CardContent
            key={day.date}
            className="flex items-center justify-between gap-4 px-4 py-2 border-b dark:border-gray-700 last:border-none"
          >
            {/* Day Name */}
            <h3 className="w-20 font-medium">
              {day.date === todayStr ? "Today" : dayName}
            </h3>
  
            {/* Icon and Pop % */}
            <div className="flex flex-col items-center w-16">
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="w-10 h-10"
              />
              {day.pops > 0 && (
                <p className="text-xs text-blue-500">{Math.round(day.pops * 100)}%</p>
              )}
            </div>
  
            {/* Avg Temp */}
            <p className="w-14 text-center">{day.avgTemp}°C</p>
  
            {/* Description */}
            <p className="flex-1 text-sm italic text-gray-500 dark:text-gray-300">
              {day.description}
            </p>
          </CardContent>
        );
      })}
    </Card>
  </div>
  
  );
}
