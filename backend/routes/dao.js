const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// @route   GET api/dao/proposals
// @desc    Get all DAO proposals
// @access  Public
router.get('/proposals', async (req, res) => {
  try {
    const proposals = db.proposals.find();
    res.json(proposals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/dao/proposals
// @desc    Create a DAO proposal (costs 50 coins to prevent spam)
// @access  Private
router.post('/proposals', auth, async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.coinBalance < 50) {
      return res.status(400).json({ msg: 'Insufficient coins. Creating a proposal costs 50 Launchpad Coins.' });
    }

    // Deduct 50 coins
    db.users.updateCoins(user.id, -50, `Created DAO Proposal: ${title}`);

    const newProposal = db.proposals.create({
      title,
      description,
      category,
      creatorId: user.id,
      creatorName: user.name
    });

    res.json(newProposal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/dao/proposals/:id/vote
// @desc    Vote on a DAO proposal (voting power depends on current coin balance)
// @access  Private
router.post('/proposals/:id/vote', auth, async (req, res) => {
  const { option } = req.body; // 'yes' or 'no'
  if (option !== 'yes' && option !== 'no') {
    return res.status(400).json({ msg: 'Option must be either yes or no' });
  }

  try {
    const user = db.users.findById(req.user.id);
    const proposal = db.proposals.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ msg: 'Proposal not found' });
    }

    if (proposal.status !== 'active') {
      return res.status(400).json({ msg: 'Voting on this proposal is closed' });
    }

    if (Date.now() > proposal.expiresAt) {
      db.proposals.update(req.params.id, { status: 'closed' });
      return res.status(400).json({ msg: 'Voting on this proposal has expired' });
    }

    const votingPower = user.coinBalance;
    if (votingPower <= 0) {
      return res.status(400).json({ msg: 'You need at least 1 Launchpad Coin to vote in the DAO.' });
    }

    const result = db.proposals.vote(req.params.id, user.id, option, votingPower);
    if (result.error) {
      return res.status(400).json({ msg: result.error });
    }

    // Reward for governance participation
    db.users.updateCoins(user.id, 10, `Voted in DAO: ${proposal.title}`);
    db.users.updateReputation(user.id, 5);

    // Check achievement
    const achievements = [...user.achievements];
    if (!achievements.includes('DAO Citizen')) {
      achievements.push('DAO Citizen');
      db.users.update(user.id, { achievements });
      db.users.updateCoins(user.id, 20, 'Achievement: DAO Citizen');
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
