import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js';

export const getAnalyticsData = async (req, res) => {
    try {
        // Database se counts utha rahe hain
        const userCount = await User.countDocuments();
        const logCount = await ActivityLog.countDocuments();
        
        // Recharts ke liye specific format (Array of objects)
        const data = [
            { name: 'Total Users', value: userCount },
            { name: 'Total Logs', value: logCount },
        ];
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};