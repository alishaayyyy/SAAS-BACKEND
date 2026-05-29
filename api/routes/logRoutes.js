import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Route ab dono roles ke liye open hai, filtering andar handle ho rahi hai
router.get('/', protect, async (req, res) => {
    try {
        let query = {};

        // Agar user 'admin' nahi hai, toh sirf uski apni logs find karo
        // JWT mein 'id' store hai, isliye yahan req.user.id use karna sahi hai
        if (req.user.role !== 'admin') {
            query = { userId: req.user.id }; 
        }

        // Database query: Admin ho to sab, user ho to filtered
        const logs = await ActivityLog.find(query)
            .sort({ createdAt: -1 })
            .limit(20);

        res.json(logs);
    } catch (err) {
        console.error("Logs Fetch Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;