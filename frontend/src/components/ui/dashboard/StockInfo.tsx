import { useStockData } from "@/hooks/useStockData";

export function StockInfo({ ticker }: { ticker: string }) {
  const { data: stockData, loading, error } = useStockData(ticker);

  if (!ticker) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">
          Enter a ticker to view stock information
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Loading stock data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm text-black">
      <h2 className="text-lg font-semibold mb-4">{ticker} Overview</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-2xl font-bold">
            ${stockData?.currentPrice.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Change</p>
          <p
            className={`text-lg font-semibold ${
              stockData?.change && stockData.change >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {stockData?.change.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Volume</p>
          <p className="text-lg">{stockData?.volume.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
