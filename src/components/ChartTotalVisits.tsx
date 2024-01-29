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
  date: Date;
  day: string;
  month: string;
  total: number;
}

interface ChartProps {
  data: DataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const formattedDate = new Date(payload[0].payload.date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en', {
      month: 'short'
    }).format(formattedDate);

    return (
      <div className="bg-card text-card-foreground rounded-lg border bg-white p-2 shadow-sm">
        <p className="text-sm font-bold text-black">
          {month} {day}
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
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => {
            const formattedDate = new Date(date);
            const day = formattedDate.getDate().toString().padStart(2, '0');
            const month = new Intl.DateTimeFormat('en', {
              month: 'short'
            }).format(formattedDate);
            return `${month}-${day}`;
          }}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
