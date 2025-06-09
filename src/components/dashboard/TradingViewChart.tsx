import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Candle {
  time: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TradingViewChartProps {
  data: Candle[];
  height?: number;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ data, height = 400 }) => {
  // Chuyển đổi data sang dạng recharts
  const chartData = data.map(item => ({
    date: typeof item.time === 'number' ? new Date(item.time).toLocaleDateString() : item.time,
    close: item.close,
    open: item.open,
    high: item.high,
    low: item.low,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" minTickGap={30} />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} name="Giá đóng cửa" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TradingViewChart; 