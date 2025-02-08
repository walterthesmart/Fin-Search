from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ...services.stock_data import StockDataService
from ...models.stock import StockResponse, StockPrice
from ...core.security import get_api_key

router = APIRouter()


@router.get("/{symbol}", response_model=StockPrice)
async def get_stock_data(
    symbol: str, api_key: str = Depends(get_api_key)
) -> StockPrice:
    try:
        return await StockDataService.get_stock_data(symbol)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
