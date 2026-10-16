const mongoose = require('mongoose');

const aptitudeResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: { type: String, default: 'Quantitative Aptitude' },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  score: { type: Number, required: true }, // percentage
  answers: [
    {
      questionId: Number,
      selectedOption: Number,
      isCorrect: Boolean,
    }
  ],
  attemptedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('AptitudeResult', aptitudeResultSchema);
