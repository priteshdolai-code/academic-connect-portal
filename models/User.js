const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
  fullName: { type: String },
  email: { type: String },
  bio: { type: String },
  
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  academic: {
    marks: { type: String, default: '' },
    attendance: { type: String, default: '' },
    extracurriculars: { type: String, default: '' }
  }
},
{ timestamps: true });


module.exports = mongoose.model('User', userSchema);
