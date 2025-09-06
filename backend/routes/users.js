import express from 'express';
import { getPatients, getDoctors } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Patients route - requires auth and doctor role
router.get('/patients', authenticateToken, getPatients);

// Doctors route - public access for appointment booking
router.get('/doctors', getDoctors);

export default router;
