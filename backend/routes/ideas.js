const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// @route   GET api/ideas
// @desc    Get all startup ideas
// @access  Public
router.get('/', async (req, res) => {
  try {
    const ideas = db.ideas.find();
    res.json(ideas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/ideas/:id
// @desc    Get a single idea
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const idea = db.ideas.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea not found' });
    }
    res.json(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/ideas
// @desc    Create a startup idea
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, category, description, problem, solution, targetAudience, teamRequirements } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ msg: 'Title, Category, and Description are required' });
  }

  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newIdea = db.ideas.create({
      title,
      category,
      description,
      problem: problem || '',
      solution: solution || '',
      targetAudience: targetAudience || '',
      teamRequirements: teamRequirements || '',
      ownerId: user.id,
      ownerName: user.name
    });

    // Award 50 coins to creator for submitting an idea
    db.users.updateCoins(user.id, 50, `Idea Submission: ${title}`);
    db.users.updateReputation(user.id, 15);

    // Add achievement for first project
    const userIdeasCount = db.ideas.find().filter(i => i.ownerId === user.id).length;
    if (userIdeasCount === 1) {
      const achievements = [...user.achievements];
      if (!achievements.includes('Ideator Spark')) {
        achievements.push('Ideator Spark');
        db.users.update(user.id, { achievements });
        db.users.updateCoins(user.id, 25, 'Achievement: Ideator Spark');
      }
    }

    res.json(newIdea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/ideas/:id/vote
// @desc    Vote/Upvote an idea
// @access  Private
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const idea = db.ideas.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea not found' });
    }

    const voteResult = db.ideas.vote(req.params.id, req.user.id);
    if (!voteResult) {
      return res.status(400).json({ msg: 'Error executing vote' });
    }

    const { idea: updatedIdea, diff } = voteResult;

    // Award coins/reputation depending on vote change
    if (diff > 0) {
      // Upvoted! Creator gets reputation and voter gets coins
      db.users.updateReputation(updatedIdea.ownerId, 5);
      db.users.updateCoins(req.user.id, 5, `Upvoted idea: ${updatedIdea.title}`);
    } else {
      // Un-upvoted
      db.users.updateReputation(updatedIdea.ownerId, -5);
      db.users.updateCoins(req.user.id, -5, `Removed Upvote from: ${updatedIdea.title}`);
    }

    res.json(updatedIdea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/ideas/:id/comment
// @desc    Add comment to an idea
// @access  Private
router.post('/:id/comment', auth, async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ msg: 'Comment text is required' });
  }

  try {
    const user = db.users.findById(req.user.id);
    const idea = db.ideas.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea not found' });
    }

    const newComment = db.ideas.addComment(req.params.id, {
      senderId: user.id,
      senderName: user.name,
      text
    });

    // Reward active comment participation
    db.users.updateCoins(user.id, 5, `Commented on: ${idea.title}`);
    db.users.updateReputation(idea.ownerId, 2);

    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/ideas/:id/blockchain
// @desc    Associate blockchain registry parameters (immutable hash)
// @access  Private
router.post('/:id/blockchain', auth, async (req, res) => {
  const { blockchainHash, blockchainTx, ipfsHash, blockNumber } = req.body;

  if (!blockchainHash || !blockchainTx) {
    return res.status(400).json({ msg: 'Hash and transaction parameters are required' });
  }

  try {
    const idea = db.ideas.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea not found' });
    }

    if (idea.ownerId !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized: Only the idea owner can register on blockchain' });
    }

    const updatedIdea = db.ideas.update(req.params.id, {
      blockchainHash,
      blockchainTx,
      ipfsHash: ipfsHash || 'QmDefaultHash...',
      blockNumber: blockNumber || Math.floor(Math.random() * 1000000) + 15000000,
      timestamp: Date.now()
    });

    // Reward for blockchain protection
    db.users.updateCoins(req.user.id, 100, `Blockchain IP Protection: ${idea.title}`);
    db.users.updateReputation(req.user.id, 30);

    // User achievement check
    const user = db.users.findById(req.user.id);
    const achievements = [...user.achievements];
    if (!achievements.includes('IP Protector')) {
      achievements.push('IP Protector');
      db.users.update(req.user.id, { achievements });
      db.users.updateCoins(req.user.id, 50, 'Achievement: IP Protector');
    }

    res.json(updatedIdea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/ideas/:id/stage
// @desc    Update project growth stage
// @access  Private
router.put('/:id/stage', auth, async (req, res) => {
  const { stage } = req.body;
  const stages = ['Ideation', 'Validation', 'Prototyping', 'Launch'];

  if (!stages.includes(stage)) {
    return res.status(400).json({ msg: 'Invalid stage parameter' });
  }

  try {
    const idea = db.ideas.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ msg: 'Idea not found' });
    }

    if (idea.ownerId !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized to change stage' });
    }

    const updatedIdea = db.ideas.update(req.params.id, { stage });

    // Reward for progression
    db.users.updateCoins(req.user.id, 40, `Milestone: ${idea.title} moved to ${stage}`);
    db.users.updateReputation(req.user.id, 20);

    res.json(updatedIdea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
