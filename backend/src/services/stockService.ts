import axios from "axios";
import { StockData } from "../types";

export class StockService {
  private apiKey: string;
  private baseUrl = "https://www.alphavantage.co/query";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getStockInfo(ticker: string): Promise<StockData> {
    try {
      const response = await axios.get(
        `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${this.apiKey}`
      );

      const quote = response.data["Global Quote"];

      if (!quote) {
        throw new Error("No data available");
      }

      return {
        currentPrice: parseFloat(quote["05. price"]),
        change: parseFloat(quote["10. change percent"].replace("%", "")),
        volume: parseInt(quote["06. volume"]),
      };
    } catch (error) {
      console.error("Alpha Vantage API error:", error);
      throw new Error("Failed to fetch stock data");
    }
  }
}
