import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function SVGGrafik({ grafik }) {
  const todayStr = new Date().toISOString().split("T")[0];
  const todayData = grafik?.[todayStr] || [];

  const wind = todayData
    .filter((p) => p?.wind)
    .map((p) => ({ speed: p.wind.speed, time: p.dt_txt }));

  const formatTime = (dateTimeStr) =>
    dateTimeStr ? dateTimeStr.split(" ")[1].slice(0, 5) : "";

  const windSpeeds = wind
    .map((item) => item.speed)
    .filter((speed) => typeof speed === "number" && !isNaN(speed));

  if (windSpeeds.length === 0) {
    return (
      <div className="text-center text-gray-800 dark:text-gray-200 p-4">
        Bugungi ma'lumot yo‘q
      </div>
    );
  }

  const data = {
    labels: wind.map((item, i) => formatTime(item.time) || `Nuqta ${i + 1}`),
    datasets: [
      {
        label: "Shamol tezligi (m/s)",
        data: windSpeeds,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        pointBackgroundColor: "#3b82f6",
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Shamol tezligi (m/s)",
        color: "#333",
        font: { size: 16, weight: "bold" },
        padding: { top: 10, bottom: 10 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y.toFixed(1)} m/s`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...windSpeeds, 10),
        ticks: {
          font: { size: 11 },
          padding: 5, // ✅ to‘g‘ri property
        },
      },
    },
  };

  return (
    <div className="w-full pl-7 pr-7 max-w-[1000px] min-w-[200px] h-[50vh] sm:h-[40vh] md:h-[50vh] min-h-[200px] max-h-[400px] p-4">
      <Line data={data} options={options} />
    </div>
  );
}
