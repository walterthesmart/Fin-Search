from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class StockPrice(BaseModel):
    symbol: str
    price: float
    change: float
    change_percent: float
    volume: int
    timestamp: datetime

class SentimentAnalysis(BaseModel):
    text: str
    sentiment: str
    score: float
    timestamp: datetime

class NewsItem(BaseModel):
    title: str
    url: str
    source: str
    published_at: datetime
    sentiment: Optional[str] = None
    summary: Optional[str] = None

class StockResponse(BaseModel):
    symbol: str
    price_data: StockPrice
    sentiment: List[SentimentAnalysis]
    news: List[NewsItem]