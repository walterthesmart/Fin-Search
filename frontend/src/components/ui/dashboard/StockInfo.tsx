interface StockInfoProps {
  ticker: string;
}

export function StockInfo({ ticker }: StockInfoProps) {
  if (!ticker) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">
          Enter a ticker to view stock information
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm text-black">
      <h2 className="text-lg font-semibold mb-4">{ticker} Overview</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-2xl font-bold">$150.23</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Change</p>
          <p className="text-lg font-semibold text-green-600">+2.5%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Volume</p>
          <p className="text-lg">1.2M</p>
        </div>
      </div>
    </div>
  );
}
