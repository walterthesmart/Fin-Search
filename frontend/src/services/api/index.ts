import { API_BASE_URL } from "./config";
import { StockData, NewsItem, SentimentData } from "./types";

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`API Error:`, error);
      throw error;
    }
  }

  async getStockData(ticker: string): Promise<StockData> {
    return this.fetchApi<StockData>(`/stock/${ticker}`);
  }

  async getNews(ticker: string): Promise<NewsItem[]> {
    return this.fetchApi<NewsItem[]>(`/news/${ticker}`);
  }

  async getSentimentData(ticker: string): Promise<SentimentData[]> {
    return this.fetchApi<SentimentData[]>(`/sentiment/${ticker}`);
  }
}

export const apiService = new ApiService();
