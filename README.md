Bu Open Weather Map saytning tekin API dan foydalanib yaratilgan ob havo sayti bo'lib bu saytdagi asosiy ko'dlar src papkasida joylashgan bo'lib u papkada
src ---|main.jsx  --     /pages fayl WeatherWidget -- WeatherWidget.jsx,  weatherCountry -- WeatherDisplay.jsx
          |                           |
          |                           |
 index.css  --> theme.css           WeatherWidget.jsx        
                                      |
                                      |
                                      |
                                 /components fayl -- ui fayl shadcn freamwork i, -- CitySelector.jsx , -- DailyWeather.jsx , -- DropdownMenu.jsx , -- SVGGrafik.jsx, -- WeekleyWeather.jsx
                                   |        |
                                   |        |
                              __ __|        |__ __
                             |                    |
                             |                    |
                        CitySelector.jsx          WeatherCountry.jsx
                             |                     |            |
                             |                     |            |__ __ __ __ __ __ __
                       DropDownMenu.jsx            |                                 |
                                                WeekleyWeather                       |
                                                  |        |                         |
                                                  |        |                     Request fayl
                                             __ __|        |__ __                    |
                                            |                    |                   |
                                            |                    |                  index.js api orqali bekckendan malumot  olib kelingan
                                     DailyWeather.jsx        SVGGrafik.jsx           |
       
                                                                               fetchWeatherMock bu beckendga so'rov ni yuborishni kamaytiradi yani beckendagi malumotni o'zinda saqlaydi  

 Hooklar
WeatherWidget.jsx faylidagi 

const [selectedCity, setSelectedCity] = useState("London");
Bu hook orqali selectedCity nomli holat (state) yaratilgan. Dastlabki qiymati "London", ya’ni foydalanuvchi hech narsa tanlamasa ham, birinchi bo‘lib London shahri tanlangan bo‘ladi.

selectedCity — hozirgi tanlangan shahar nomini saqlaydi.

setSelectedCity — bu shahar nomini o‘zgartirish uchun ishlatiladigan funksiya.

📌 Amaliy vazifasi: Ob-havo ma’lumotlari aynan shu tanlangan shahar (selectedCity) asosida olinadi.


🔹 const [darkMode, setDarkMode] = useState(false);
Bu darkMode (qorong‘i rejim) uchun boolean holat yaratadi.

Dastlabki qiymati false, ya’ni yorug‘ rejim.

Foydalanuvchi qorong‘i rejimni yoqsa, bu qiymat truega o‘zgaradi.

 useEffect(() => { ... }, [darkMode]);
Bu useEffect har safar darkMode qiymati o‘zgarganda avtomatik ishlaydi.

CitySelectoer.jsx fayl

