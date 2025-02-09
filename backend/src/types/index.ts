export interface StockData {
  currentPrice: number;
  change: number;
  volume: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  sentiment: "positive" | "negative" | "neutral";
  date: string;
}

export interface SentimentData {
  date: string;
  sentiment: number;
}
