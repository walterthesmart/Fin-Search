import express from 'express';
import cors from 'cors';
import { config } from './config';
import { StockService } from './services/stockService';
import { NewsService } from './services/newsService';

const app = express();