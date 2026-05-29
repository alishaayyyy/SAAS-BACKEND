import express from 'express';
import { getAnalyticsData } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin sirf analytics dekh sakta hai
router.get('/data', protect, authorize('admin'), getAnalyticsData);

export default router;