import axios from 'axios';
import { NewsItem } from '../types';

export class NewsService {
  private apiKey: string;
  private baseUrl = 'https://newsapi.org/v2';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getNews(ticker: string): Promise<NewsItem[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/everything?q=${ticker}+stock&language=en&sortBy=publishedAt&apiKey=${this.apiKey}`
      );

      return response.data.articles.slice(0, 10).map((article: any, index: number) => ({
        id: index.toString(),
        title: article.title,
        source: article.source.name,
        url: article.url,
        sentiment: this.analyzeSentiment(article.title),
        date: new Date(article.publishedAt).toISOString(),
      }));
    } catch (error) {
      console.error('News API error:', error);
      throw new Error('Failed to fetch news');
    }
  }

  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['surge', 'gain', 'up', 'rise', 'growth', 'profit', 'bull', 'boost'];
    const negativeWords = ['loss', 'down', 'fall', 'decline', 'debt', 'bear', 'crash', 'risk'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
}