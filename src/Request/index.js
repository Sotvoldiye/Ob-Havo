import fetchWeatherMock from "./fetchWeatherMock";
export const cities = ["London","New York", "Tokyo", "Sydney", "Cairo", ];

const API_KEY = import.meta.env.VITE_BASE_URL;

export async function getCountryWeather(country) {
//   if (import.meta.env.MODE === "development") {
//     return fetchWeatherMock(country);
//   } else {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${API_KEY}&units=metric`);
      if (!res.ok) throw new Error("API error");
      return await res.json();
    } catch (error) {
      throw new Error(`Ma'lumotni olishda xatolik yuz berdi: ${error.message}`);
    }
  }
// }
