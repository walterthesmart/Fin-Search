export interface StockData {
  price: number;
  change: number;
  volume: number;
  marketCap: number;
}

export interface NewsItem {
  id: number;
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
