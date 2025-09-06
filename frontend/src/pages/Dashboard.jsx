import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DoctorCard from '../components/DoctorCard';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';
import { Calendar, Clock, Users, Activity, Plus, Bell, Search, X, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError('');
      
      // Fetch doctors (public access)
      try {
        const doctorsRes = await api.get('/users/doctors');
        console.log('Doctors response:', doctorsRes.data);
        setDoctors(doctorsRes.data || []);
      } catch (doctorError) {
        console.error('Error fetching doctors:', doctorError);
        setDoctors([]);
        setError('Failed to load doctors list');
      }

      // Fetch appointments (requires auth)
      try {
        const appointmentsRes = await api.get('/appointments');
        console.log('Appointments response:', appointmentsRes.data);
        setAppointments(appointmentsRes.data || []);
      } catch (appointmentError) {
        console.error('Error fetching appointments:', appointmentError);
        setAppointments([]);
        if (!error) setError('Failed to load appointments');
      }
    } catch (generalError) {
      console.error('General error:', generalError);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handleAppointmentBooked = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
    setShowBookingForm(false);
    setSelectedDoctor(null);
  };

  const handleAppointmentCancelled = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt._id === appointmentId 
        ? { ...apt, status: 'cancelled' }
        : apt
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mx-4 mt-4">
          <p>{error}</p>
          <button 
            onClick={fetchData} 
            className="text-red-600 underline text-sm mt-1"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Book Appointment</h3>
                <p className="text-sm text-gray-600 mt-1">with Dr. {selectedDoctor.name}</p>
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                onClick={() => setShowBookingForm(false)}
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              <AppointmentForm 
                doctors={[selectedDoctor]}
                selectedDoctorId={selectedDoctor._id}
                onAppointmentBooked={handleAppointmentBooked}
              />
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-blue-100 text-lg">
              {user?.role === 'patient' 
                ? "Manage your health appointments with ease" 
                : "Monitor your patient appointments and schedule"
              }
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(a => a.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {user?.role === 'patient' ? 'Doctors' : 'Patients'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.role === 'patient' ? doctors.length : new Set(appointments.map(a => a.patient?._id)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Profiles for Patients */}
        {user?.role === 'patient' && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  Available Doctors
                </h2>
                <p className="text-sm text-gray-600 mt-1">Find and book appointments with our specialists</p>
              </div>
              <div className="p-6">
                {doctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.filter(doc => doc.isAvailable !== false).map(doctor => (
                      <DoctorCard 
                        key={doctor._id}
                        doctor={doctor}
                        onSelectDoctor={handleSelectDoctor}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No doctors available at the moment.</p>
                    <button 
                      onClick={fetchData}
                      className="mt-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Refresh
                    </button>
                  </div>
                )}
                
                {doctors.filter(doc => doc.isAvailable === false).length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Currently Unavailable</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {doctors.filter(doc => doc.isAvailable === false).map(doctor => (
                        <DoctorCard 
                          key={doctor._id}
                          doctor={doctor}
                          onSelectDoctor={handleSelectDoctor}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              {user?.role === 'patient' ? 'My Appointments' : 'Patient Appointments'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {user?.role === 'patient' 
                ? 'Track and manage your scheduled appointments' 
                : 'View and manage your patient appointments'
              }
            </p>
          </div>
          <div className="p-6">
            <AppointmentList 
              appointments={appointments}
              onAppointmentCancelled={handleAppointmentCancelled}
              currentUser={user}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;