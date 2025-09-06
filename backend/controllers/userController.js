import User from '../models/User.js';

// Get all patients (only for doctors)
export const getPatients = async (req, res) => {
  try {
    // Only doctors can see patients list
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ error: 'Access denied. Only doctors can view patients list.' });
    }
    
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json(patients);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all doctors (public access for appointment booking)
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ 
      role: 'doctor' 
    }).select('name email specialization experience qualification consultationFee about isAvailable phone');
    
    console.log(`Found ${doctors.length} doctors`); // Debug log
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: error.message });
  }
};