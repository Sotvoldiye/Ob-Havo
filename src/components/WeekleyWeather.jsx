import React, { useEffect, useState } from "react";
import DailyWeather from "./DailyWeather";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import SVGGrafik from "./SVGGrafik";

export default function WeekleyWeather({ city }) {
  const [daily, setDaily] = useState(() => {
    // Keshdan oldingi ma'lumotlarni olish
    return JSON.parse(localStorage.getItem("weatherDaily") || "{}");
  });
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Yangi ma'lumotlarni kesh bilan birlashtirish
    const mergeDailyData = (newDaily) => {
      const cachedData = JSON.parse(localStorage.getItem("weatherDaily") || "{}");
      const updatedData = { ...cachedData };

      // Bugungi ma'lumotlarni faqat ko‘proq yoki teng bo‘lsa yangilaymiz
      if (newDaily[todayStr] && Array.isArray(newDaily[todayStr])) {
        if (!updatedData[todayStr] || newDaily[todayStr].length >= updatedData[todayStr].length) {
          updatedData[todayStr] = newDaily[todayStr];
        }
      }

      // Keshni yangilash
      localStorage.setItem("weatherDaily", JSON.stringify(updatedData));
      setDaily(updatedData);
    };

    // `city`dan `daily` ob'ektini yaratish
    const newDaily = {};
    city?.forEach((day) => {
      const item = day.dt_txt.split(" ")[0];
      if (!newDaily[item]) newDaily[item] = [];
      newDaily[item].push(day);
    });

    console.log("city:", city);
    console.log("newDaily:", newDaily);

    mergeDailyData(newDaily);
  }, [city, todayStr]);

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

  console.log("daily:", daily);
  console.log("weeklyData:", weeklyData);

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
                  <h3 className="w-full sm:w-24 font-medium text-xs sm:text-sm text-center sm:text-left">
                    {day.date === todayStr ? "Today" : dayName}
                  </h3>
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
                  <p className="w-full sm:w-14 text-center text-xs sm:text-sm">
                    {day.avgTemp} °C
                  </p>
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