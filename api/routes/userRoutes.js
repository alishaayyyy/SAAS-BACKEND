import express from 'express';
const router = express.Router();
import { getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// '/' path server.js ke '/api/users' ke saath jud kar '/api/users/' ban jayega
router.get('/', protect, getUsers); 
export default router;