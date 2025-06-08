export default function SVGGrafik({ grafik }) {
  const days = [];
  const wind = [];
  const todayStr = new Date().toISOString().split("T")[0];
  days.push(grafik[todayStr]);

  days.forEach((d) => {
    d.forEach((p) => {
      wind.push(p.wind);
    });
  });

  console.log(wind);
  const windSpeeds = wind.map((item) => item.speed).filter(Boolean);

  if (windSpeeds.length === 0) return <div>Bugungi ma'lumot yo‘q</div>;

  const maxSpeed = Math.max(...windSpeeds, 10);
  const marginLeft = 30;
  const marginRight = 30;
  const chartWidth = 500 - marginLeft - marginRight;
  const svgWidth = chartWidth + marginLeft + marginRight;
  const chartHeight = 200;
  const stepX = chartWidth / (windSpeeds.length - 1 || 1);

  const points = windSpeeds
    .map((speed, i) => {
      const x = marginLeft + i * stepX;
      const y = chartHeight - (speed / maxSpeed) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full overflow-x-auto py-2">
      <p className="text-sm sm:text-base font-medium mb-2 text-gray-800 dark:text-gray-200 text-center sm:text-left">
        Bugungi prognoz shamol tezligi
      </p>
      <svg
        viewBox={`0 0 ${svgWidth} ${chartHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto border border-gray-300 dark:border-gray-700 rounded-md"
      >
        <polyline
          fill="none"
          stroke="blue"
          strokeWidth="2"
          points={points}
        />
        {windSpeeds.map((speed, i) => {
          const x = marginLeft + i * stepX;
          const y = chartHeight - (speed / maxSpeed) * chartHeight;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="red" />
              <text
                x={x}
                y={y - 10}
                fontSize="10"
                textAnchor="middle"
                fill="#333"
                style={{ userSelect: "none" }}
              >
                {`${speed.toFixed(1)} m/s`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
