from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ...services.news_fetcher import NewsService
from ...models.stock import NewsItem
from ...core.security import get_api_key

router = APIRouter()
news_service = NewsService()


@router.get("/{symbol}", response_model=List[NewsItem])
async def get_news(symbol: str, api_key: str = Depends(get_api_key)) -> List[NewsItem]:
    try:
        return await news_service.get_company_news(symbol)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
