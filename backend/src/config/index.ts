import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  alphaVantageApiKey: process.env.ALPHA_VANTAGE_API_KEY,
  newsApiKey: process.env.NEWS_API_KEY,
  fcsApiKey: process.env.FCS_API_KEY,
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
};

console.log("Config loaded:", {
  port: config.port,
  alphaVantageApiKey: config.alphaVantageApiKey ? "Set" : "Not set",
  newsApiKey: config.newsApiKey ? "Set" : "Not set",
  fcsApiKey: config.fcsApiKey ? "Set" : "Not set",
  corsOrigin: config.cors.origin,
});

export default config;
