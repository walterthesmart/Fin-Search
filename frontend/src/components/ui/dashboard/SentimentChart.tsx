import React, { useEffect, useRef, memo } from "react";
import { useSentimentData } from "@/hooks/useSentimentData";

const TradingViewWidget = memo(({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTradingView = () => {
      if (container.current) {
        // Create container div for widget
        const widgetContainer = document.createElement("div");
        widgetContainer.className = "tradingview-widget-container__widget";
        container.current.appendChild(widgetContainer);

        // Format symbol
        const formattedSymbol = symbol.includes("/")
          ? `BINANCE:${symbol.replace("/", "")}`
          : `NASDAQ:${symbol}`;

        // Load TradingView widget
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

        // Configure widget
        const config = {
          width: "100%",
          height: "600",
          symbol: formattedSymbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          support_host: "https://www.tradingview.com",
        };

        script.text = JSON.stringify(config);
        container.current.appendChild(script);
      }
    };

    // Clean up previous content
    if (container.current) {
      container.current.innerHTML = "";
    }

    // Delay widget loading slightly to ensure DOM is ready
    const timer = setTimeout(loadTradingView, 100);

    return () => {
      clearTimeout(timer);
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-sm overflow-hidden">
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
});

TradingViewWidget.displayName = "TradingViewWidget";

export function SentimentChart({ ticker }: { ticker: string }) {
  const { data: sentimentData, loading, error } = useSentimentData(ticker);

  if (!ticker) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Enter a ticker to view chart</p>
      </div>
    );
  }

  // Create chart container even while loading
  return (
    <div className="space-y-6">
      <TradingViewWidget symbol={ticker} />
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Market Sentiment Score</h3>
        {loading ? (
          <p className="text-gray-500">Loading sentiment data...</p>
        ) : error ? (
          <p className="text-red-500">
            Unable to load sentiment data. Using chart analysis only.
          </p>
        ) : sentimentData && sentimentData.length > 0 ? (
          <>
            <div className="text-2xl font-bold text-blue-600">
              {sentimentData[0].sentiment}%
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Latest sentiment score based on news and market analysis
            </p>
          </>
        ) : (
          <p className="text-gray-500">No sentiment data available</p>
        )}
      </div>
    </div>
  );
}

export default SentimentChart;
