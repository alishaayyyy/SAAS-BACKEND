import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import logRoutes from './routes/logRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Vercel ke liye Proxy trust zaroori hai
app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "Too many requests, please try again later" },
    standardHeaders: true, 
    legacyHeaders: false,
    // Vercel header error fix karne ke liye
    keyGenerator: (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress
});

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('API is running...'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Error:', err));

// app.listen hatana zaroori hai Vercel ke liye
export default app;