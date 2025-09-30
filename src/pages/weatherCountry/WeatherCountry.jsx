import React, { useEffect, useState } from "react";
import { getCountryWeather } from "../../Request";
import { toast } from "react-toastify";
import WeekleyWeather from "../../components/WeekleyWeather";
import { Card, CardAction } from "../../components/ui/card";
import CitySelector from "../../components/CitySelector";
import style from "./style.module.css";

export default function WeatherCountry({ cities, handleCitySelect }) {
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
    <Card
      className={`px-2 sm:px-4 py-3 sm:py-6 flex flex-col gap-4 border-none shadow-none ${style.bgImg}`}
    >
      {data.map((cityData, id) => {
        const averageTemp =
          cityData.list.reduce((sum, item) => sum + item.main.temp, 0) /
          cityData.list.length;

        return (
          <div key={id} className="flex justify-center">
            <CardAction className="flex flex-col gap-3">
              {/* Yuqori qism */}
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Shahar nomi va ma’lumotlar */}
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3">
                  <div className="flex flex-col gap-1 text-center sm:text-left">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                      {cityData.city.name}
                    </h2>
                    <p className="text-sm sm:text-base">
                      {cityData.list[0].main.temp.toFixed(0)}°C –{" "}
                      {cityData.list[0].weather[0].description}
                    </p>
                    <div className="text-xs sm:text-sm">
                      Bugun o‘rtacha: {averageTemp.toFixed(0)}°C
                    </div>
                  </div>
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    src={`https://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`}
                    alt={cityData.list[0].weather[0].description}
                  />
                </div>

                {/* City Selector */}
                  <CitySelector onSelect={handleCitySelect} />
              </div>

              {/* Haftalik ob-havo */}
              <div className="w-full overflow-x-auto">
                <WeekleyWeather city={cityData.list} />
              </div>
            </CardAction>
          </div>
        );
      })}
    </Card>
  );
}
