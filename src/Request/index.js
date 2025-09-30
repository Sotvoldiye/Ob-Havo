// import fetchWeatherMock from "./fetchWeatherMock";
export const cities = ["London","New York", "Tokyo", "Sydney", "Cairo", ];

const API_KEY = '53157b6f30aa54d7005e13b012938bf4';

let lastApiCallTime = 0; // so'nggi chaqiruv vaqti (timestamp, ms)

export async function getCountryWeather(city) {
  const now = Date.now();
  const THROTTLE_INTERVAL = 5000; // 5 soniya

  if (now - lastApiCallTime < THROTTLE_INTERVAL) {
    // 5 soniyadan kam vaqt o'tgan, chaqiruv rad etiladi
    return Promise.reject(new Error("Iltimos, API chaqiruvlari orasida 5 soniyadan kam vaqt bo‘lmasin"));
  }

  lastApiCallTime = now;

  // if (import.meta.env.MODE === "development") {
  //   return fetchWeatherMock(city);
  // }
  if(import.meta.env.MODE === "development"){
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      if (!res.ok) throw new Error("API error");
      return await res.json();
    } catch (error) {
      throw new Error(`Ma'lumotni olishda xatolik yuz berdi: ${error.message}`);
    }
  }
}
