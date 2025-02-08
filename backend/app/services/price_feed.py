import asyncio
import json
import websockets
import aiohttp
from typing import Dict, Set
import yfinance as yf
from datetime import datetime

class PriceFeedService:
    def __init__(self):
        self.connections: Set[websockets.WebSocketServerProtocol] = set()
        self.prices: Dict[str, float] = {}
        self.symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA"]
        
    async def register(self, websocket: websockets.WebSocketServerProtocol):
        self.connections.add(websocket)
        await self.send_initial_prices(websocket)
        
    async def unregister(self, websocket: websockets.WebSocketServerProtocol):
        self.connections.remove(websocket)
        
    async def send_initial_prices(self, websocket: websockets.WebSocketServerProtocol):
        """Send initial price data to new connections"""
        prices = {}
        for symbol in self.symbols:
            try:
                stock = yf.Ticker(symbol)
                price = stock.info.get('regularMarketPrice', 0)
                prices[symbol] = {
                    'price': price,
                    'timestamp': datetime.now().isoformat()
                }
            except Exception as e:
                print(f"Error fetching {symbol}: {str(e)}")
                
        await websocket.send(json.dumps({
            'type': 'initial',
            'data': prices
        }))
        
    async def broadcast(self, message: dict):
        """Broadcast price updates to all connected clients"""
        if self.connections:
            await asyncio.gather(
                *[connection.send(json.dumps(message)) for connection in self.connections]
            )
            
    async def fetch_prices(self):
        """Fetch and broadcast price updates periodically"""
        while True:
            for symbol in self.symbols:
                try:
                    stock = yf.Ticker(symbol)
                    price = stock.info.get('regularMarketPrice', 0)
                    
                    if price != self.prices.get(symbol):
                        self.prices[symbol] = price
                        await self.broadcast({
                            'type': 'update',
                            'symbol': symbol,
                            'price': price,
                            'timestamp': datetime.now().isoformat()
                        })
                except Exception as e:
                    print(f"Error updating {symbol}: {str(e)}")
                    
            await asyncio.sleep(5)  # Update every 5 seconds
            
    async def handler(self, websocket: websockets.WebSocketServerProtocol):
        """Handle new WebSocket connections"""
        await self.register(websocket)
        try:
            await websocket.wait_closed()
        finally:
            await self.unregister(websocket)
            
    def start(self):
        """Start the price feed service"""
        return websockets.serve(self.handler, "localhost", 8765)