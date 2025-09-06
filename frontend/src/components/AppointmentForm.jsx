import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, Loader2, CheckCircle } from 'lucide-react';
import api from '../utils/api';

const AppointmentForm = ({ doctors, selectedDoctorId, onAppointmentBooked }) => {
  const [formData, setFormData] = useState({
    doctorId: selectedDoctorId || '',
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/appointments', formData);
      onAppointmentBooked(response.data);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Reset form
        setFormData({
          doctorId: selectedDoctorId || '',
          date: '',
          time: '',
          reason: ''
        });
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Time slots for appointment booking
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '02:00', '02:30', '03:00', '03:30', '04:00', '04:30',
    '05:00', '05:30', '06:00', '06:30'
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get maximum date (30 days from today)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Booked!</h3>
        <p className="text-gray-600">Your appointment has been successfully scheduled.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-red-600 text-sm">!</span>
            </div>
            <div className="text-red-700 text-sm">{error}</div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Doctor Selection */}
        {!selectedDoctorId && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Select Doctor
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="">Choose a doctor...</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Appointment Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            max={maxDateString}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Preferred Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(time => (
              <label
                key={time}
                className={`relative cursor-pointer rounded-lg border-2 p-3 text-center text-sm font-medium transition-all duration-200 ${
                  formData.time === time
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="time"
                  value={time}
                  onChange={handleChange}
                  className="sr-only"
                  required
                />
                {time}
              </label>
            ))}
          </div>
        </div>

        {/* Reason for Visit */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Reason for Visit
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            placeholder="Please describe your health concern or reason for the appointment..."
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span>Booking Appointment...</span>
            </div>
          ) : (
            'Book Appointment'
          )}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;