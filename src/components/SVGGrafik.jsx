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

  // Load today's data into days array
  if (grafik && grafik[todayStr] && Array.isArray(grafik[todayStr])) {
    days.push(grafik[todayStr]);
  }

  // Extract wind data
  days.forEach((d) => {
    if (Array.isArray(d)) {
      d.forEach((p) => {
        if (p?.wind) {
          wind.push(p.wind);
        }
      });
    }
  });

  // Extract wind speeds, filtering valid numbers
  const windSpeeds = wind
    .map((item) => item.speed)
    .filter((speed) => typeof speed === "number" && !isNaN(speed));

  // Return message if no data
  if (windSpeeds.length === 0) {
    return <div className="text-center text-gray-800 dark:text-gray-200">Bugungi ma'lumot yo‘q</div>;
  }

  // Chart.js data configuration
  const data = {
    labels: windSpeeds.map((_, i) => `Point ${i + 1}`), // Replace with time labels if available
    datasets: [
      {
        label: "Wind Speed (m/s)",
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

  // Chart.js options
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
          text: "Time",
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...windSpeeds, 10),
        title: {
          display: true,
          text: "Wind Speed (m/s)",
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