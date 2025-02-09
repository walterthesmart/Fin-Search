import axios from "axios";
import type { StockData, SentimentData } from "../types";
import { config } from "../config";

export class StockService {
  private static readonly alphaVantageApiKey: string =
    config.alphaVantageApiKey || "";
  private static readonly fcsApiKey: string = config.fcsApiKey || "";
  private static readonly alphaVantageBaseUrl =
    "https://www.alphavantage.co/query";
  private static readonly fcsBaseUrl =
    "https://fcsapi.com/api-v3/crypto/latest";

  static async getStockData(symbol: string): Promise<StockData> {
    try {
      // Check if the symbol includes '/' or is a known crypto symbol
      const isCrypto =
        symbol.includes("/") ||
        /^(BTC|ETH|XRP|DOGE|ADA)$/.test(symbol.toUpperCase());

      if (isCrypto) {
        return this.getCryptoData(symbol);
      }

      // Existing stock data logic
      const response = await axios.get(
        `${this.alphaVantageBaseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageApiKey}`
      );

      // Check for API limit messages
      if (response.data.Note || response.data["Error Message"]) {
        throw new Error(response.data.Note || response.data["Error Message"]);
      }

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
      console.error("API error:", error);
      throw new Error("Failed to fetch market data");
    }
  }

  private static async getCryptoData(symbol: string): Promise<StockData> {
    try {
      // If symbol doesn't include '/', append '/USD'
      const formattedSymbol = symbol.includes("/") ? symbol : `${symbol}/USD`;

      const response = await axios.get(
        `${this.fcsBaseUrl}?symbol=${formattedSymbol}&access_key=${this.fcsApiKey}`
      );

      // Check for API errors
      if (!response.data.response || response.data.status === false) {
        throw new Error(response.data.msg || "No crypto data available");
      }

      const cryptoData = response.data.response[0];

      return {
        currentPrice: Number.parseFloat(cryptoData.c),
        change: Number.parseFloat(cryptoData.cp.replace("%", "")),
        volume: 0, // FCS API doesn't provide volume in the latest endpoint
      };
    } catch (error) {
      console.error("FCS API error:", error);
      throw new Error("Failed to fetch crypto data");
    }
  }

  static async getSentimentData(ticker: string): Promise<SentimentData[]> {
    try {
      const response = await axios.get(
        `${this.alphaVantageBaseUrl}?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${this.alphaVantageApiKey}`
      );

      const data = response.data;

      // Check for API limit messages
      if (data.Note || data["Error Message"]) {
        console.warn(
          "Alpha Vantage API message:",
          data.Note || data["Error Message"]
        );
        return this.getFallbackSentimentData();
      }

      // Check for missing or invalid data
      if (
        !data ||
        !data.feed ||
        !Array.isArray(data.feed) ||
        data.feed.length === 0
      ) {
        console.warn("No sentiment data available for", ticker);
        return this.getFallbackSentimentData();
      }

      // Process the sentiment data with error handling
      const sentimentData: SentimentData[] = data.feed
        .filter((item: any) => item && item.time_published) // Ensure item exists and has required fields
        .map((item: any) => {
          try {
            let sentimentScore: number;

            if (item.overall_sentiment_score) {
              sentimentScore = Number.parseFloat(item.overall_sentiment_score);
            } else if (
              item.ticker_sentiment &&
              item.ticker_sentiment[0] &&
              item.ticker_sentiment[0].ticker_sentiment_score
            ) {
              sentimentScore = Number.parseFloat(
                item.ticker_sentiment[0].ticker_sentiment_score
              );
            } else {
              sentimentScore = 0.5; // Neutral sentiment as fallback
            }

            // Ensure the sentiment score is valid
            if (isNaN(sentimentScore)) {
              sentimentScore = 0.5;
            }

            // Convert to percentage and ensure it's between 0 and 100
            const sentimentPercentage = Math.min(
              Math.max(sentimentScore * 100, 0),
              100
            );

            return {
              date: new Date(item.time_published).toISOString(),
              sentiment: Number(sentimentPercentage.toFixed(2)),
            };
          } catch (err) {
            console.error("Error processing sentiment item:", err);
            return null;
          }
        })
        .filter((item: unknown): item is SentimentData => item !== null);

      // If no valid data after processing, return fallback
      if (sentimentData.length === 0) {
        return this.getFallbackSentimentData();
      }

      // Sort by date, most recent first
      sentimentData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Return the 10 most recent sentiment data points
      return sentimentData.slice(0, 10);
    } catch (error) {
      console.error("Alpha Vantage API error (Sentiment):", error);
      return this.getFallbackSentimentData();
    }
  }

  // Helper method to generate fallback sentiment data
  private static getFallbackSentimentData(): SentimentData[] {
    const fallbackData: SentimentData[] = [];
    const now = new Date();

    // Generate 10 days of neutral sentiment data
    for (let i = 0; i < 10; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      fallbackData.push({
        date: date.toISOString(),
        sentiment: 50, // Neutral sentiment
      });
    }

    return fallbackData;
  }
}
