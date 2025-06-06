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
    <Card className="flex items-center pb-0">
      {data.map((cityData, id) => {
        const averageTemp = cityData.list.reduce((sum, item) => sum + item.main.temp, 0) / cityData.list.length;
        return (
          <CardAction key={id} className="">
            <div className="flex flex-col px-4">
              <h2 className="text-[30px]">{cityData.city.name}</h2>
              <div className="flex  items-center gap-6">
                <p>
                  {cityData.list[0].main.temp.toFixed(0)}°C{" "}
                  {cityData.list[0].weather[0].description}
                </p>
                <div className="flex items-center">
                  Today {averageTemp.toFixed(0)}°C
                  <img
                    className="w-[34px] p-0 m-0"
                    src={`http://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`}
                    alt={cityData.list[0].weather[0].description}
                  />
                  {}
                </div>
              </div>
            </div>
            <WeekleyWeather city={cityData.list}/>

          </CardAction>
        );
      })}
    </Card>
  );
}
