import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

interface SentimentChartProps {
  ticker: string;
}

export function SentimentChart({ ticker }: SentimentChartProps) {
  const data = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      sentiment: Math.random() * 100,
    })).reverse();
  }, [ticker]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm text-black">
      <h2 className="text-lg font-semibold mb-4">Market Sentiment Analysis</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sentiment" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
