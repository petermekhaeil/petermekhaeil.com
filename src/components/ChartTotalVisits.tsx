import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  date: string;
  total: number;
}

interface ChartProps {
  data: DataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card text-card-foreground rounded-lg border bg-white p-2 shadow-sm">
        <p className="text-sm font-bold text-black">
          {payload[0].payload.date}
        </p>
        <p className="text-sm text-black">{`${payload[0].value} page visits`}</p>
      </div>
    );
  }
  return null;
};

export const ChartTotalVisits: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="total"
          activeDot={{
            r: 6,
            style: { fill: 'hsl(220.9 39.3% 11%)', opacity: 0.25 }
          }}
          style={{
            stroke: 'hsl(220.9 39.3% 11%)'
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
