import { useSentimentData } from "@/hooks/useSentimentData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function SentimentChart({ ticker }: { ticker: string }) {
  const { data: sentimentData, loading, error } = useSentimentData(ticker);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm text-black">
      <h2 className="text-lg font-semibold mb-4">Market Sentiment Analysis</h2>
      <div className="h-[400px]">
        {loading ? (
          <p className="text-gray-500">Loading sentiment data...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sentiment"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
