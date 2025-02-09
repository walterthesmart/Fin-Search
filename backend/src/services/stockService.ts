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

      if (!response.data.response) {
        throw new Error("No crypto data available");
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
          sentiment: Number(sentimentScore * 100).toFixed(2), // Convert to percentage
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
