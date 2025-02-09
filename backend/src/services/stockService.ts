import axios from "axios";
import type { StockData, SentimentData } from "../types";
import { config } from "../config";

export class StockService {
  private static apiKey: string = config.alphaVantageApiKey || "";
  private static baseUrl = "https://www.alphavantage.co/query";

  static async getStockData(ticker: string): Promise<StockData> {
    try {
      const response = await axios.get(
        `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${this.apiKey}`
      );

      const quote = response.data["Global Quote"];

      if (!quote) {
        throw new Error("No data available");
      }

      return {
        currentPrice: Number.parseFloat(quote["05. price"]),
        change: Number.parseFloat(quote["10. change percent"].replace("%", "")),
        volume: Number.parseInt(quote["06. volume"]),
      };
    } catch (error) {
      console.error("Alpha Vantage API error:", error);
      throw new Error("Failed to fetch stock data");
    }
  }

  static async getSentimentData(ticker: string): Promise<SentimentData[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${this.apiKey}`
      );

      const data = response.data;

      if (!data || !data.feed) {
        throw new Error("No sentiment data available");
      }

      // Process the sentiment data
      const sentimentData: SentimentData[] = data.feed.map((item: any) => {
        // Calculate an overall sentiment score
        const sentimentScore = item.overall_sentiment_score
          ? Number.parseFloat(item.overall_sentiment_score)
          : (Number.parseFloat(
              item.ticker_sentiment[0].ticker_sentiment_score
            ) +
              Number.parseFloat(item.ticker_sentiment[0].relevance_score)) /
            2;

        return {
          date: new Date(item.time_published).toISOString(),
          sentiment: sentimentScore,
        };
      });

      // Sort by date, most recent first
      sentimentData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Return the 10 most recent sentiment data points
      return sentimentData.slice(0, 10);
    } catch (error) {
      console.error("Alpha Vantage API error (Sentiment):", error);
      throw new Error("Failed to fetch sentiment data");
    }
  }
}
