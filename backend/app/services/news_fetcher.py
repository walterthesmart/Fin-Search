import httpx
from typing import List
from datetime import datetime, timedelta
from ..models.stock import NewsItem
from ..core.config import settings

class NewsService:
    def __init__(self):
        self.api_key = settings.NEWS_API_KEY
        self.base_url = "https://newsapi.org/v2"

    async def get_company_news(self, symbol: str) -> List[NewsItem]:
        async with httpx.AsyncClient() as client:
            params = {
                "apiKey": self.api_key,
                "q": symbol,
                "language": "en",
                "sortBy": "publishedAt",
                "from": (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
            }
            
            response = await client.get(f"{self.base_url}/everything", params=params)
            response.raise_for_status()
            data = response.json()
            
            return [
                NewsItem(
                    title=article["title"],
                    url=article["url"],
                    source=article["source"]["name"],
                    published_at=datetime.fromisoformat(article["publishedAt"].replace("Z", "+00:00")),
                    summary=article.get("description")
                )
                for article in data["articles"][:10]  # Get top 10 news items
            ]
