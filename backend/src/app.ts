import express from "express";
import cors from "cors";
import { config } from "./config";
import { StockService } from "./services/stockService";
import { NewsService } from "./services/newsService";

const app = express();

app.use(
  cors({
    origin: config.cors.origin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: config.cors.credentials,
  })
);

console.log("CORS configuration:", {
  origin: config.cors.origin,
  credentials: config.cors.credentials,
});

app.use(express.json());

// Test route
app.get("/api/test", (_, res) => {
  res.json({ message: "Backend is working!" });
});

// Stock data route
app.get("/api/stock/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const stockData = await StockService.getStockData(ticker);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// News route
app.get("/api/news/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const newsData = await NewsService.getNews(ticker);
    res.json(newsData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news data" });
  }
});

// Sentiment data route
app.get("/api/sentiment/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const sentimentData = await StockService.getSentimentData(ticker);
    res.json(sentimentData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sentiment data" });
  }
});

const PORT = config.port || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
