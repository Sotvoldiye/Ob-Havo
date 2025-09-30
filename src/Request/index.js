export const cities = ["London", "New York", "Tokyo", "Sydney", "Cairo","Tashkent", "Fergana"];

const API_KEY = "53157b6f30aa54d7005e13b012938bf4";

let lastApiCallTime = 0;

export async function getCountryWeather(city) {
  const now = Date.now();
  const THROTTLE_INTERVAL = 5000;

  if (now - lastApiCallTime < THROTTLE_INTERVAL) {
    return Promise.reject(new Error("Iltimos, API chaqiruvlari orasida 5 soniyadan kam vaqt bo‘lmasin"));
  }

  lastApiCallTime = now;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    throw new Error(`Ma'lumotni olishda xatolik yuz berdi: ${error.message}`);
  }
}
