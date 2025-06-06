import React, { useEffect, useState } from "react";
import { getCountryWeather } from "../../Request";
import { toast } from "react-toastify";
import WeekleyWeather from "../../components/WeekleyWeather";
import { Card, CardAction, CardContent } from "../../components/ui/card";

export default function WeatherCountry({cities}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cities || cities.length === 0) return;
    const fetchWeatherData = async () => {
      try {
        const results = await Promise.all(
          cities.map((city) => getCountryWeather(city))
        );
        setData(results);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    };

    fetchWeatherData();
  }, [cities]);
  return (
<Card className="flex flex-wrap gap-4 justify-center p-4 bg-white dark:bg-[#212529] shadow-md rounded-xl">
  {data.map((cityData, id) => {
    const averageTemp =
      cityData.list.reduce((sum, item) => sum + item.main.temp, 0) /
      cityData.list.length;

    return (
      <CardAction
        key={id}
        className="w-[280px] sm:w-[300px] md:w-[320px] bg-gray-100 dark:bg-[#2c2f33] text-[#212529] dark:text-[#f8f9fa] rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex flex-col px-4 py-3">
          <h2 className="text-xl font-semibold mb-1">{cityData.city.name}</h2>
          <div className="flex items-center justify-between mb-2">
            <p className="text-base">
              {cityData.list[0].main.temp.toFixed(0)}°C -{" "}
              {cityData.list[0].weather[0].description}
            </p>
            <img
              className="w-10 h-10"
              src={`http://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`}
              alt={cityData.list[0].weather[0].description}
            />
          </div>
          <div className="text-sm mb-2">
            Bugun o'rtacha: {averageTemp.toFixed(0)}°C
          </div>
        </div>
        <div className="px-4 pb-3">
          <WeekleyWeather city={cityData.list} />
        </div>
      </CardAction>
    );
  })}
</Card>

  );
}
