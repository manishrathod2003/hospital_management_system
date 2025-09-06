import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  phone: { type: String },
  
  // Doctor Profile Fields
  specialization: { type: String }, // for doctors only
  experience: { type: Number }, // years of experience
  qualification: { type: String }, // MBBS, MD, etc
  consultationFee: { type: Number }, // consultation fee
  about: { type: String }, // doctor description
  profileImage: { type: String, default: '' }, // profile image URL
  
  // Availability System
  availability: {
    monday: { available: Boolean, slots: [String] },
    tuesday: { available: Boolean, slots: [String] },
    wednesday: { available: Boolean, slots: [String] },
    thursday: { available: Boolean, slots: [String] },
    friday: { available: Boolean, slots: [String] },
    saturday: { available: Boolean, slots: [String] },
    sunday: { available: Boolean, slots: [String] }
  },
  
  // Status
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

// Remove any existing indexes and recreate
userSchema.index({ email: 1 }, { unique: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);