const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../db');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = db.users.findByEmail(email);
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = db.users.create({
      name,
      email,
      password: hashedPassword,
      skills: [],
      interests: [],
      bio: '',
      tagline: '',
      githubUrl: '',
      linkedinUrl: '',
      profilePhoto: '',
      characterAvatar: 'robo',
      avatarColor: 'teal',
      achievements: []
    });

    // Start user with 0 coins by default (no welcome bonus)
    db.users.updateCoins(user.id, 0, 'Account Created');

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretlaunchpadtoken123',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = db.users.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretlaunchpadtoken123',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/user
// @desc    Get user by token
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // Don't return password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/auth/profile
// @desc    Update user profile details
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { skills, interests, bio, tagline, githubUrl, linkedinUrl, profilePhoto, characterAvatar } = req.body;

  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const updates = {};
    if (skills) updates.skills = skills;
    if (interests) updates.interests = interests;
    if (bio !== undefined) updates.bio = bio;
    if (tagline !== undefined) updates.tagline = tagline;
    if (githubUrl !== undefined) updates.githubUrl = githubUrl;
    if (linkedinUrl !== undefined) updates.linkedinUrl = linkedinUrl;
    if (profilePhoto !== undefined) updates.profilePhoto = profilePhoto;
    if (characterAvatar !== undefined) updates.characterAvatar = characterAvatar;

    // Check if updating achievements
    const achievements = [...user.achievements];
    let achievementEarned = false;

    if (skills && skills.length > 0 && !achievements.includes('Skill Builder')) {
      achievements.push('Skill Builder');
      updates.achievements = achievements;
      // Award reward coins
      db.users.updateCoins(user.id, 20, 'Achievement: Skill Builder');
      achievementEarned = true;
    }

    // Award 'Fully Detailed' if they complete bio, tagline, and choose profilePhoto/characterAvatar
    const hasBio = bio && bio.trim().length > 0;
    const hasTagline = tagline && tagline.trim().length > 0;
    const hasVisual = profilePhoto || characterAvatar;
    if (hasBio && hasTagline && hasVisual && !achievements.includes('Fully Detailed')) {
      achievements.push('Fully Detailed');
      updates.achievements = achievements;
      db.users.updateCoins(user.id, 50, 'Achievement: Fully Detailed');
      achievementEarned = true;
    }

    const updatedUser = db.users.update(req.user.id, updates);
    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/users/:id
// @desc    Get user public profile by ID
// @access  Public
router.get('/users/:id', async (req, res) => {
  try {
    const user = db.users.findById(req.params.id);
    if (!user) {
      // Return custom mock profiles for static demo accounts
      if (req.params.id === 'demo-user-123') {
        return res.json({
          id: 'demo-user-123',
          name: 'Alice Vance',
          coinBalance: 250,
          reputation: 45,
          rank: 'Silver',
          skills: ['UI/UX', 'Product Management', 'React Native'],
          interests: ['CleanTech', 'HealthTech'],
          achievements: ['First Steps (Account Created)', 'Ideator Spark'],
          bio: 'Product Designer turned developer passionate about solving ecological issues and sustainability.',
          tagline: 'Lead Designer @ EcoScan',
          profilePhoto: 'preset-1',
          characterAvatar: 'hacker',
          githubUrl: 'https://github.com/alicevance',
          linkedinUrl: 'https://linkedin.com/in/alicevance'
        });
      }
      if (req.params.id === 'demo-user-456') {
        return res.json({
          id: 'demo-user-456',
          name: 'Bob Chen',
          coinBalance: 320,
          reputation: 60,
          rank: 'Gold',
          skills: ['React', 'Node.js', 'Game Design'],
          interests: ['EdTech', 'AI/ML'],
          achievements: ['First Steps (Account Created)', 'DAO Citizen', 'Skill Builder'],
          bio: 'Full stack developer who loves gamifying education, programming interactive quests, and compiling code.',
          tagline: 'Game Architect @ EduQuest',
          profilePhoto: 'preset-2',
          characterAvatar: 'robo',
          githubUrl: 'https://github.com/bobchen',
          linkedinUrl: 'https://linkedin.com/in/bobchen'
        });
      }
      return res.status(404).json({ msg: 'User not found' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
