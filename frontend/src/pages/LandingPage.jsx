import React, { useState } from 'react';
import { Calendar, Clock, Users, Activity, Heart, Shield, Award, Phone, Mail, MapPin, Star, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Advanced heart care with experienced cardiologists and state-of-the-art equipment.",
      features: ["ECG", "Echocardiography", "Cardiac Surgery"]
    },
    {
      icon: Activity,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response and critical care facilities.",
      features: ["Trauma Care", "ICU", "Emergency Surgery"]
    },
    {
      icon: Users,
      title: "General Medicine",
      description: "Comprehensive healthcare services for all your medical needs.",
      features: ["Health Checkups", "Consultation", "Preventive Care"]
    },
    {
      icon: Shield,
      title: "Surgery",
      description: "Advanced surgical procedures with minimally invasive techniques.",
      features: ["Laparoscopic", "Robotic Surgery", "Day Care Surgery"]
    }
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      rating: 4.9
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Neurology",
      experience: "12+ years", 
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      rating: 4.8
    },
    {
      name: "Dr. Emily Davis",
      specialization: "Pediatrics",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1594824575863-a1e5ee9cbac5?w=300&h=300&fit=crop&crop=face",
      rating: 4.9
    }
  ];

  const stats = [
    { number: "15,000+", label: "Happy Patients" },
    { number: "50+", label: "Expert Doctors" },
    { number: "25+", label: "Years Experience" },
    { number: "99.9%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "John Smith",
      review: "Outstanding care and professional service. The doctors are highly skilled and the staff is very caring.",
      rating: 5,
      treatment: "Cardiac Surgery"
    },
    {
      name: "Maria Garcia",
      review: "Quick appointment booking and excellent treatment. Highly recommend this hospital for quality healthcare.",
      rating: 5,
      treatment: "General Consultation"
    },
    {
      name: "David Wilson",
      review: "Modern facilities and compassionate care. The entire team made my treatment journey comfortable.",
      rating: 5,
      treatment: "Orthopedic Treatment"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Heart className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">MediCare Hospital</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-blue-600 font-medium">Home</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
                <a href="#doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </Link>
              <Link 
                to="/login" 
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-blue-600 font-medium">Home</a>
                <a href="#services" className="block px-3 py-2 text-gray-700">Services</a>
                <a href="#doctors" className="block px-3 py-2 text-gray-700">Doctors</a>
                <a href="#about" className="block px-3 py-2 text-gray-700">About</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700">Contact</a>
                <div className="pt-4 pb-2 space-y-2">
                  <Link 
                    to="/register"
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Book Appointment
                  </Link>
                  <Link 
                    to="/login"
                    className="block w-full text-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Health, Our 
                <span className="text-blue-600"> Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience world-class healthcare with our expert doctors, modern facilities, 
                and compassionate care. Book your appointment online in just a few clicks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Book Appointment Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#about"
                  className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
                alt="Modern Hospital" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Certified Excellence</p>
                    <p className="text-sm text-gray-600">ISO 9001:2015 Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-blue-100 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services delivered by our expert medical team using cutting-edge technology and compassionate care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Doctors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our highly qualified medical professionals are committed to providing you with the best possible care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialization}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience} Experience</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-gray-900 font-semibold ml-1">{doctor.rating}</span>
                    </div>
                    <Link 
                      to="/register"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About MediCare Hospital</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                For over 25 years, MediCare Hospital has been at the forefront of healthcare innovation, 
                providing exceptional medical services to our community. Our state-of-the-art facility 
                combines advanced technology with compassionate care.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that everyone deserves access to quality healthcare, and we're committed to 
                making that a reality through our comprehensive services, expert medical team, and 
                patient-centered approach.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold text-blue-600 mb-2">50+</h4>
                  <p className="text-gray-600">Medical Specialists</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-blue-600 mb-2">200+</h4>
                  <p className="text-gray-600">Hospital Beds</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop" 
                alt="Hospital Interior" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real people who trust us with their health.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.review}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-blue-600 text-sm">{testimonial.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-blue-100 mb-8">
                Ready to take the next step in your healthcare journey? Contact us today.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-200 mr-4" />
                  <div>
                    <p className="font-semibold">Emergency: +1 (555) 911-0000</p>
                    <p className="text-blue-100">Appointments: +1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-200 mr-4" />
                  <div>
                    <p className="font-semibold">info@medicarehospital.com</p>
                    <p className="text-blue-100">appointments@medicarehospital.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-200 mr-4 mt-1" />
                  <div>
                    <p className="font-semibold">123 Healthcare Drive</p>
                    <p className="text-blue-100">Medical District, City 12345</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                  <option>Select Department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                  <option>General Medicine</option>
                </select>
                <textarea 
                  placeholder="Message (Optional)" 
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                ></textarea>
                <Link 
                  to="/register"
                  className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold">MediCare Hospital</span>
              </div>
              <p className="text-gray-400 text-lg mb-6">
                Leading the way in healthcare excellence with compassionate care, 
                advanced technology, and expert medical professionals.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-blue-400" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#doctors" className="hover:text-white transition-colors">Doctors</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Emergency Care</li>
                <li>Cardiology</li>
                <li>Neurology</li>
                <li>Pediatrics</li>
                <li>Surgery</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © 2024 MediCare Hospital. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;