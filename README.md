# AI-Powered Financial Research Tool 🚀📊

A comprehensive financial analysis platform that combines real-time market data with state-of-the-art AI models from Hugging Face to provide actionable market insights and research capabilities.

## Features

- **Real-time Market Analysis** - Integration with multiple data sources for comprehensive market coverage
- **AI-Powered Sentiment Analysis** - Advanced NLP models to analyze news and social media sentiment
- **Automated Report Generation** - Intelligent summarization of earnings calls and financial reports
- **Event Detection** - Real-time monitoring of significant market events using Named Entity Recognition
- **Interactive Dashboard** - Streamlit-based visualization of market insights and sentiment analysis

## Architecture

### Data Sources
- Market Data: Alpha Vantage, Yahoo Finance, Polygon
- News & Sentiment: NewsAPI, GDELT, Reddit/Twitter API
- Fundamentals: SEC EDGAR, Quandl, EOD Historical
- Alternative Data: CryptoCompare, Glassnode

### AI Models (Hugging Face)
- Sentiment Analysis: ProsusAI/finbert, distilroberta-finetuned-financial-news-sentiment
- Text Summarization: facebook/bart-large-cnn, google/pegasus-xsum
- Named Entity Recognition: dslim/bert-base-NER
- Time-Series Forecasting: huggingface/autonlp-timeseries-1
- Question Answering: deepset/roberta-base-squad2

## Installation

```bash
# Clone the repository
git clone https://github.com/walterthesmart/Fin-Search.git
cd Fin-Search

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Quick Start

1. Set up your environment variables:
```bash
export HUGGINGFACE_API_KEY="your_key_here"
export ALPHA_VANTAGE_API_KEY="your_key_here"
export NEWS_API_KEY="your_key_here"
```

2. Run the sentiment analysis dashboard:
```bash
streamlit run app/dashboard.py
```

3. Access the dashboard at `http://localhost:8501`

## Usage Examples

### Sentiment Analysis
```python
from pipelines.sentiment import analyze_sentiment

# Analyze sentiment for a specific ticker
sentiments = analyze_sentiment("AAPL")
print(f"Sentiment Analysis Results: {sentiments}")
```

### Earnings Call Summary
```python
from pipelines.summarization import summarize_earnings_call

# Summarize an earnings call transcript
summary = summarize_earnings_call("path_to_transcript.txt")
print(f"Summary: {summary}")
```

## Project Structure
```
.
├── data/                   # Historical datasets
├── models/                 # Fine-tuned Hugging Face models
├── pipelines/
│   ├── sentiment.py        # News sentiment analysis
│   ├── summarization.py    # Earnings call summaries
│   └── forecasting.py      # Time-series predictions
├── app/                    # Streamlit/FastAPI frontend
├── Dockerfile              # Containerization
└── requirements.txt
```

## Deployment

The application can be deployed using Docker:

```bash
# Build Docker image
docker build -t Fin-Search .

# Run container
docker run -p 8501:8501 Fin-Search
```

## Important Notes

### Challenges & Mitigations
- **Latency**: Optimized with distilled models for real-time analysis
- **Data Quality**: Combined with technical indicators for validation
- **Model Accuracy**: Implemented fact-checking layer using SEC data
- **Compliance**: Focus on research insights rather than direct trading signals

### Regulatory Compliance
This tool is designed for research purposes only. Users should:
- Consult with legal advisors before deployment
- Ensure compliance with financial regulations
- Not rely solely on this tool for trading decisions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Hugging Face for providing state-of-the-art NLP models
- Various data providers for financial market data
- Open-source community for tools and libraries

## Contact

Your Name - [@kudiegomoney](https://twitter.com/kudiegomoney)
Project Link: [https://github.com/walterthesmart/Fin-Search](https://github.com/walterthesmartFin-Search)

![alt text](<WhatsApp Image 2025-02-09 at 16.35.28_5d8654fa-1.jpg>)