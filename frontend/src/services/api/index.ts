import { API_BASE_URL } from "./config";
import { StockData, NewsItem, SentimentData } from "./types";

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add these options for CORS
        mode: "cors",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  async getStockData(ticker: string): Promise<StockData> {
    if (!ticker) {
      throw new Error("Ticker is required");
    }
    return this.fetchApi<StockData>(`/stock/${ticker}`);
  }

  async getNews(ticker: string): Promise<NewsItem[]> {
    if (!ticker) {
      throw new Error("Ticker is required");
    }
    return this.fetchApi<NewsItem[]>(`/news/${ticker}`);
  }

  async getSentimentData(ticker: string): Promise<SentimentData[]> {
    if (!ticker) {
      throw new Error("Ticker is required");
    }
    return this.fetchApi<SentimentData[]>(`/sentiment/${ticker}`);
  }
}

export const apiService = new ApiService();
