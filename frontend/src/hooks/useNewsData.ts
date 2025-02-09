import { useState, useEffect } from "react";
import { apiService } from "../services/api";
import { NewsItem } from "../services/api/types";

export function useNewsData(ticker: string) {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const newsData = await apiService.getNews(ticker);
        setData(newsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch news data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  return { data, loading, error };
}
