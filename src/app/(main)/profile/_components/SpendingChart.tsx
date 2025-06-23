import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  day: string;
  thisWeek: number;
  lastWeek: number;
}

const data: ChartData[] = [
  { day: "SUN", thisWeek: 800, lastWeek: 600 },
  { day: "MON", thisWeek: 700, lastWeek: 500 },
  { day: "TUE", thisWeek: 1340, lastWeek: 650 },
  { day: "WED", thisWeek: 500, lastWeek: 700 },
  { day: "THU", thisWeek: 600, lastWeek: 800 },
  { day: "FRI", thisWeek: 750, lastWeek: 1000 },
  { day: "SAT", thisWeek: 900, lastWeek: 850 },
];

const SpendingChart: React.FC = () => {
  return (
    <div
      style={{ width: "100%", maxWidth: 1000, margin: "auto", padding: "1rem" }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        {/* Information */}
        <div>
          <h3 className="text-gray-400">Total spent on bets</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
            $4,556
          </p>
          <p style={{ color: "green", margin: 0 }}>+12%</p>
        </div>
        {/* Dropdown */}
        <div>
          <select
            style={{
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#222",
              color: "#fff",
            }}
          >
            <option value="this-week">This week</option>
            <option value="last-week">Last week</option>
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="top" // Moves the legend to the top
              align="right" // Positions the legend to the right
            />
            <Line
              type="monotone"
              dataKey="thisWeek"
              stroke="#8884d8"
              name="This Week"
            />
            <Line
              type="monotone"
              dataKey="lastWeek"
              stroke="#82ca9d"
              name="Last Week"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
