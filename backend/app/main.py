from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
import asyncio
from .api.router import api_router
from services.price_feed import PriceFeedService


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize price feed service
price_feed = PriceFeedService()

@app.on_event("startup")
async def startup_event():
    # Start WebSocket server
    websocket_server = price_feed.start()
    asyncio.create_task(websocket_server)
    # Start price update task
    asyncio.create_task(price_feed.fetch_prices())

# ... (keep existing endpoints)