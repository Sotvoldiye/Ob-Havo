// SVGGrafik.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

export default function SVGGrafik({ grafik }) {
  const days = [];
  const wind = [];
  const todayStr = new Date().toISOString().split("T")[0];

  console.log("grafik:", grafik);
  console.log("todayStr:", todayStr);

  // Bugungi ma'lumotlarni days massiviga yuklash
  if (grafik && grafik[todayStr] && Array.isArray(grafik[todayStr])) {
    days.push(grafik[todayStr]);
  }

  console.log("days:", days);

  // Shamol ma'lumotlarini olish
  days.forEach((d) => {
    if (Array.isArray(d)) {
      d.forEach((p) => {
        if (p?.wind) {
          wind.push({ speed: p.wind.speed, time: p.time }); // Vaqtni ham saqlaymiz
        }
      });
    }
  });

  console.log("wind:", wind);

  // Shamol tezligini olish va filtr qilish
  const windSpeeds = wind
    .map((item) => item.speed)
    .filter((speed) => typeof speed === "number" && !isNaN(speed));

  console.log("windSpeeds:", windSpeeds);

  // Ma'lumot yo‘q bo‘lsa xabar
  if (windSpeeds.length === 0) {
    return <div className="text-center text-gray-800 dark:text-gray-200">Bugungi ma'lumot yo‘q</div>;
  }

  // Chart.js ma'lumotlari
  const data = {
    labels: wind.map((item) => item.time || `Nuqta ${wind.indexOf(item) + 1}`), // Vaqt yoki standart yorliq
    datasets: [
      {
        label: "Shamol tezligi (m/s)",
        data: windSpeeds,
        borderColor: "#3b82f6",
        backgroundColor: "#ef4444",
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // Chart.js sozlamalari
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Bugungi prognoz shamol tezligi",
        color: "#333",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y.toFixed(1)} m/s`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Vaqt",
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...windSpeeds, 10),
        title: {
          display: true,
          text: "Shamol tezligi (m/s)",
        },
      },
    },
  };

  return (
    <div className="w-full h-[250px] py-2">
      <Line data={data} options={options} />
    </div>
  );
}