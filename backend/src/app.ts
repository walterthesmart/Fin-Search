import express from "express";
import cors from "cors";
import { config } from "./config";
import { StockService } from "./services/stockService";
import { NewsService } from "./services/newsService";

const app = express();

// More detailed CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", config.cors.origin],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Log CORS and server configuration on startup
console.log("Server Configuration:", {
  port: config.port,
  corsOrigin: config.cors.origin,
  environment: process.env.NODE_ENV,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
);

// Test route with detailed response
app.get("/api/test", (_, res) => {
  try {
    res.json({
      message: "Backend is working!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: "1.0.0",
    });
  } catch (error) {
    console.error("Test route error:", error);
    res.status(500).json({ error: "Test route failed" });
  }
});

// Stock data route
app.get("/api/stock/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    console.log(`Fetching stock data for: ${ticker}`);

    const stockData = await StockService.getStockData(ticker);
    console.log(`Stock data retrieved for ${ticker}:`, stockData);

    res.json(stockData);
  } catch (error) {
    console.error(`Stock data error for ${req.params.ticker}:`, error);
    res.status(500).json({
      error: "Failed to fetch stock data",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// News route
app.get("/api/news/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    console.log(`Fetching news for: ${ticker}`);

    const newsData = await NewsService.getNews(ticker);
    console.log(`News data retrieved for ${ticker}, count:`, newsData.length);

    res.json(newsData);
  } catch (error) {
    console.error(`News data error for ${req.params.ticker}:`, error);
    res.status(500).json({
      error: "Failed to fetch news data",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Sentiment data route
app.get("/api/sentiment/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    console.log(`Fetching sentiment data for: ${ticker}`);

    const sentimentData = await StockService.getSentimentData(ticker);
    console.log(`Sentiment data retrieved for ${ticker}`);

    res.json(sentimentData);
  } catch (error) {
    console.error(`Sentiment data error for ${req.params.ticker}:`, error);
    res.status(500).json({
      error: "Failed to fetch sentiment data",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check route
app.get("/api/health", (_, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Handle 404 errors
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} not found`,
  });
});

const PORT = config.port || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(
    `Accepting requests from: ${
      Array.isArray(config.cors.origin)
        ? config.cors.origin.join(", ")
        : config.cors.origin
    }`
  );
  console.log("Server environment:", process.env.NODE_ENV || "development");
});

export default app;
