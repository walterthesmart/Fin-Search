from fastapi import APIRouter
from .endpoints import stocks, sentiment, news

api_router = APIRouter()
api_router.include_router(stocks.router, prefix="/stocks", tags=["stocks"])
api_router.include_router(sentiment.router, prefix="/sentiment", tags=["sentiment"])
api_router.include_router(news.router, prefix="/news", tags=["news"])
