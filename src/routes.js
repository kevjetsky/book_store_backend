import express from 'express';
import userRoutes from './api/User/routes';

// inicialization
const app = express();

// routes
app.use('/user', userRoutes);

export default app;