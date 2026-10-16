const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/progress
// @desc    Get student's overall progress
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user._id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/progress/:category
// @desc    Update progress for a specific category
// @access  Private
router.put('/:category', protect, async (req, res) => {
  const { category } = req.params;
  const { percentage } = req.body;

  const validCategories = ['aptitude', 'technical', 'coding', 'interview'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      { [category]: percentage, lastActive: Date.now() },
      { new: true }
    );
    res.json({ message: `${category} progress updated`, progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
