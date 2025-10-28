import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import todoRoutes from './routes/todoRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // максимум 100 запросов за окно
});
app.use(limiter);

// CORS
app.use(cors());

// Body parser
app.use(json());
app.use(urlencoded({ extended: true }));

// API Documentation
app.use('/api-docs', serve, setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/todos', todoRoutes);

// Error handling
app.use(errorHandler);

export default app;
