import { weeklyChartData, weeklyChartLabels } from "../data/dashboard";

export default function BarChart() {
  const max = Math.max(...weeklyChartData);

  return (
    <div className="bar-chart" id="barChart">
      {weeklyChartData.map((value, i) => (
        <div
          key={weeklyChartLabels[i]}
          className={`bar${i === weeklyChartData.length - 1 ? " highlight" : ""}`}
          style={{ height: `${(value / max) * 100}%` }}
          title={`${value} aulas — ${weeklyChartLabels[i]}`}
        >
          <span className="bar-label">{weeklyChartLabels[i]}</span>
        </div>
      ))}
    </div>
  );
}
