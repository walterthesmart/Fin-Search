from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ...services.sentiment_analyzer import SentimentAnalyzer
from ...models.stock import SentimentAnalysis
from ...core.security import get_api_key

router = APIRouter()
analyzer = SentimentAnalyzer()


@router.post("/analyze", response_model=List[SentimentAnalysis])
async def analyze_sentiment(
    texts: List[str], api_key: str = Depends(get_api_key)
) -> List[SentimentAnalysis]:
    try:
        return await analyzer.analyze_texts(texts)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
