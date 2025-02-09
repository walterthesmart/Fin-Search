import { useState, useEffect } from "react";
import { apiService } from "../services/api";
import { SentimentData } from "../services/api/types";

export function useSentimentData(ticker: string) {
  const [data, setData] = useState<SentimentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const sentimentData = await apiService.getSentimentData(ticker);
        setData(sentimentData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch sentiment data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  return { data, loading, error };
}
