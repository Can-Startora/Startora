if (!global.crypto) {
  global.crypto = require('crypto');
}
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

// Define in-memory caches
let collections = {
  users: [],
  ideas: [],
  communities: [],
  messages: [],
  proposals: [],
  transactions: []
};

// Define Mongoose Schemas & Models
const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coinBalance: { type: Number, default: 0 },
  reputation: { type: Number, default: 0 },
  rank: { type: String, default: 'Bronze' },
  skills: [{ type: String }],
  interests: [{ type: String }],
  bio: { type: String, default: '' },
  tagline: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  profilePhoto: { type: String, default: '' },
  characterAvatar: { type: String, default: 'robo' },
  avatarColor: { type: String, default: 'teal' },
  achievements: [{ type: String }]
}, { minimize: false });
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

const CommentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Number, default: Date.now }
});

const IdeaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  targetAudience: { type: String, default: '' },
  teamRequirements: { type: String, default: '' },
  stage: { type: String, default: 'Ideation' },
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true },
  votes: [{ type: String }],
  comments: [CommentSchema],
  blockchainHash: { type: String, default: '' },
  blockchainTx: { type: String, default: '' },
  ipfsHash: { type: String, default: '' },
  blockNumber: { type: Number, default: 0 },
  timestamp: { type: Number, default: Date.now }
});
const IdeaModel = mongoose.models.Idea || mongoose.model('Idea', IdeaSchema);

const CommunitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  members: [{ type: String }],
  membersCount: { type: Number, default: 0 }
});
const CommunityModel = mongoose.models.Community || mongoose.model('Community', CommunitySchema);

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  communityId: { type: String, required: true },
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Number, default: Date.now }
});
const MessageModel = mongoose.models.Message || mongoose.model('Message', MessageSchema);

const ProposalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  creatorId: { type: String, required: true },
  creatorName: { type: String, required: true },
  votes: {
    yes: [{ type: String }],
    no: [{ type: String }]
  },
  votesWeight: {
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
  },
  status: { type: String, default: 'active' },
  createdAt: { type: Number, default: Date.now },
  expiresAt: { type: Number, required: true }
});
const ProposalModel = mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema);

const TransactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  timestamp: { type: Number, default: Date.now }
});
const TransactionModel = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

// Mongoose Connection Setup
const mongoURI = process.env.MongoDB_Atlas || process.env.MONGO_URI;

function getModelFor(name) {
  switch (name) {
    case 'users': return UserModel;
    case 'ideas': return IdeaModel;
    case 'communities': return CommunityModel;
    case 'messages': return MessageModel;
    case 'proposals': return ProposalModel;
    case 'transactions': return TransactionModel;
    default: throw new Error(`Unknown model for collection: ${name}`);
  }
}

// Initialize database data
async function initDatabase() {
  if (mongoURI) {
    try {
      await mongoose.connect(mongoURI);
      console.log("🚀 Connected to MongoDB Atlas successfully!");

      // Load collections from MongoDB
      for (const name of Object.keys(collections)) {
        const Model = getModelFor(name);
        const docs = await Model.find({}).lean();
        if (docs && docs.length > 0) {
          collections[name] = docs.map(d => {
            const { _id, __v, ...cleanDoc } = d;
            return cleanDoc;
          });
        } else {
          // If empty in database, seed defaults
          const defaults = getDefaultsFor(name);
          collections[name] = defaults;
          await Model.insertMany(defaults);
          console.log(`🌱 Seeded ${name} collection in MongoDB`);
        }
      }
    } catch (err) {
      console.error("⚠️ Critical: Failed to connect to MongoDB Atlas:", err);
      process.exit(1);
    }
  } else {
    console.error("⚠️ Critical: MongoDB URI (MongoDB_Atlas) not configured in environment!");
    process.exit(1);
  }
}

function saveDocument(collectionName, doc) {
  // Update in-memory array first (synchronously)
  const idx = collections[collectionName].findIndex(d => d.id === doc.id);
  if (idx === -1) {
    collections[collectionName].push(doc);
  } else {
    collections[collectionName][idx] = doc;
  }

  // Update MongoDB exclusively
  const Model = getModelFor(collectionName);
  Model.replaceOne({ id: doc.id }, doc, { upsert: true })
    .catch(err => console.error(`Error saving ${collectionName} doc to MongoDB:`, err));
}

