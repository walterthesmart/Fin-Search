"use client";

import { useState } from "react";
import { SearchForm } from "../forms/SearchForm";
import { SentimentChart } from "./SentimentChart";
import { StockInfo } from "./StockInfo";
import { NewsFeeds } from "./NewsFeeds";

export default function Dashboard() {
  const [ticker, setTicker] = useState("");

  return (
    <div className="space-y-6 mt-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Financial Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor market sentiment and stock performance
        </p>
      </div>

      <SearchForm onSearch={setTicker} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SentimentChart ticker={ticker} />
        </div>
        <div>
          <StockInfo ticker={ticker} />
        </div>
      </div>

      <NewsFeeds ticker={ticker} />
    </div>
  );
}
