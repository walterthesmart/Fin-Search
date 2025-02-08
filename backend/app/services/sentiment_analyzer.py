from transformers import pipeline
from typing import List, Dict
from datetime import datetime
from ..models.stock import SentimentAnalysis


class SentimentAnalyzer:
    def __init__(self):
        self.model_name = "mrm8488/distilroberta-finetuned-financial-news-sentiment"
        self.sentiment_pipeline = pipeline("sentiment-analysis", model=self.model_name)

    async def analyze_texts(self, texts: List[str]) -> List[SentimentAnalysis]:
        results = []
        for text in texts:
            analysis = self.sentiment_pipeline(text)[0]
            results.append(
                SentimentAnalysis(
                    text=text,
                    sentiment=analysis["label"],
                    score=float(analysis["score"]),
                    timestamp=datetime.now(),
                )
            )
        return results
