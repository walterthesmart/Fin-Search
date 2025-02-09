import { useStockData } from "@/hooks/useStockData";

export function StockInfo({ ticker }: { ticker: string }) {
  const { data: stockData, loading, error } = useStockData(ticker);

  if (!ticker) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">
          Enter a stock symbol or crypto pair (e.g., BTC/USD)
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Loading market data...</p>
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

  const isCrypto = ticker.includes('/') || /^(BTC|ETH|XRP|DOGE|ADA)$/.test(ticker.toUpperCase());
  const title = isCrypto ? "Crypto Price" : "Stock Price";

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm text-black">
      <h2 className="text-lg font-semibold mb-4">{ticker.toUpperCase()} {title}</h2>
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
        {!isCrypto && (
          <div>
            <p className="text-sm text-gray-500">Volume</p>
            <p className="text-lg">{stockData?.volume.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}