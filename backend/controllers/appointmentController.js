import Appointment from '../models/Appointment.js';

// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    
    // Check if appointment slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      time: time,
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }
    
    const appointment = new Appointment({
      patient: req.user._id,
      doctor: doctorId,
      date: new Date(date),
      time,
      reason,
      status: 'scheduled'
    });

    const savedAppointment = await appointment.save();
    
    // Populate both patient and doctor data
    const populatedAppointment = await Appointment.findById(savedAppointment._id)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization experience qualification consultationFee about');
    
    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get appointments
export const getAppointments = async (req, res) => {
  try {
    let query = {};
    
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      query.doctor = req.user._id;
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialization experience qualification consultationFee about isAvailable')
      .sort({ date: 1, time: 1 });
      
    console.log(`Found ${appointments.length} appointments for ${req.user.role}`); // Debug log
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Check if user owns this appointment (patient can cancel, doctor can also cancel)
    const isPatient = appointment.patient.toString() === req.user._id.toString();
    const isDoctor = appointment.doctor.toString() === req.user._id.toString();
    
    if (!isPatient && !isDoctor) {
      return res.status(403).json({ error: 'Not authorized to cancel this appointment' });
    }

    appointment.status = 'cancelled';
    await appointment.save();
    
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ error: error.message });
  }
};