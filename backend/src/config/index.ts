import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  alphaVantageApiKey: process.env.ALPHA_VANTAGE_API_KEY,
  newsApiKey: process.env.NEWS_API_KEY,
  cors: {
    origin: "http://localhost:3000", // Your Next.js frontend URL
    credentials: true,
  },
};
