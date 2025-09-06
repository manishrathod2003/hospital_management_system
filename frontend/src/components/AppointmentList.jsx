import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, Phone, IndianRupee, AlertCircle, X } from 'lucide-react';
import api from '../utils/api';

const AppointmentList = ({ appointments, onAppointmentCancelled, currentUser }) => {
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    setCancellingId(appointmentId);
    try {
      await api.patch(`/appointments/${appointmentId}/cancel`);
      onAppointmentCancelled(appointmentId);
      // You can add a toast notification here if needed
    } catch (error) {
      alert('Failed to cancel appointment');
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      completed: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return '📅';
      case 'confirmed': return '✅';
      case 'pending': return '⏳';
      case 'cancelled': return '❌';
      case 'completed': return '✨';
      default: return '📋';
    }
  };

  if (!appointments.length) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
        <p className="text-gray-600">
          {currentUser.role === 'patient' 
            ? "You don't have any appointments yet. Book your first appointment!" 
            : "No patient appointments scheduled yet."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map(appointment => {
        // Safety check for null values
        if (!appointment || !appointment.doctor || !appointment.patient) {
          console.error('Invalid appointment data:', appointment);
          return null;
        }

        const isPastAppointment = new Date(appointment.date + ' ' + appointment.time) < new Date();
        const canCancel = appointment.status === 'scheduled' && 
                         currentUser.role === 'patient' && 
                         !isPastAppointment;

        return (
          <div 
            key={appointment._id}
            className={`bg-white rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
              appointment.status === 'cancelled' 
                ? 'border-red-200 bg-red-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {currentUser.role === 'patient' 
                        ? (appointment.doctor.name || 'Dr').charAt(0)
                        : (appointment.patient.name || 'P').charAt(0)
                      }
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {currentUser.role === 'patient' 
                          ? `Dr. ${appointment.doctor.name || 'Unknown'}` 
                          : appointment.patient.name || 'Unknown Patient'
                        }
                      </h4>
                      {appointment.doctor.specialization && (
                        <p className="text-sm text-blue-600 font-medium">
                          {appointment.doctor.specialization}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                    <span className="mr-1">{getStatusIcon(appointment.status)}</span>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                  {currentUser.role === 'patient' && appointment.doctor?.consultationFee && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-medium">₹{appointment.doctor.consultationFee}</span>
                    </div>
                  )}
                  {appointment.patient?.phone && currentUser.role === 'doctor' && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{appointment.patient.phone}</span>
                    </div>
                  )}
                </div>

                {/* Reason */}
                {appointment.reason && (
                  <div className="mb-4">
                    <div className="flex items-start space-x-2 text-gray-600">
                      <FileText className="w-4 h-4 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Reason for visit:</p>
                        <p className="text-sm">{appointment.reason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Past Appointment Warning */}
                {isPastAppointment && appointment.status === 'scheduled' && (
                  <div className="flex items-center space-x-2 text-orange-600 text-sm mb-4">
                    <AlertCircle className="w-4 h-4" />
                    <span>This appointment time has passed</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {canCancel && (
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <button 
                    onClick={() => handleCancel(appointment._id)}
                    disabled={cancellingId === appointment._id}
                    className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancellingId === appointment._id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Cancelling...</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }).filter(Boolean)} {/* Remove null elements */}
    </div>
  );
};

export default AppointmentList;