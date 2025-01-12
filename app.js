import dotenv from 'dotenv';   // dotenv should be loaded first
import express from 'express';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
import kudoRoutes from './routes/kudosRoutes.js';
import AnalyticRoutes from './routes/analyticsRoutes.js';

import cors from 'cors';
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api', authRoutes);

app.use('/api', kudoRoutes);
app.use('/api', AnalyticRoutes);




// Basic route to check if backend is working
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Define the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
