import express from 'express';
import { bookAppointment, getAppointments, cancelAppointment } from '../controllers/appointmentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all appointments for logged-in user
router.get('/', authenticateToken, getAppointments);

// Book new appointment  
router.post('/', authenticateToken, bookAppointment);

// Cancel appointment by ID
router.patch('/:id/cancel', authenticateToken, cancelAppointment);

export default router;