🔹 const [query, setQuery] = useState('');
Nima uchun kerak?
Bu query holati foydalanuvchi input (ya'ni qidiruv maydoni)ga yozgan matnni saqlaydi.

Qanday ishlaydi?
Foydalanuvchi har bir harf kiritganida, setQuery(value) orqali query yangilanadi. 5 soniyadan so'ng

🔹 const [filteredCities, setFilteredCities] = useState(cities);
Nima uchun kerak?
Bu filteredCities holati barcha shaharlar ro‘yxatidan foydalanuvchining yozganiga mos keladiganlarni filtrlab saqlaydi.

Dastlabki qiymati: cities — bu import qilingan barcha shaharlar ro‘yxati (masalan: ["London", "New York", "Cairo", "Tokyo"] )
va bu porps orqali DropDownMenu.jsx ga berilgan 

DropDown.jsx

🔹 const [selectedCity, setSelectedCity] = useState(options[0] || "London");
Bu hook komponentda tanlangan shaharni (selectedCity) saqlaydi.

Dastlab, agar options massivida biror shahar bo‘lsa, selectedCityga birinchi shahar (options[0]) qiymati beriladi.

Agar options bo‘sh bo‘lsa, selectedCity standart "London" qiymatiga tenglanadi.

Bu foydalanuvchiga tanlangan variantni ko‘rsatish uchun ishlatiladi.


WeatherCountry.jsx fayli

useState hooklari

const [data, setData] = useState([]);
const [error, setError] = useState(null);
data — API’dan kelgan ob-havo ma’lumotlarini saqlaydi. Boshlang‘ich qiymat — bo‘sh massiv.

error — xatolik yuz bersa, xatolik xabarini saqlaydi, dastlab null.


useEffect hook

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
useEffect faqat cities qiymati o‘zgarganda ishlaydi.

Agar cities bo‘sh yoki mavjud bo‘lmasa, hech narsa qilmaydi.

fetchWeatherData — har bir shahar uchun getCountryWeather API so‘rovi yuboradi (Promise.all bilan parallel).

So‘ng resultsni data holatiga yozadi.

Agar xatolik bo‘lsa, uni error holatiga yozadi va toast.error yordamida foydalanuvchiga ko‘rsatadi.

WeekleyWeather.jsx fayli

city ma'lumotlarini guruhlash:

const daily = {};
city?.forEach((day) => {
  const item = day.dt_txt.split(" ")[0]; // yyyy-mm-dd formatidagi sana
  if (!daily[item]) daily[item] = [];
  daily[item].push(day);
});
city — API’dan olingan soatlik yoki har 3 soatlik ob-havo ma'lumotlari ro'yxati.

Har bir elementdagi dt_txt qiymatidan faqat sanani (YYYY-MM-DD) ajratib oladi.

daily obyektida sanalar bo'yicha guruhlab, shu sanaga tegishli barcha ob-havo yozuvlarini massivga joylaydi.


Kunlik o'rtacha ob-havo hisoblash:

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
Har bir kun uchun items ichidagi barcha haroratlarni yig'ib, ularning o'rtachasini hisoblaydi.

items[0] dan birinchi ob-havo holati olinishining sababi — shu kunning ob-havo tavsifi va ikonkasini namoyish qilish uchun.

Har bir kun uchun quyidagi ma'lumotlar olinadi:

date: sana (string)

avgTemp: o'rtacha harorat (1 onlikkasiga yaxlitlangan)

description: ob-havo tavsifi (masalan, "yomg'ir")

icon: ob-havo ikonasi kodi

pops: yomg'ir ehtimoli (probability of precipitation)



Sana bilan solishtirish:
const todayStr = new Date().toISOString().split("T")[0];
Hozirgi sanani YYYY-MM-DD formatida oladi.

Bu keyin weeklyDatadagi sanalar bilan solishtirish uchun kerak, masalan, bugungi kunni "Today" deb belgilash uchun.

DailyWeather.jsx fayli

Bugungi sana aniqlash:

const todayStr = new Date().toISOString().split("T")[0];
Hozirgi sanani YYYY-MM-DD formatida oladi.

Bu format API’dan keladigan ma’lumotlardagi sanalar bilan mos keladi.


Bugungi kun ob-havo ma’lumotlarini olish:

const days = [];
days.push(daily[todayStr]);
daily — obyekt bo’lib, unda sanalar kalit sifatida, va ular qiymat sifatida shu sanaga tegishli soatlik ob-havo ma’lumotlari (massiv) joylashgan.

Shunday qilib, faqat bugungi kun ob-havo massivini days massiviga joylaydi (bu yerda faqat bitta element bo’ladi).

SVGGrafik.jsx fayli

Bugungi kun uchun ma’lumotlarni olish:

const todayStr = new Date().toISOString().split("T")[0];
const days = [];
days.push(grafik[todayStr]);
grafik obyektidan ayni bugungi kun (todayStr) uchun ma’lumotlar (odatda massiv) olinadi va days massiviga joylanadi.


Shamol ma’lumotlarini to‘plash:

const wind = [];
days.forEach((d) => {
  d.forEach((p) => {
    wind.push(p.wind);
  });
});
Bugungi kunning barcha vaqt bo‘yicha prognozlaridan (d - massiv, p - har bir prognoz obyekti) shamol (wind) obyekti olinib wind massiviga yig‘iladi.


Shamol tezliklarini ajratib olish:

const windSpeeds = wind.map((item) => item.speed).filter(Boolean);
wind massividan faqat speed qiymatlari olinadi va null yoki undefined bo‘lgan qiymatlar chiqarib tashlanadi (filter(Boolean)).


Ma’lumot yo‘qligi holatini tekshirish:

if (windSpeeds.length === 0) return <div>Bugungi ma'lumot yo‘q</div>;
Agar shamol tezliklari yo‘q bo‘lsa, foydalanuvchiga tegishli xabar chiqariladi.

 Grafik o‘lchamlarini va koordinatalarni tayyorlash:
maxSpeed — shamol tezliklari orasidagi maksimal qiymat, minimal 10 deb olinadi (grafik juda kichik bo‘lib qolmasligi uchun).

Marginlar, grafik kengligi va balandligi, va x koordinatalar oraliqlari hisoblanadi.

const maxSpeed = Math.max(...windSpeeds, 10);
const marginLeft = 30;
const marginRight = 30;
const chartWidth = 500 - marginLeft - marginRight;
const svgWidth = chartWidth + marginLeft + marginRight;
const chartHeight = 200;
const stepX = chartWidth / (windSpeeds.length - 1 || 1);


Grafik nuqtalarining koordinatalarini hisoblash:

const points = windSpeeds
  .map((speed, i) => {
    const x = marginLeft + i * stepX;
    const y = chartHeight - (speed / maxSpeed) * chartHeight;
    return `${x},${y}`;
  })
  .join(" ");
Har bir shamol tezligi uchun x va y koordinatalari SVGdagi polilineni chizish uchun tayyorlanadi.

Y koordinatasi shamol tezligi qiymatining maksimal tezlikka nisbati asosida hisoblanadi (balandlikdan pastga qarab o‘lchanadi).



 Grafik chizish va nuqtalarni belgilash:

<svg ...>
  <polyline fill="none" stroke="blue" strokeWidth="2" points={points} />
  {windSpeeds.map((speed, i) => {
    const x = marginLeft + i * stepX;
    const y = chartHeight - (speed / maxSpeed) * chartHeight;
    return (
      <g key={i}>
        <circle cx={x} cy={y} r="4" fill="red" />
        <text x={x} y={y - 10} fontSize="10" textAnchor="middle" fill="#333" style={{ userSelect: "none" }}>
          {`${speed.toFixed(1)} m/s`}
        </text>
      </g>
    );
  })}
</svg>
<polyline> — chiziqli grafik, shamol tezliklari bo‘yicha chiziq chiziladi.

Har bir nuqta uchun <circle> bilan qizil nuqta qo‘yiladi.

Nuqtalarning ustida esa shamol tezligi matn ko‘rinishida yoziladi.



 WeatherWidget ichida  CitySelector da shahar qidirsh hamda uni tanlash uchun kod yozilgan va WeatherCountry da ob havo malumotalri keltirilgan card mavjud uni ichida  WeekleyWeather bu faylda haftalik hamda cardning bir qismi joylashgan ulardan biri bugunlgilik havo pragnozlari hamda bugungai shamolni tezligi uchun grafik yasalgan ular havo pragnozlari DailyWeather.jsx va shamol grafigi SVGGrafik.jsx ichida 
 bu loyiha 4 kun ichichida yaratildi va README qismi 5 kuni yozildi
 loyihaning Front end yaratuvchisi Sotvodliyerv Ulug'bek
 beckend di esa Open Weather Map sayti