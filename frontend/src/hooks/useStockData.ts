import { useState, useEffect } from "react";
import { apiService } from "../services/api";
import { StockData } from "../services/api/types";

export function useStockData(ticker: string) {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const stockData = await apiService.getStockData(ticker);
        setData(stockData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch stock data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  return { data, loading, error };
}
