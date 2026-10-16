const express = require('express');
const router = express.Router();
const AptitudeResult = require('../models/AptitudeResult');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/authMiddleware');

// Mock questions stored on backend
const questions = [
  {
    id: 1,
    category: 'Quantitative Aptitude',
    question: 'If a train travels 120 km in 2 hours, what is its average speed?',
    options: ['40 km/h', '50 km/h', '60 km/h', '80 km/h'],
    correct: 2,
    explanation: 'Speed = distance / time = 120 km / 2 h = 60 km/h.',
  },
  {
    id: 2,
    category: 'Quantitative Aptitude',
    question: 'A can complete a work in 10 days and B in 15 days. How long will they take working together?',
    options: ['5 days', '6 days', '8 days', '10 days'],
    correct: 1,
    explanation: 'Combined rate = 1/10 + 1/15 = 1/6, so time = 6 days.',
  },
  {
    id: 3,
    category: 'Logical Reasoning',
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '48'],
    correct: 2,
    explanation: 'Pattern: n^2 + n; for n=5 => 5^2+5 = 30, next n=6 => 6^2+6 = 42.',
  },
  {
    id: 4,
    category: 'Quantitative Aptitude',
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correct: 1,
    explanation: '15% of 200 = 0.15 * 200 = 30.',
  },
  {
    id: 5,
    category: 'Logical Reasoning',
    question: 'If APPLE = 50, MANGO = 49, then BANANA = ?',
    options: ['42', '48', '51', '54'],
    correct: 1,
    explanation: 'Sum of letter positions: A(1)+P(16)+P(16)+L(12)+E(5)=50, similarly BANANA sums to 42.',
  },
];

// @route   GET /api/aptitude/questions
// @desc    Get all aptitude questions (without correct answers)
// @access  Public
router.get('/questions', (req, res) => {
  // Return all questions (including correct) but omit explanation
  const questionsForClient = questions.map(({ explanation, ...rest }) => rest);
  res.json(questionsForClient);
});

// @route   POST /api/aptitude/submit
// @desc    Submit aptitude answers & calculate score
// @access  Private
router.post('/submit', protect, async (req, res) => {
  const { answers } = req.body; // [{ questionId, selectedOption }]

  try {
    let correct = 0;
    const gradedAnswers = answers.map((ans) => {
      const question = questions.find((q) => q.id === ans.questionId);
      const isCorrect = question && question.correct === ans.selectedOption;
      if (isCorrect) correct++;
      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect,
        correctOption: question ? question.correct : null,
        explanation: question ? question.explanation : null,
      };
    });

    const score = Math.round((correct / questions.length) * 100);

    // Save result to DB
    const result = await AptitudeResult.create({
      user: req.user._id,
      totalQuestions: questions.length,
      correctAnswers: correct,
      score,
      answers: gradedAnswers,
    });

    // Update progress
    await Progress.findOneAndUpdate(
      { user: req.user._id },
      { aptitude: score, $inc: { testsCompleted: 1 } },
      { new: true }
    );

    res.json({ message: 'Test submitted!', score, correct, total: questions.length, gradedAnswers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/aptitude/results
// @desc    Get student's past aptitude results
// @access  Private
router.get('/results', protect, async (req, res) => {
  try {
    const results = await AptitudeResult.find({ user: req.user._id }).sort({ attemptedAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
