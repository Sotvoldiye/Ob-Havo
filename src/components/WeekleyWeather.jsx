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
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-2 sm:px-4">
      <Card className="w-full flex flex-col justify-center items-center mt-2 sm:mt-4 bg-white dark:bg-[#2c2f33] text-[#212529] dark:text-[#f8f9fa] rounded-xl">
        <div className="w-full px-2 sm:px-4 py-2 sm:py-3">
          <DailyWeather daily={daily} />
          <SVGGrafik grafik={daily} />
        </div>

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
                className="w-full"
              >
                <CardContent className="flex sm:flex-row items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4 py-2 border-b dark:border-gray-700 last:border-none">
                  {/* Day Name */}
                  <h3 className="w-full sm:w-24 font-medium text-xs sm:text-sm text-center sm:text-left">
                    {day.date === todayStr ? "Today" : dayName}
                  </h3>

                  {/* Icon and Pop % */}
                  <div className="flex flex-col items-center w-full sm:w-16">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.description}
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                    {day.pops > 0 && (
                      <p className="text-[10px] sm:text-xs text-blue-500">
                        {Math.round(day.pops * 100)}%
                      </p>
                    )}
                  </div>

                  {/* Avg Temp */}
                  <p className="w-full sm:w-14 text-center text-xs sm:text-sm">
                    {day.avgTemp} K
                  </p>

                  {/* Description */}
                  <p className="w-full sm:flex-1 text-xs sm:text-sm italic text-gray-500 dark:text-gray-300 text-center sm:text-left">
                    {day.description}
                  </p>
                </CardContent>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Card>
    </div>
  );
}
