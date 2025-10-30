import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import todoRoutes from './routes/todoRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(helmet());

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api-docs', serve, setup(swaggerSpec));

app.use('/todos', todoRoutes);

app.use(errorHandler);

export default app;
