const express = require('express');
const router = express.Router();
const CodingSubmission = require('../models/CodingSubmission');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/authMiddleware');

// Problems stored on backend
const problems = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Array', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.' },
  { id: 2, title: 'Reverse a String', difficulty: 'Easy', category: 'String', description: 'Write a function that reverses a string. The input string is given as an array of characters.' },
  { id: 3, title: 'Binary Search', difficulty: 'Medium', category: 'Search', description: 'Given a sorted array of integers, implement binary search and return the index of the target element.' },
  { id: 4, title: 'Valid Parentheses', difficulty: 'Medium', category: 'Stack', description: 'Given a string containing just the characters (, ), {, }, [ and ], determine if the input string is valid.' },
  { id: 5, title: 'Merge Two Arrays', difficulty: 'Easy', category: 'Array', description: 'Given two sorted arrays, merge them into a single sorted array.' },
];

// @route   GET /api/coding/problems
// @desc    Get all coding problems
// @access  Public
router.get('/problems', (req, res) => {
  res.json(problems);
});

// @route   GET /api/coding/problems/:id
// @desc    Get single problem by ID
// @access  Public
router.get('/problems/:id', (req, res) => {
  const problem = problems.find((p) => p.id === parseInt(req.params.id));
  if (!problem) return res.status(404).json({ message: 'Problem not found' });
  res.json(problem);
});

// @route   POST /api/coding/submit
// @desc    Submit a coding solution
// @access  Private
router.post('/submit', protect, async (req, res) => {
  const { problemId, code, language } = req.body;

  try {
    const problem = problems.find((p) => p.id === problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    // Save submission to DB
    const submission = await CodingSubmission.create({
      user: req.user._id,
      problemId,
      problemTitle: problem.title,
      language: language || 'javascript',
      code,
      status: 'Accepted', // placeholder — real execution engine to be added
    });

    // Update coding progress
    await Progress.findOneAndUpdate(
      { user: req.user._id },
      { $inc: { problemsSolved: 1 } },
      { new: true }
    );

    res.json({ message: 'Solution submitted successfully!', status: 'Accepted', submission });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/coding/submissions
// @desc    Get student's past submissions
// @access  Private
router.get('/submissions', protect, async (req, res) => {
  try {
    const submissions = await CodingSubmission.find({ user: req.user._id }).sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
