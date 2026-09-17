import { LineChart, Line, ResponsiveContainer } from 'recharts';

export function Sparkline({ data, positive = true, height = 40 }) {
  const chartData = data.map((value, index) => ({ value, index }));
  const strokeColor = positive ? '#10b981' : '#ef4444';
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={1.75}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Sparkline;
