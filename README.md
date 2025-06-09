OpenWeatherMap Asosidagi Ob-Havo Ilovasi
Loyihaning maqsadi
Ushbu loyiha OpenWeatherMap API yordamida yaratildi va foydalanuvchilarga shahar bo‘yicha kunlik hamda haftalik ob-havo prognozlarini ko‘rsatishga mo‘ljallangan. Ilovada shahar tanlash, ob-havoni grafik tarzda ko‘rsatish, shuningdek qorong‘i va yorug‘ rejimlar mavjud.

Texnologiyalar
React 18+

OpenWeatherMap API (forecast endpoint)

shadcn/UI (komponentlar uchun)

JavaScript (ES6+)

CSS / Tailwindcss

fetch API (ma’lumot olish uchun)

Loyihaning tuzilishi
bash
Копировать
Редактировать
src/
├── main.jsx             # Ilovaning kirish nuqtasi
├── index.css            # Global uslublar
├── theme.css            # Yorug‘ / qorong‘i rejim uchun CSS
├── pages/
│   ├── WeatherWidget.jsx       # Asosiy widget, state va hooklar shu yerda
│   ├── WeatherDisplay.jsx      # Ob-havo ma’lumotlarini ko‘rsatish uchun komponent
│
├── components/
│   ├── ui/                    # shadcn framework elementlari
│   ├── CitySelector.jsx       # Shahar qidirish va tanlash komponenti
│   ├── DailyWeather.jsx       # Kunlik ob-havo ma’lumotlarini ko‘rsatish
│   ├── DropdownMenu.jsx       # Dropdown menyu uchun komponent
│   ├── SVGGrafik.jsx          # Shamol tezligi grafikasi
│   └── WeekleyWeather.jsx     # Haftalik ob-havo ko‘rsatuvchi komponent
│
└── request/
    ├── index.js              # API ga so‘rovlar yuborish va ma’lumot olish logikasi
    └── fetchWeatherMock.js   # Mock ma’lumotlar (API chaqiruvlarni kamaytirish uchun)
Loyihaning asosiy funksional imkoniyatlari
Shahar tanlash — foydalanuvchi istalgan shaharning nomini qidirish va tanlash imkoniyati.

Ob-havo ma’lumotlari — OpenWeatherMap API dan kunlik va haftalik ob-havo prognozlarini olish.

Qorong‘i va yorug‘ rejimlar — foydalanuvchi interfeysini qorong‘i yoki yorug‘ ranglarda ko‘rish.

Shamol tezligi grafigi — bugungi kun uchun soatlik shamol tezligi o‘zgarishini grafik tarzda ko‘rsatish.

Xatoliklarni boshqarish — API so‘rovlarida yuzaga kelgan muammolarni foydalanuvchiga bildirish.

Local state va hooklar — React useState, useEffect yordamida holatni boshqarish.

Qanday ishlaydi
Ilova yuklanganda, dastlab London shahari tanlangan bo‘ladi.

Foydalanuvchi qidiruv orqali yoki dropdown menyudan boshqa shaharni tanlashi mumkin.

Tanlangan shahar bo‘yicha OpenWeatherMap API ga so‘rov yuboriladi va ob-havo ma’lumotlari olinadi.

Kunlik va haftalik ob-havo, shuningdek shamol tezligi grafigi ko‘rsatiladi.

Foydalanuvchi qorong‘i va yorug‘ rejimni yoqishi mumkin, bu darkMode holati orqali boshqariladi.

Loyihani ishga tushirish
OpenWeatherMap saytidan API kalitini oling: https://openweathermap.org/api

Loyihani klon qiling yoki yuklab oling.

.env fayl yaratib unga quyidagicha API kalitini yozing:

ini
Копировать
Редактировать
REACT_APP_WEATHER_API_KEY=your_api_key_here
Terminalda:

bash
Копировать
Редактировать
npm install
npm start
Brauzerda http://localhost:3000 manzilini oching.

Kelajakdagi rejalashtirilgan funksiyalar
Ob-havo ma’lumotlarini cache qilish va offline rejim qo‘llab-quvvatlash.

Ko‘proq interaktivlik — masalan, vaqtni tanlash, ogohlantirishlar.

Ko‘p tillilik (internationalization).

Foydalanuvchi shaxsiy sozlamalari.

Muallif va litsenziya
Loyiha muallifi: Sotvodliyerv Ulug‘bek

Frontend ishlab chiqilgan va boshqarilgan.

Backend: OpenWeatherMap API xizmatidan foydalanilgan.

