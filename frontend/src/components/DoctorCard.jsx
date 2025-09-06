import React from 'react';
import { MapPin, Star, Award, Calendar, IndianRupee } from 'lucide-react';

const DoctorCard = ({ doctor, onSelectDoctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Doctor Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {doctor.profileImage ? (
              <img 
                src={doctor.profileImage} 
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {doctor.name.charAt(0)}
              </div>
            )}
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white ${
              doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'
            } shadow-sm`}></div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Dr. {doctor.name}</h3>
            <p className="text-blue-600 font-semibold text-sm">
              {doctor.specialization || 'General Medicine'}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Award className="w-3 h-3 mr-1" />
              {doctor.experience ? `${doctor.experience}+ years` : 'Experienced'}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="p-6">
        {/* Qualification */}
        {doctor.qualification && (
          <div className="mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {doctor.qualification}
            </div>
          </div>
        )}

        {/* About Section */}
        {doctor.about && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-3">
              {doctor.about}
            </p>
          </div>
        )}

        {/* Rating (Mock) */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className="w-4 h-4 text-yellow-400 fill-current"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">(4.9) • 150+ reviews</span>
        </div>

        {/* Consultation Fee */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-lg font-bold text-gray-900">
            <IndianRupee className="w-5 h-5" />
            <span>{doctor.consultationFee || '500'}</span>
          </div>
          <div className="text-xs text-gray-500">Consultation Fee</div>
        </div>

        {/* Availability Status */}
        <div className="mb-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            doctor.isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            {doctor.isAvailable ? 'Available Today' : 'Currently Unavailable'}
          </div>
        </div>

        {/* Next Available (Mock) */}
        {doctor.isAvailable && (
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <Calendar className="w-3 h-3 mr-1" />
            Next available: Today 2:00 PM
          </div>
        )}
      </div>

      {/* Book Appointment Button */}
      <div className="px-6 pb-6">
        <button 
          className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 transform ${
            doctor.isAvailable
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          onClick={() => onSelectDoctor(doctor)}
          disabled={!doctor.isAvailable}
        >
          {doctor.isAvailable ? (
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </div>
          ) : (
            'Currently Unavailable'
          )}
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;