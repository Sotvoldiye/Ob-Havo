import React, { useEffect, useState } from "react";
import { getCountryWeather } from "../../Request";
import { toast } from "react-toastify";
import WeekleyWeather from "../../components/WeekleyWeather";
import { Card, CardAction, CardContent } from "../../components/ui/card";
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
        setData(results.filter(Boolean)); // faqat valid natijalarni saqlash
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    };

    fetchWeatherData();
  }, [cities]);

  return (
    <Card
      className={`px-1 sm:px-3 py-2 sm:py-4 justify-center items-center border-none shadow-none ${style.bgImg}`}
    >
      {data?.map((cityData, id) => {
        if (!cityData?.list || cityData.list.length === 0) {
          return (
            <div key={id} className="text-red-500">
              Maʼlumot topilmadi
            </div>
          );
        }

        const averageTemp =
          cityData.list.reduce((sum, item) => sum + item.main.temp, 0) /
          cityData.list.length;

        return (
          <div key={id} className="justify-center items-center">
            <CardAction className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <div className="flex flex-col sm:justify-between mb-2 gap-1 sm:gap-2">
                    <h2 className="text-lg sm:text-xl font-semibold mb-1 text-center sm:text-left">
                      {cityData?.city?.name || "Nomaʼlum shahar"}
                    </h2>
                    <p className="text-sm sm:text-base text-center sm:text-left">
                      {cityData.list[0]?.main?.temp?.toFixed(0)}°C –{" "}
                      {cityData.list[0]?.weather?.[0]?.description}
                    </p>
                    <div className="text-xs sm:text-sm mb-1 sm:mb-2 text-center sm:text-left">
                      Bugun o'rtacha: {averageTemp.toFixed(0)}°C
                    </div>
                  </div>
                  <img
                    className="w-15 h-15"
                    src={`http://openweathermap.org/img/wn/${cityData.list[0]?.weather?.[0]?.icon}@2x.png`}
                    alt={cityData.list[0]?.weather?.[0]?.description || "weather"}
                  />
                </div>
                <CitySelector onSelect={handleCitySelect} />
              </div>

              <WeekleyWeather city={cityData.list} />
            </CardAction>
          </div>
        );
      })}
    </Card>
  );
}
