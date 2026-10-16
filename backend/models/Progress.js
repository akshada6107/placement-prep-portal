const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  aptitude: { type: Number, default: 0 },
  technical: { type: Number, default: 0 },
  coding: { type: Number, default: 0 },
  interview: { type: Number, default: 0 },
  testsCompleted: { type: Number, default: 0 },
  problemsSolved: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
