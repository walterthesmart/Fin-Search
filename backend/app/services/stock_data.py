import yfinance as yf
from datetime import datetime, timedelta
from ..models.stock import StockPrice

class StockDataService:
    @staticmethod
    async def get_stock_data(symbol: str) -> StockPrice:
        try:
            stock = yf.Ticker(symbol)
            info = stock.info
            
            return StockPrice(
                symbol=symbol,
                price=info.get('regularMarketPrice', 0.0),
                change=info.get('regularMarketChange', 0.0),
                change_percent=info.get('regularMarketChangePercent', 0.0),
                volume=info.get('regularMarketVolume', 0),
                timestamp=datetime.now()
            )
        except Exception as e:
            raise Exception(f"Error fetching stock data: {str(e)}")