// Seed Data definition
function getDefaultsFor(name) {
  if (name === 'communities') {
    return [
      {
        id: 'comm-1',
        name: 'FinTech Builders',
        description: 'Decentralized finance, payment gateways, and banking solutions of tomorrow.',
        category: 'FinTech',
        members: ['system-user'],
        membersCount: 124
      },
      {
        id: 'comm-2',
        name: 'AI & Intelligence Systems',
        description: 'Applying NLP, computer vision, and predictive analytics to resolve real-world problems.',
        category: 'AI/ML',
        members: ['system-user'],
        membersCount: 342
      },
      {
        id: 'comm-3',
        name: 'Eco-Tech & Sustainability',
        description: 'Innovating for green energy, circular economies, and lower carbon footprints.',
        category: 'CleanTech',
        members: [],
        membersCount: 88
      },
      {
        id: 'comm-4',
        name: 'EdTech & Digital Learning',
        description: 'Redefining student life, personalized study systems, and classroom productivity tools.',
        category: 'EdTech',
        members: [],
        membersCount: 156
      },
      {
        id: 'comm-5',
        name: 'Health & Vitality Tracker',
        description: 'Digital health ecosystems, workout companions, and personalized diet planners.',
        category: 'HealthTech',
        members: [],
        membersCount: 95
      }
    ];
  }

  if (name === 'proposals') {
    const now = Date.now();
    return [
      {
        id: 'prop-1',
        title: 'Allocate 5000 Launchpad Coins for Monthly Startup Grant',
        description: 'Should the Virtual Startup Launchpad DAO distribute a grand pool of 5000 coins to the highest upvoted startup idea this month?',
        category: 'Funding',
        creatorId: 'system',
        creatorName: 'Launchpad Admin',
        votes: { yes: [], no: [] },
        votesWeight: { yes: 0, no: 0 },
        status: 'active',
        createdAt: now - (2 * 24 * 60 * 60 * 1000),
        expiresAt: now + (5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'prop-2',
        title: 'Integrate Polygon Mumbai/Amoy Testnet deployment guides',
        description: 'Proposal to dedicate development coins for creating an interactive guided course on smart contract deployment for all members.',
        category: 'Feature Request',
        creatorId: 'system',
        creatorName: 'Launchpad Admin',
        votes: { yes: [], no: [] },
        votesWeight: { yes: 0, no: 0 },
        status: 'active',
        createdAt: now - (1 * 24 * 60 * 60 * 1000),
        expiresAt: now + (2 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  if (name === 'messages') {
    return [
      {
        id: 'msg-1',
        communityId: 'comm-2',
        senderId: 'system',
        senderName: 'Nova AI',
        text: 'Welcome to the AI & Intelligence Systems Hub! Pitch your project ideas here, and feel free to request an AI Feasibility Analysis!',
        timestamp: Date.now() - (60 * 60 * 1000)
      },
      {
        id: 'msg-2',
        communityId: 'comm-1',
        senderId: 'system',
        senderName: 'Fintech Bot',
        text: 'Welcome to FinTech Builders! Post your payments, Web3, or lending ideas to collaborate with other developers.',
        timestamp: Date.now() - (120 * 60 * 1000)
      }
    ];
  }

  if (name === 'ideas') {
    const now = Date.now();
    return [
      {
        id: 'idea-1',
        title: 'SmartStore Eco-Scan',
        category: 'CleanTech',
        description: 'An AI-powered mobile app that scans grocery receipts, tracks carbon footprint, and recommends locally-sourced sustainable alternatives with coin rewards.',
        problem: 'Consumers struggle to track the ecological impact of their daily grocery shopping and lack incentives to switch to eco-friendly products.',
        solution: 'Use OCR to read receipts, index items against a carbon database, and issue digital store vouchers to incentivize planet-first options.',
        targetAudience: 'Environmentally-conscious urban shoppers, grocery chains, and local eco-brands.',
        teamRequirements: 'Requires a mobile developer (React Native), data analyst for carbon API, and a marketer for brand onboarding.',
        stage: 'Validation',
        ownerId: 'demo-user-123',
        ownerName: 'Alice Vance',
        votes: ['demo-user-456'],
        comments: [
          {
            id: 'c-1',
            senderId: 'demo-user-456',
            senderName: 'Bob Chen',
            text: 'I love this idea! It aligns perfectly with supermarket loyalty programs. Have you thought about partnering with organic local cooperatives?',
            timestamp: now - (50 * 60 * 1000)
          }
        ],
        blockchainHash: '0xa4b19c8f309a473f32e185c19208a38cb627e1f14890c29f44b25e76a084c7bd',
        blockchainTx: '0x32ba71f8b44a2c0eb4e28cdb1a03e1a0b73dfef5629c1da7f8b54e1957245b0a',
        ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
        blockNumber: 15423012,
        timestamp: now - (3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'idea-2',
        title: 'EduQuest Gamified Coding',
        category: 'EdTech',
        description: 'A platform that converts programming courses into multiplayer dungeon crawler quests where students compile code to defeat bosses and team up for lab assignments.',
        problem: 'Traditional computer science education is text-heavy and has high dropout rates due to lack of engagement.',
        solution: 'Gamify structural components of coding (functions, loops, classes) into spells and weapons used in team-based dungeon runs.',
        targetAudience: 'CS students, bootcamps, and teachers seeking engaging visual materials.',
        teamRequirements: 'React developer, 2D game designer, Node backend engineer.',
        stage: 'Prototyping',
        ownerId: 'demo-user-456',
        ownerName: 'Bob Chen',
        votes: ['demo-user-123'],
        comments: [],
        blockchainHash: '0x3e185c19208a38cb627e1f14890c29f44b25e76a084c7bda4b19c8f309a473f32e',
        blockchainTx: '0xcb4e28cdb1a03e1a0b73dfef5629c1da7f8b54e1957245b0a32ba71f8b44a2c0eb',
        ipfsHash: 'QmT5NyN41hT24xHhT235S92c73SDFGg482fshsg4y6KDFs',
        blockNumber: 15423854,
        timestamp: now - (1.5 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  return [];
}

// Database Actions
const db = {
  users: {
    find: () => collections.users,
    findById: (id) => collections.users.find(u => u.id === id),
    findByEmail: (email) => collections.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
    create: (userData) => {
      const newUser = {
        id: uuidv4(),
        coinBalance: 0,
        reputation: 0,
        rank: 'Bronze',
        skills: [],
        interests: [],
        achievements: [],
        ...userData
      };
      saveDocument('users', newUser);
      return newUser;
    },
    update: (id, updates) => {
      const idx = collections.users.findIndex(u => u.id === id);
      if (idx === -1) return null;
      collections.users[idx] = { ...collections.users[idx], ...updates };
      saveDocument('users', collections.users[idx]);
      return collections.users[idx];
    },
    updateCoins: (id, amount, description) => {
      const idx = collections.users.findIndex(u => u.id === id);
      if (idx === -1) return null;
      collections.users[idx].coinBalance += amount;
      
      // Recalculate rank based on reputation/coins
      const balance = collections.users[idx].coinBalance;
      if (balance > 1000) collections.users[idx].rank = 'Platinum';
      else if (balance > 500) collections.users[idx].rank = 'Gold';
      else if (balance > 250) collections.users[idx].rank = 'Silver';
      else collections.users[idx].rank = 'Bronze';

      saveDocument('users', collections.users[idx]);

      // Log transaction
      db.transactions.create(id, amount > 0 ? 'EARN' : 'SPEND', amount, description);
      return collections.users[idx];
    },
    updateReputation: (id, amount) => {
      const idx = collections.users.findIndex(u => u.id === id);
      if (idx === -1) return null;
      collections.users[idx].reputation = Math.max(0, collections.users[idx].reputation + amount);
      saveDocument('users', collections.users[idx]);
      return collections.users[idx];
    }
  },

  ideas: {
    find: () => collections.ideas,
    findById: (id) => collections.ideas.find(i => i.id === id),
    create: (ideaData) => {
      const newIdea = {
        id: uuidv4(),
        votes: [],
        comments: [],
        stage: 'Ideation',
        blockchainHash: '',
        blockchainTx: '',
        ipfsHash: '',
        blockNumber: 0,
        timestamp: Date.now(),
        ...ideaData
      };
      saveDocument('ideas', newIdea);
      return newIdea;
    },
    update: (id, updates) => {
      const idx = collections.ideas.findIndex(i => i.id === id);
      if (idx === -1) return null;
      collections.ideas[idx] = { ...collections.ideas[idx], ...updates };
      saveDocument('ideas', collections.ideas[idx]);
      return collections.ideas[idx];
    },
    vote: (id, userId) => {
      const idx = collections.ideas.findIndex(i => i.id === id);
      if (idx === -1) return null;
      
      const voteIdx = collections.ideas[idx].votes.indexOf(userId);
      let diff = 0;
      if (voteIdx === -1) {
        collections.ideas[idx].votes.push(userId);
        diff = 1;
      } else {
        collections.ideas[idx].votes.splice(voteIdx, 1);
        diff = -1;
      }
      saveDocument('ideas', collections.ideas[idx]);
      return { idea: collections.ideas[idx], diff };
    },
    addComment: (id, commentData) => {
      const idx = collections.ideas.findIndex(i => i.id === id);
      if (idx === -1) return null;
      
      const newComment = {
        id: uuidv4(),
        timestamp: Date.now(),
        ...commentData
      };
      collections.ideas[idx].comments.push(newComment);
      saveDocument('ideas', collections.ideas[idx]);
      return newComment;
    }
  },

  communities: {
    find: () => collections.communities,
    findById: (id) => collections.communities.find(c => c.id === id),
    join: (id, userId) => {
      const idx = collections.communities.findIndex(c => c.id === id);
      if (idx === -1) return null;
      
      const memberIdx = collections.communities[idx].members.indexOf(userId);
      if (memberIdx === -1) {
        collections.communities[idx].members.push(userId);
        collections.communities[idx].membersCount += 1;
      } else {
        collections.communities[idx].members.splice(memberIdx, 1);
        collections.communities[idx].membersCount = Math.max(0, collections.communities[idx].membersCount - 1);
      }
      saveDocument('communities', collections.communities[idx]);
      return collections.communities[idx];
    }
  },

  messages: {
    findByCommunity: (communityId) => collections.messages.filter(m => m.communityId === communityId),
    create: (msgData) => {
      const newMsg = {
        id: uuidv4(),
        timestamp: Date.now(),
        ...msgData
      };
      saveDocument('messages', newMsg);
      return newMsg;
    }
  },

  proposals: {
    find: () => collections.proposals,
    findById: (id) => collections.proposals.find(p => p.id === id),
    create: (proposalData) => {
      const newProposal = {
        id: uuidv4(),
        votes: { yes: [], no: [] },
        votesWeight: { yes: 0, no: 0 },
        status: 'active',
        createdAt: Date.now(),
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000),
        ...proposalData
      };
      saveDocument('proposals', newProposal);
      return newProposal;
    },
    vote: (id, userId, option, weight) => {
      const idx = collections.proposals.findIndex(p => p.id === id);
      if (idx === -1) return null;

      const prop = collections.proposals[idx];
      const hasVotedYes = prop.votes.yes.includes(userId);
      const hasVotedNo = prop.votes.no.includes(userId);

      if (hasVotedYes || hasVotedNo) {
        return { error: 'User has already voted' };
      }

      prop.votes[option].push(userId);
      prop.votesWeight[option] += weight;

      saveDocument('proposals', prop);
      return prop;
    }
  },

  transactions: {
    findByUser: (userId) => collections.transactions.filter(t => t.userId === userId).sort((a,b) => b.timestamp - a.timestamp),
    create: (userId, type, amount, description) => {
      const newTx = {
        id: uuidv4(),
        userId,
        type,
        amount: Math.abs(amount),
        description,
        timestamp: Date.now()
      };
      saveDocument('transactions', newTx);
      return newTx;
    }
  }
};

// Start database connection
initDatabase();

module.exports = db;
