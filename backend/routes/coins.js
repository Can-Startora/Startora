const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// @route   GET api/coins/transactions
// @desc    Get user's virtual coin transactions
// @access  Private
router.get('/transactions', auth, async (req, res) => {
  try {
    const txs = db.transactions.findByUser(req.user.id);
    res.json(txs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/coins/redeem
// @desc    Redeem a perk from the Rewards Shop
// @access  Private
router.post('/redeem', auth, async (req, res) => {
  const { rewardId, cost, label } = req.body;

  if (!rewardId || !cost || !label) {
    return res.status(400).json({ msg: 'Please specify reward details' });
  }

  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.coinBalance < cost) {
      return res.status(400).json({ msg: 'Insufficient coin balance to redeem this reward' });
    }

    // Deduct coins
    db.users.updateCoins(user.id, -cost, `Redeemed: ${label}`);

    // Update achievement for store usage
    const achievements = [...user.achievements];
    if (!achievements.includes('Platform Beneficiary')) {
      achievements.push('Platform Beneficiary');
      db.users.update(user.id, { achievements });
      db.users.updateCoins(user.id, 10, 'Achievement: Platform Beneficiary');
    }

    res.json({ msg: 'Redeemed successfully', newBalance: user.coinBalance - cost });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
