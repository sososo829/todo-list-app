import express from 'express';
import dutyRoutes from './routes/dutyRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/api', dutyRoutes);

app.use(errorHandler);

export default app;
