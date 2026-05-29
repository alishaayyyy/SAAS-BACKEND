import ActivityLog from '../models/ActivityLog.js';

export const addLog = async (userId, action) => {
    try {
        await ActivityLog.create({ userId, action });
    } catch (err) {
        console.error("Error saving log:", err);
    }
};