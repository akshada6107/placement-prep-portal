const mongoose = require('mongoose');

const codingSubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problemId: { type: Number, required: true },
  problemTitle: { type: String, required: true },
  language: { type: String, default: 'javascript' },
  code: { type: String, required: true },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Pending'],
    default: 'Pending',
  },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('CodingSubmission', codingSubmissionSchema);
