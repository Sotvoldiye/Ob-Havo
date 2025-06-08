import React, { useEffect, useState } from "react";
import { getCountryWeather } from "../../Request";
import { toast } from "react-toastify";
import WeekleyWeather from "../../components/WeekleyWeather";
import { Card, CardAction, CardContent } from "../../components/ui/card";

export default function WeatherCountry({cities}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  console.log(data)
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
<Card className="px-1 sm:px-3 py-2 sm:py-4 bg-white dark:bg-[#212529] shadow-md rounded-xl w-full">
  {data.map((cityData, id) => {
    const averageTemp =
      cityData.list.reduce((sum, item) => sum + item.main.temp, 0) /
      cityData.list.length;

    return (
      <CardAction
        key={id}
        className="w-full block bg-gray-100 dark:bg-[#2c2f33] text-[#212529] dark:text-[#f8f9fa] rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-4"
      >
        <div className="flex flex-col px-2 py-2 sm:px-4 sm:py-3">
          <h2 className="text-lg sm:text-xl font-semibold mb-1 text-center sm:text-left">
            {cityData.city.name}
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-2">
            <p className="text-sm sm:text-base text-center sm:text-left">
              {cityData.list[0].main.temp.toFixed(0)}°C –{" "}
              {cityData.list[0].weather[0].description}
            </p>
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 mx-auto sm:mx-0"
              src={`http://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`}
              alt={cityData.list[0].weather[0].description}
            />
          </div>

          <div className="text-xs sm:text-sm mb-1 sm:mb-2 text-center sm:text-left">
            Bugun o'rtacha: {averageTemp.toFixed(0)}°C
          </div>
        </div>

        <div className="w-full px-2 sm:px-4 pb-2 sm:pb-3">
          <WeekleyWeather city={cityData.list} />
        </div>
      </CardAction>
    );
  })}
</Card>




  );
}
