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
    const avgPop =
      items.reduce((sum, item) => sum + (item.pop || 0), 0) / items.length;
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
    <div className="flex flex-col items-start">
      <Card className="w-md mt-2">
        <DailyWeather daily={daily} />

        {weeklyData.slice(0, 5).map((day) => {
          const dateWeek = day.date;
          const dateDay = new Date(dateWeek);
          const dayName = dateDay.toLocaleDateString("eng-US", {
            weekday: "long",
          });
          return (
            <CardContent key={day.date} className="flex items-center gap-3">
                <h3>{day.date === todayStr ? "Today" : dayName}</h3>
                <div className="flex flex-col items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                    width={"40px"}
                  />
                  {day.pops > 0 && <p>{Math.round(day.pops * 100)}%</p>}{" "}
                </div>
              <p>{day.avgTemp}°C</p>
              <p>{day.description}</p>
            </CardContent>
          );
        })}
      </Card>
    </div>
  );
}
