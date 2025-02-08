const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchStockData(ticker: string) {
  const response = await fetch(`${API_BASE_URL}/stocks/${ticker}`);
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }
  return response.json();
}

export async function fetchSentimentAnalysis(ticker: string) {
  const response = await fetch(`${API_BASE_URL}/sentiment/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ticker }),
  });
  if (!response.ok) {
    throw new Error("Failed to analyze sentiment");
  }
  return response.json();
}

export async function fetchNews(ticker: string) {
  const response = await fetch(`${API_BASE_URL}/news/${ticker}`);
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
}
