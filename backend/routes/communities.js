const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// @route   GET api/communities
// @desc    Get all communities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const comms = db.communities.find();
    res.json(comms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/communities/:id
// @desc    Get a community by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const comm = db.communities.findById(req.params.id);
    if (!comm) {
      return res.status(404).json({ msg: 'Community not found' });
    }
    res.json(comm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/communities/:id/join
// @desc    Join or leave a community
// @access  Private
router.post('/:id/join', auth, async (req, res) => {
  try {
    const comm = db.communities.findById(req.params.id);
    if (!comm) {
      return res.status(404).json({ msg: 'Community not found' });
    }

    const updatedComm = db.communities.join(req.params.id, req.user.id);
    const hasJoined = updatedComm.members.includes(req.user.id);

    if (hasJoined) {
      db.users.updateCoins(req.user.id, 10, `Joined community: ${comm.name}`);
      db.users.updateReputation(req.user.id, 2);
    } else {
      db.users.updateCoins(req.user.id, -10, `Left community: ${comm.name}`);
    }

    res.json(updatedComm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/communities/:id/messages
// @desc    Get all chat messages for a community
// @access  Private
router.get('/:id/messages', auth, async (req, res) => {
  try {
    const messages = db.messages.findByCommunity(req.params.id);
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/communities/:id/messages
// @desc    Post a message to a community
// @access  Private
router.post('/:id/messages', auth, async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ msg: 'Message text cannot be empty' });
  }

  try {
    const user = db.users.findById(req.user.id);
    const comm = db.communities.findById(req.params.id);
    if (!comm) {
      return res.status(404).json({ msg: 'Community not found' });
    }

    const newMsg = db.messages.create({
      communityId: req.params.id,
      senderId: user.id,
      senderName: user.name,
      text
    });

    // Reward for active discussion participation
    db.users.updateCoins(user.id, 2, `Discussion contribution in ${comm.name}`);
    
    // Check for "Chatterbox" achievement
    const userMsgs = db.messages.findByCommunity(req.params.id).filter(m => m.senderId === user.id);
    if (userMsgs.length >= 5) {
      const achievements = [...user.achievements];
      if (!achievements.includes('Vocal Innovator')) {
        achievements.push('Vocal Innovator');
        db.users.update(user.id, { achievements });
        db.users.updateCoins(user.id, 15, 'Achievement: Vocal Innovator');
      }
    }

    res.json(newMsg);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
