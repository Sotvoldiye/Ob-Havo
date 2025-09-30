import React from "react";
import DailyWeather from "./DailyWeather";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import SVGGrafik from "./SVGGrafik";

export default function WeekleyWeather({ city }) {
  const daily = {};
  city?.forEach((day) => {
    const item = day.dt_txt.split(" ")[0];
    if (!daily[item]) daily[item] = [];
    daily[item].push(day);
  });

  const weeklyData = Object.entries(daily).map(([date, items]) => {
    const avgTemp =
      items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;
    const weather = items[0].weather[0];
    const pops = items[0].pop;
    return {
      date,
      avgTemp: +avgTemp.toFixed(1),
      description: weather.description,
      icon: weather.icon,
      pops: pops,
    };
  });

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      <Card className="w-full flex flex-col justify-center items-center mt-2 sm:mt-4 rounded-xl">
        <div className="w-full px-2 sm:px-4 py-2 sm:py-3">
          <DailyWeather daily={daily} />
          <SVGGrafik grafik={daily} />
        </div>

        {/* Weekly forecast cards */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full px-2 sm:px-4 pb-3">
          <AnimatePresence mode="popLayout">
            {weeklyData.slice(0, 5).map((day) => {
              const dateDay = new Date(day.date);
              const dayName = dateDay.toLocaleDateString("en-US", {
                weekday: "long",
              });

              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <CardContent className="flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px]">
                    {/* Day Name */}
                    <h3 className="font-medium text-xs sm:text-sm text-center">
                      {day.date === todayStr ? "Today" : dayName}
                    </h3>

                    {/* Icon and Pop % */}
                    <div className="flex flex-col items-center">
                      <img
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                        alt={day.description}
                        className="w-12 h-12 sm:w-14 sm:h-14"
                      />
                      {day.pops > 0 && (
                        <p className="text-[10px] sm:text-xs text-blue-500">
                          {Math.round(day.pops * 100)}%
                        </p>
                      )}
                    </div>

                    {/* Avg Temp */}
                    <p className="w-full text-center text-xs sm:text-sm">
                      {day.avgTemp} °C
                    </p>

                    {/* Description */}
                    <p className="w-full text-xs sm:text-sm italic text-gray-500 text-center">
                      {day.description}
                    </p>
                  </CardContent>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
