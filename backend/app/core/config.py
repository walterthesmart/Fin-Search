from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "FinSearch API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000"]  # Frontend URL
    NEWS_API_KEY: str = ""  # Add your NewsAPI key here
    ALPHA_VANTAGE_API_KEY: str = ""  # Add your Alpha Vantage API key here

    class Config:
        env_file = ".env"

settings = Settings()
