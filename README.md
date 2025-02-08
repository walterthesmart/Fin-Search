# FinSearch

An AI-powered financial research tool that combines Hugging Face models with real-world financial data sources.

## Features

- Real-time sentiment analysis of financial news
- Earnings call summarization
- Named Entity Recognition for financial events
- Time-series forecasting for stocks and crypto
- Interactive dashboard for market insights

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/FinSearch.git
cd FinSearch
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

## Usage

1. Start the FastAPI backend:
```bash
uvicorn app.main:app --reload
```

2. Run the Streamlit dashboard:
```bash
streamlit run app/dashboard.py
```



## API Documentation

The API provides the following endpoints:

- `/api/v1/sentiment`: Analyze sentiment for a given ticker
- `/api/v1/summarize`: Summarize earnings calls or financial documents
- `/api/v1/forecast`: Generate price predictions
- `/api/v1/events`: Detect significant financial events

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Hugging Face Transformers
- Financial data provided by various sources including Alpha Vantage and Yahoo Finance