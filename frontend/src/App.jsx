import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Rocket, 
  Users, 
  Coins, 
  ShieldCheck, 
  Vote, 
  Wallet, 
  User, 
  MessageSquare, 
  Bot,
  ThumbsUp, 
  Cpu, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Info,
  LogOut,
  RefreshCw,
  Search,
  Sparkles,
  Trophy,
  ExternalLink,
  Award,
  X,
  Github,
  Linkedin,
  Camera
} from 'lucide-react';
import { ethers } from 'ethers';
import appLogo from './App_logo.png';

// Setup API Base URL (Vite proxy will route /api to localhost:5000)
const API_URL = '';

function CharacterAvatar({ avatar, color = 'teal', className = "w-24 h-24" }) {
  const colors = {
    teal: { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)', bg: '#083344' },
    violet: { primary: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.4)', bg: '#2e1065' },
    pink: { primary: '#ec4899', glow: 'rgba(236, 72, 153, 0.4)', bg: '#500724' },
    gold: { primary: '#eab308', glow: 'rgba(234, 179, 8, 0.4)', bg: '#422006' }
  };
  
  const activeColor = colors[color] || colors.teal;
  const p = activeColor.primary;
  const g = activeColor.glow;
  const bg = activeColor.bg;

  // Render SVG based on avatar key
  switch (avatar) {
    case 'hacker':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: `drop-shadow(0 0 8px ${p}55)` }}>
          <defs>
            <linearGradient id={`hackerGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={p} />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <pattern id={`matrix-${color}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke={`${p}22`} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" rx="20" fill="#090d16" stroke={`${p}33`} strokeWidth="1" />
          <rect width="100" height="100" rx="20" fill={`url(#matrix-${color})`} />
          <circle cx="50" cy="50" r="35" fill="none" stroke={`${p}11`} strokeWidth="1" strokeDasharray="3 3" />
          
          <path d="M25 85 C25 65 35 55 50 55 C65 55 75 65 75 85 Z" fill="#1e293b" stroke={`${p}44`} strokeWidth="1.5" />
          <path d="M35 80 C35 55 42 45 50 45 C58 45 65 55 65 80" fill="#0f172a" />
          <rect x="40" y="55" width="20" height="8" rx="2" fill="#020617" stroke={p} strokeWidth="1.5" />
          <line x1="43" y1="59" x2="57" y2="59" stroke={p} strokeWidth="1" strokeDasharray="1 2" className="animate-pulse" />
          
          <path d="M30 40 L35 30 L45 25" fill="none" stroke={p} strokeWidth="1" />
          <circle cx="45" cy="25" r="1.5" fill={p} />
          <path d="M70 40 L65 30 L55 25" fill="none" stroke={p} strokeWidth="1" />
          <circle cx="55" cy="25" r="1.5" fill={p} />
          <path d="M50 20 L50 45" fill="none" stroke={p} strokeWidth="0.75" strokeDasharray="2 2" />
        </svg>
      );
    case 'ninja':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: `drop-shadow(0 0 8px ${p}55)` }}>
          <rect width="100" height="100" rx="20" fill="#090d16" stroke={`${p}33`} strokeWidth="1" />
          <line x1="15" y1="15" x2="85" y2="85" stroke={p} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="85" y1="15" x2="15" y2="85" stroke={p} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="38" fill="#090d16" />
          
          <circle cx="50" cy="48" r="22" fill="#1e293b" stroke={`${p}44`} strokeWidth="1.5" />
          <path d="M34 44 Q50 36 66 44 Q60 52 50 52 Q40 52 34 44 Z" fill="#0f172a" />
          
          <circle cx="43" cy="44" r="2" fill={p} />
          <path d="M39 42 Q43 43 47 42" fill="none" stroke={p} strokeWidth="1" />
          <circle cx="57" cy="44" r="2" fill={p} />
          <path d="M53 42 Q57 43 61 42" fill="none" stroke={p} strokeWidth="1" />
          
          <path d="M50 26 Q40 20 42 12 Q50 18 50 26" fill={p} />
          <path d="M50 26 Q60 20 58 12 Q50 18 50 26" fill={p} />
          
          <path d="M30 35 Q50 32 70 35" fill="none" stroke={p} strokeWidth="2.5" />
        </svg>
      );
    case 'robo':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: `drop-shadow(0 0 8px ${p}55)` }}>
          <rect width="100" height="100" rx="20" fill="#090d16" stroke={`${p}33`} strokeWidth="1" />
          <line x1="50" y1="28" x2="50" y2="16" stroke="#475569" strokeWidth="2" />
          <circle cx="50" cy="14" r="4" fill={p} className="animate-pulse" />
          
          <rect x="28" y="28" width="44" height="38" rx="8" fill="#1e293b" stroke={`${p}55`} strokeWidth="1.5" />
          <rect x="34" y="34" width="32" height="22" rx="4" fill="#0f172a" stroke={p} strokeWidth="1.5" />
          
          <text x="39" y="48" fill={p} fontSize="10" fontWeight="bold" fontFamily="monospace">{"{"}</text>
          <text x="55" y="48" fill={p} fontSize="10" fontWeight="bold" fontFamily="monospace">{"}"}</text>
          <circle cx="50" cy="45" r="1.5" fill={p} className="animate-ping" />
          
          <rect x="44" y="66" width="12" height="10" fill="#475569" stroke={`${p}33`} strokeWidth="1" />
          <path d="M20 85 C20 78 30 76 50 76 C70 76 80 78 80 85 Z" fill="#1e293b" stroke={`${p}33`} strokeWidth="1" />
          <circle cx="50" cy="81" r="2.5" fill={p} />
        </svg>
      );
    case 'astro':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: `drop-shadow(0 0 8px ${p}55)` }}>
          <rect width="100" height="100" rx="20" fill="#090d16" stroke={`${p}33`} strokeWidth="1" />
          <circle cx="25" cy="25" r="0.75" fill="#fff" />
          <circle cx="75" cy="30" r="0.5" fill="#fff" />
          <circle cx="30" cy="70" r="0.5" fill="#fff" />
          <circle cx="80" cy="65" r="0.75" fill="#fff" />
          
          <circle cx="50" cy="48" r="24" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <ellipse cx="50" cy="46" rx="18" ry="14" fill="#0f172a" stroke={p} strokeWidth="2" />
          
          <path d="M48 42 L52 42 L52 48 L50 51 L48 48 Z" fill={p} opacity="0.8" />
          <path d="M47 48 L45 50 L47 50 Z" fill={p} opacity="0.6" />
          <path d="M53 48 L55 50 L53 50 Z" fill={p} opacity="0.6" />
          <path d="M50 51 L48 55 L52 55 Z" fill="#ef4444" opacity="0.8" />
          
          <path d="M30 68 C30 68 35 76 50 76 C65 76 70 68 70 68" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          <rect x="42" y="74" width="16" height="4" rx="1" fill={p} />
          
          <path d="M22 85 C22 80 32 78 50 78 C68 78 78 80 78 85 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
        </svg>
      );
    case 'synth':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: `drop-shadow(0 0 8px ${p}55)` }}>
          <rect width="100" height="100" rx="20" fill="#090d16" stroke={`${p}33`} strokeWidth="1" />
          <path d="M10 30 H30 L40 40 V60 L30 70 H10" fill="none" stroke={`${p}11`} strokeWidth="1" />
          <path d="M90 30 H70 L60 40 V60 L70 70 H90" fill="none" stroke={`${p}11`} strokeWidth="1" />
          
          <path d="M50 22 C34 22 34 40 34 52 C34 66 42 75 50 75 C58 75 66 66 66 52 C66 40 66 22 50 22 Z" fill="#1e293b" stroke={`${p}33`} strokeWidth="1.5" />
          
          <line x1="50" y1="28" x2="42" y2="38" stroke={p} strokeWidth="1" />
          <line x1="50" y1="28" x2="58" y2="38" stroke={p} strokeWidth="1" />
          <line x1="42" y1="38" x2="46" y2="48" stroke={p} strokeWidth="1" />
          <line x1="58" y1="38" x2="54" y2="48" stroke={p} strokeWidth="1" />
          <line x1="46" y1="48" x2="50" y2="60" stroke={p} strokeWidth="1" />
          <line x1="54" y1="48" x2="50" y2="60" stroke={p} strokeWidth="1" />
          
          <circle cx="50" cy="28" r="2.5" fill={p} />
          <circle cx="42" cy="38" r="2" fill={p} />
          <circle cx="58" cy="38" r="2" fill={p} />
          <circle cx="46" cy="48" r="2" fill={p} />
          <circle cx="54" cy="48" r="2" fill={p} />
          <circle cx="50" cy="60" r="3" fill={p} className="animate-pulse" />
          
          <rect x="40" y="52" width="6" height="2" rx="0.5" fill={p} />
          <rect x="54" y="52" width="6" height="2" rx="0.5" fill={p} />
        </svg>
      );
    case 'sage':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: `drop-shadow(0 0 8px ${p}55)` }}>
          <rect width="100" height="100" rx="20" fill="#090d16" stroke={`${p}33`} strokeWidth="1" />
          <polygon points="25,20 22,25 28,25" fill="none" stroke={p} strokeWidth="1" className="animate-float" />
          <polygon points="75,22 78,27 72,27" fill="none" stroke={p} strokeWidth="1" className="animate-float" />
          <rect x="20" y="65" width="4" height="4" fill="none" stroke={p} strokeWidth="1" transform="rotate(45 22 67)" className="animate-float" />
          <rect x="76" y="60" width="4" height="4" fill="none" stroke={p} strokeWidth="1" transform="rotate(15 78 62)" className="animate-float" />
          
          <path d="M24 85 C24 55 32 30 50 30 C68 30 76 55 76 85 Z" fill="#312e81" stroke={`${p}44`} strokeWidth="1.5" />
          <path d="M32 85 C32 60 38 40 50 40 C62 40 68 60 68 85" fill="#1e1b4b" />
          
          <circle cx="45" cy="56" r="3" fill="none" stroke={p} strokeWidth="1.5" />
          <circle cx="45" cy="56" r="1" fill={p} />
          <path d="M50 44 L48 48 L52 48 Z M50 51 L48 49 L52 49 Z" fill={p} />
          
          <path d="M38 78 Q50 82 62 78" fill="none" stroke={p} strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );
    default:
      return (
        <div className={`${className} rounded-2xl bg-gradient-to-tr from-neonteal to-neonviolet flex items-center justify-center font-bold text-lg text-white`}>
          Avatar
        </div>
      );
  }
}

function ProfilePhoto({ photo, name = "User", className = "w-10 h-10" }) {
  if (photo && photo.startsWith('data:image/')) {
    return (
      <div className={`${className} rounded-full overflow-hidden border border-white/10 shrink-0`}>
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  const presets = {
    'preset-1': { bg: 'from-cyan-500 to-blue-600', stroke: '#06b6d4', emoji: '🧑‍💻' },
    'preset-2': { bg: 'from-violet-500 to-fuchsia-600', stroke: '#8b5cf6', emoji: '👩‍💻' },
    'preset-3': { bg: 'from-pink-500 to-rose-600', stroke: '#ec4899', emoji: '🧠' },
    'preset-4': { bg: 'from-amber-400 to-orange-600', stroke: '#fbbf24', emoji: '🚀' },
    'preset-5': { bg: 'from-emerald-400 to-teal-600', stroke: '#34d399', emoji: '⚙️' },
    'preset-6': { bg: 'from-purple-500 to-indigo-600', stroke: '#a78bfa', emoji: '🎨' }
  };

  const preset = presets[photo] || null;

  if (preset) {
    return (
      <div className={`${className} rounded-full bg-gradient-to-tr ${preset.bg} p-0.5 border border-white/10 shrink-0 flex items-center justify-center text-xl`}>
        <div className="w-full h-full rounded-full bg-darkbg/40 flex items-center justify-center">
          {preset.emoji}
        </div>
      </div>
    );
  }

  const colors = [
    'from-neonteal to-cyan-600',
    'from-neonviolet to-indigo-600',
    'from-neonpink to-fuchsia-600',
    'from-yellow-400 to-orange-500',
    'from-emerald-500 to-teal-700'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  const gradient = colors[colorIndex];
  
  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'LP';

  return (
    <div className={`${className} rounded-full bg-gradient-to-tr ${gradient} p-0.5 border border-white/10 shrink-0`}>
      <div className="w-full h-full rounded-full bg-darkcard flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white">
        {initials}
      </div>
    </div>
  );
}

export default function App() {
  // Connection and Authentication State
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, connected, demo
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  // Application Data States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ideas, setIdeas] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  
  // UI Control States
  const [notification, setNotification] = useState(null);
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  // New Idea Form State
  const [newIdeaForm, setNewIdeaForm] = useState({
    title: '', category: 'AI/ML', description: '', problem: '', solution: '', targetAudience: '', teamRequirements: ''
  });
  const [isSubmittingIdea, setIsSubmittingIdea] = useState(false);

  // New Proposal Form State
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '', description: '', category: 'Funding'
  });

  // AI & Web3 specific states
  const [aiReport, setAiReport] = useState(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [metaMaskAddress, setMetaMaskAddress] = useState(localStorage.getItem('metaMaskAddress') || '');
  const [isBlockchainLoading, setIsBlockchainLoading] = useState(false);

  // Chatbot states
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Welcome to your Launchpad Co-pilot! I can guide you on what steps to take next, how the coin economy works, and why/how to use the platform's features. Try asking me a question or clicking a quick reply chip below!"
    }
  ]);
  const [chatbotInput, setChatbotInput] = useState('');
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);

  // Profile Edit States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSkills, setProfileSkills] = useState('');
  const [profileInterests, setProfileInterests] = useState('');
  const [viewingUserProfile, setViewingUserProfile] = useState(null);
  const [isProfileModalLoading, setIsProfileModalLoading] = useState(false);
  const [avatarColor, setAvatarColor] = useState('teal');
  const [profileBio, setProfileBio] = useState('');
  const [profileTagline, setProfileTagline] = useState('');
  const [profileGithub, setProfileGithub] = useState('');
  const [profileLinkedin, setProfileLinkedin] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('robo');

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  // 1. Dual-Mode DB / Client Check
  useEffect(() => {
    // Dynamic API base URL configuration for Android / Network devices
    const isLocalWeb = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isCapacitor = window.location.origin.includes('capacitor://') || window.location.port === '';
    
    if (isCapacitor || !isLocalWeb) {
      axios.defaults.baseURL = 'http://192.168.31.240:5000';
    } else {
      axios.defaults.baseURL = ''; // Use local proxy in development
    }

    const checkConnection = async () => {
      try {
        const res = await axios.get('/api/health');
        if (res.data.status === 'ok') {
          setBackendStatus('connected');
          console.log("🚀 Launchpad Server Connected!");
        } else {
          setBackendStatus('demo');
        }
      } catch (err) {
        setBackendStatus('demo');
        console.warn("⚠️ Launchpad Server offline. Running in premium Local-Demo mode.");
      }
    };
    checkConnection();
  }, []);

  // Sync demo user changes to demo_users dictionary
  useEffect(() => {
    if (backendStatus === 'demo' && user && user.email) {
      const demoUsers = JSON.parse(localStorage.getItem('demo_users') || '{}');
      demoUsers[user.email.toLowerCase()] = user;
      localStorage.setItem('demo_users', JSON.stringify(demoUsers));
    }
  }, [user, backendStatus]);

  // 2. Fetch User & App Data based on status and token
  useEffect(() => {
    if (backendStatus === 'checking') return;

    if (backendStatus === 'connected') {
      if (token) {
        // Server Mode
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchServerData();
      } else {
        // No token on connected server -> force login overlay
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
      }
    } else {
      // Demo Mode - Load from Local Storage
      loadDemoData();
    }
  }, [backendStatus, token]);

  // Fetch from Node backend
  const fetchServerData = async () => {
    try {
      const userRes = await axios.get('/api/auth/user');
      setUser(userRes.data);
      setProfileSkills(userRes.data.skills.join(', '));
      setProfileInterests(userRes.data.interests.join(', '));
      setProfileBio(userRes.data.bio || '');
      setProfileTagline(userRes.data.tagline || '');
      setProfileGithub(userRes.data.githubUrl || '');
      setProfileLinkedin(userRes.data.linkedinUrl || '');
      setProfilePhoto(userRes.data.profilePhoto || '');
      setProfileAvatar(userRes.data.characterAvatar || 'robo');
      setAvatarColor(userRes.data.avatarColor || 'teal');

      const ideasRes = await axios.get('/api/ideas');
      setIdeas(ideasRes.data);

      const commRes = await axios.get('/api/communities');
      setCommunities(commRes.data);

      const propRes = await axios.get('/api/dao/proposals');
      setProposals(propRes.data);

      const txRes = await axios.get('/api/coins/transactions');
      setTransactions(txRes.data);
    } catch (err) {
      console.error("Error fetching server data, switching to demo mode", err);
      setBackendStatus('demo');
      loadDemoData();
    }
  };

  // Load from LocalStorage
  const loadDemoData = () => {
    const storedUser = localStorage.getItem('demo_user');
    const storedIdeas = localStorage.getItem('demo_ideas');
    const storedComms = localStorage.getItem('demo_communities');
    const storedProps = localStorage.getItem('demo_proposals');
    const storedTxs = localStorage.getItem('demo_transactions');
    const storedMsgs = localStorage.getItem('demo_messages');

    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setProfileSkills(u.skills.join(', '));
      setProfileInterests(u.interests.join(', '));
      setProfileBio(u.bio || '');
      setProfileTagline(u.tagline || '');
      setProfileGithub(u.githubUrl || '');
      setProfileLinkedin(u.linkedinUrl || '');
      setProfilePhoto(u.profilePhoto || '');
      setProfileAvatar(u.characterAvatar || 'robo');
      setAvatarColor(u.avatarColor || 'teal');
    }

    // Load or seed Ideas
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas));
    } else {
      const defaultIdeas = [
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
              timestamp: Date.now() - 3600000
            }
          ],
          blockchainHash: '0xa4b19c8f309a473f32e185c19208a38cb627e1f14890c29f44b25e76a084c7bd',
          blockchainTx: '0x32ba71f8b44a2c0eb4e28cdb1a03e1a0b73dfef5629c1da7f8b54e1957245b0a',
          ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
          blockNumber: 15423012,
          timestamp: Date.now() - 259200000
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
          votes: [],
          comments: [],
          blockchainHash: '',
          blockchainTx: '',
          ipfsHash: '',
          blockNumber: 0,
          timestamp: Date.now() - 86400000
        }
      ];
      setIdeas(defaultIdeas);
      localStorage.setItem('demo_ideas', JSON.stringify(defaultIdeas));
    }

    // Load or seed Communities
    if (storedComms) {
      setCommunities(JSON.parse(storedComms));
    } else {
      const defaultComms = [
        { id: 'comm-1', name: 'FinTech Builders', description: 'Decentralized finance, payment gateways, and banking solutions.', category: 'FinTech', members: ['demo-user-123'], membersCount: 124 },
        { id: 'comm-2', name: 'AI & Intelligence Systems', description: 'Applying NLP, computer vision, and predictive analytics to resolve real-world problems.', category: 'AI/ML', members: ['demo-user-123', 'demo-user-456'], membersCount: 342 },
        { id: 'comm-3', name: 'Eco-Tech & Sustainability', description: 'Innovating for green energy, circular economies, and lower carbon footprints.', category: 'CleanTech', members: [], membersCount: 88 },
        { id: 'comm-4', name: 'EdTech & Digital Learning', description: 'Redefining student study tools, collaborative research hubs, and visual courses.', category: 'EdTech', members: [], membersCount: 156 },
        { id: 'comm-5', name: 'Health & Vitality Tracker', description: 'Digital health ecosystems, workout companions, and personalized diet planners.', category: 'HealthTech', members: [], membersCount: 95 }
      ];
      setCommunities(defaultComms);
      localStorage.setItem('demo_communities', JSON.stringify(defaultComms));
    }

    // Load or seed DAO proposals
    if (storedProps) {
      setProposals(JSON.parse(storedProps));
    } else {
      const defaultProps = [
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
          createdAt: Date.now() - 172800000,
          expiresAt: Date.now() + 432000000
        },
        {
          id: 'prop-2',
          title: 'Integrate Polygon Mumbai/Amoy Testnet deployment guides',
          description: 'Proposal to dedicate development coins for creating an interactive guided course on smart contract deployment for all members.',
          category: 'Feature Request',
          creatorId: 'system',
          creatorName: 'Launchpad Admin',
          votes: { yes: ['demo-user-456'], no: [] },
          votesWeight: { yes: 250, no: 0 },
          status: 'active',
          createdAt: Date.now() - 86400000,
          expiresAt: Date.now() + 172800000
        }
      ];
      setProposals(defaultProps);
      localStorage.setItem('demo_proposals', JSON.stringify(defaultProps));
    }

    // Load Transactions
    if (storedTxs) {
      setTransactions(JSON.parse(storedTxs));
    } else {
      const defaultTxs = [
        { id: 'tx-1', userId: 'demo-user-123', type: 'EARN', amount: 100, description: 'Welcome Bonus', timestamp: Date.now() - 345600000 },
        { id: 'tx-2', userId: 'demo-user-123', type: 'EARN', amount: 50, description: 'Idea Submission: SmartStore Eco-Scan', timestamp: Date.now() - 259200000 }
      ];
      setTransactions(defaultTxs);
      localStorage.setItem('demo_transactions', JSON.stringify(defaultTxs));
    }

    // Load Messages
    if (storedMsgs) {
      setMessages(JSON.parse(storedMsgs));
    } else {
      const defaultMsgs = [
        { id: 'msg-1', communityId: 'comm-2', senderId: 'system', senderName: 'Nova AI', text: 'Welcome to the AI & Intelligence Systems Hub! Pitch your project ideas here, and feel free to request an AI Feasibility Analysis!', timestamp: Date.now() - 86400000 },
        { id: 'msg-2', communityId: 'comm-1', senderId: 'system', senderName: 'Fintech Bot', text: 'Welcome to FinTech Builders! Post your payments, Web3, or lending ideas to collaborate with other developers.', timestamp: Date.now() - 172800000 }
      ];
      setMessages(defaultMsgs);
      localStorage.setItem('demo_messages', JSON.stringify(defaultMsgs));
    }
  };

  // 3. User Register & Login
  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login
      if (backendStatus === 'connected') {
        try {
          const res = await axios.post('/api/auth/login', {
            email: authForm.email,
            password: authForm.password
          });
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          showNotification('Logged in successfully!', 'success');
        } catch (err) {
          showNotification(err.response?.data?.msg || 'Login failed', 'error');
        }
      } else {
        // Demo Auth
        const demoUsers = JSON.parse(localStorage.getItem('demo_users') || '{}');
        const userEmail = authForm.email.toLowerCase();
        let demoUserObj = demoUsers[userEmail];

        if (!demoUserObj) {
          demoUserObj = {
            id: `demo-user-${Date.now()}`,
            name: authForm.email.split('@')[0],
            email: authForm.email,
            coinBalance: 0,
            reputation: 0,
            rank: 'Bronze',
            skills: [],
            interests: [],
            achievements: [],
            bio: '',
            tagline: '',
            githubUrl: '',
            linkedinUrl: '',
            profilePhoto: '',
            characterAvatar: 'robo',
            avatarColor: 'teal'
          };
          demoUsers[userEmail] = demoUserObj;
          localStorage.setItem('demo_users', JSON.stringify(demoUsers));
        }

        setUser(demoUserObj);
        localStorage.setItem('demo_user', JSON.stringify(demoUserObj));
        showNotification('Running in local demo mode.', 'info');
      }
    } else {
      // Register
      if (backendStatus === 'connected') {
        try {
          const res = await axios.post('/api/auth/register', {
            name: authForm.name,
            email: authForm.email,
            password: authForm.password
          });
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          showNotification('Registration successful!', 'success');
        } catch (err) {
          showNotification(err.response?.data?.msg || 'Registration failed', 'error');
        }
      } else {
        // Demo Register
        const demoUsers = JSON.parse(localStorage.getItem('demo_users') || '{}');
        const userEmail = authForm.email.toLowerCase();

        const demoUserObj = {
          id: `demo-user-${Date.now()}`,
          name: authForm.name || authForm.email.split('@')[0],
          email: authForm.email,
          coinBalance: 0,
          reputation: 0,
          rank: 'Bronze',
          skills: [],
          interests: [],
          achievements: [],
          bio: '',
          tagline: '',
          githubUrl: '',
          linkedinUrl: '',
          profilePhoto: '',
          characterAvatar: 'robo',
          avatarColor: 'teal'
        };
        demoUsers[userEmail] = demoUserObj;
        localStorage.setItem('demo_users', JSON.stringify(demoUsers));

        setUser(demoUserObj);
        localStorage.setItem('demo_user', JSON.stringify(demoUserObj));
        showNotification('Account created in local demo mode!', 'success');
      }
    }
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('demo_user');
    delete axios.defaults.headers.common['Authorization'];
    showNotification('Logged out successfully.', 'info');
  };

  // 4. Update Profile
  const handleUpdateProfile = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const skillsArr = profileSkills.split(',').map(s => s.trim()).filter(Boolean);
    const interestsArr = profileInterests.split(',').map(i => i.trim()).filter(Boolean);

    const profileData = {
      skills: skillsArr,
      interests: interestsArr,
      bio: profileBio,
      tagline: profileTagline,
      githubUrl: profileGithub,
      linkedinUrl: profileLinkedin,
      profilePhoto: profilePhoto,
      characterAvatar: profileAvatar,
      avatarColor: avatarColor
    };

    if (backendStatus === 'connected') {
      try {
        const res = await axios.put('/api/auth/profile', profileData);
        setUser(res.data);
        setIsEditingProfile(false);
        showNotification('Profile updated successfully!', 'success');
      } catch (err) {
        showNotification('Failed to update profile', 'error');
      }
    } else {
      // Demo update
      let updatedUser = { 
        ...user, 
        skills: skillsArr, 
        interests: interestsArr,
        bio: profileBio,
        tagline: profileTagline,
        githubUrl: profileGithub,
        linkedinUrl: profileLinkedin,
        profilePhoto: profilePhoto,
        characterAvatar: profileAvatar,
        avatarColor: avatarColor
      };
      
      const achievements = [...user.achievements];
      let newTxs = [];
      let updatedCoins = user.coinBalance;

      if (!achievements.includes('Skill Builder') && skillsArr.length > 0) {
        achievements.push('Skill Builder');
        updatedCoins += 20;
        newTxs.push({ id: `tx-skill-${Date.now()}`, userId: user.id, type: 'EARN', amount: 20, description: 'Achievement: Skill Builder', timestamp: Date.now() });
      }

      // Check for Fully Detailed in Demo mode
      const hasBio = profileBio && profileBio.trim().length > 0;
      const hasTagline = profileTagline && profileTagline.trim().length > 0;
      const hasVisual = profilePhoto || profileAvatar;
      if (hasBio && hasTagline && hasVisual && !achievements.includes('Fully Detailed')) {
        achievements.push('Fully Detailed');
        updatedCoins += 50;
        newTxs.push({ id: `tx-detailed-${Date.now()}`, userId: user.id, type: 'EARN', amount: 50, description: 'Achievement: Fully Detailed', timestamp: Date.now() });
      }

      updatedUser.achievements = achievements;
      updatedUser.coinBalance = updatedCoins;

      if (newTxs.length > 0) {
        const updatedTxs = [...newTxs, ...transactions];
        setTransactions(updatedTxs);
        localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));
      }

      setUser(updatedUser);
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));

      const demoUsers = JSON.parse(localStorage.getItem('demo_users') || '{}');
      if (updatedUser.email) {
        demoUsers[updatedUser.email.toLowerCase()] = updatedUser;
        localStorage.setItem('demo_users', JSON.stringify(demoUsers));
      }

      setIsEditingProfile(false);
      showNotification('Profile updated locally.', 'success');
    }
  };

  // Open another user's profile modal
  const handleOpenUserProfile = async (userId, fallbackName = '') => {
    if (!userId) return;
    setIsProfileModalLoading(true);

    if (backendStatus === 'connected') {
      try {
        const res = await axios.get(`/api/auth/users/${userId}`);
        setViewingUserProfile(res.data);
      } catch (err) {
        // Fallback for demo users or failures
        setViewingUserProfile({
          id: userId,
          name: fallbackName || 'Student Builder',
          coinBalance: 150,
          reputation: 15,
          rank: 'Bronze',
          skills: ['Coding', 'Incubation'],
          interests: ['AI/ML', 'CleanTech'],
          achievements: ['First Steps (Account Created)'],
          bio: 'Collaborator and student entrepreneur on the Virtual Startup Launchpad.',
          tagline: 'Student Explorer',
          profilePhoto: '',
          characterAvatar: 'robo'
        });
      } finally {
        setIsProfileModalLoading(false);
      }
    } else {
      // Demo Mode profile lookup
      if (user && userId === user.id) {
        setViewingUserProfile(user);
        setIsProfileModalLoading(false);
        return;
      }

      // Check if seeded mock user
      if (userId === 'demo-user-123') {
        setViewingUserProfile({
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
      } else if (userId === 'demo-user-456') {
        setViewingUserProfile({
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
      } else {
        // Find if this user is in the comments or messages to build a dynamic profile page
        setViewingUserProfile({
          id: userId,
          name: fallbackName || 'Student Builder',
          coinBalance: 180,
          reputation: 20,
          rank: 'Bronze',
          skills: ['Development', 'Prototyping'],
          interests: ['AI/ML', 'EdTech'],
          achievements: ['First Steps (Account Created)'],
          bio: 'Collaborator and student builder at Virtual Startup Launchpad.',
          tagline: 'Tech Builder',
          profilePhoto: '',
          characterAvatar: 'ninja'
        });
      }
      setIsProfileModalLoading(false);
    }
  };

  // 5. Submit Startup Idea
  const handleSubmitIdea = async (e) => {
    e.preventDefault();
    setIsSubmittingIdea(true);

    if (backendStatus === 'connected') {
      try {
        const res = await axios.post('/api/ideas', newIdeaForm);
        setIdeas([res.data, ...ideas]);
        setIsSubmittingIdea(false);
        setNewIdeaForm({
          title: '', category: 'AI/ML', description: '', problem: '', solution: '', targetAudience: '', teamRequirements: ''
        });
        fetchServerData(); // refresh profile coins & transactions
        showNotification('Startup Idea submitted! Earned 50 Coins.', 'success');
      } catch (err) {
        showNotification(err.response?.data?.msg || 'Idea submission failed', 'error');
        setIsSubmittingIdea(false);
      }
    } else {
      // Demo submit
      const newIdea = {
        id: `idea-${Date.now()}`,
        ...newIdeaForm,
        ownerId: user.id,
        ownerName: user.name,
        votes: [],
        comments: [],
        blockchainHash: '',
        blockchainTx: '',
        ipfsHash: '',
        blockNumber: 0,
        timestamp: Date.now(),
        stage: 'Ideation'
      };

      const updatedIdeas = [newIdea, ...ideas];
      setIdeas(updatedIdeas);
      localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));

      // Coin updates
      const updatedUser = { ...user, coinBalance: user.coinBalance + 50, reputation: user.reputation + 15 };
      if (!updatedUser.achievements.includes('Ideator Spark')) {
        updatedUser.achievements.push('Ideator Spark');
        updatedUser.coinBalance += 25;
      }
      setUser(updatedUser);
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));

      // Transaction log
      const updatedTxs = [
        { id: `tx-${Date.now()}`, userId: user.id, type: 'EARN', amount: 50, description: `Idea Submission: ${newIdea.title}`, timestamp: Date.now() },
        ...transactions
      ];
      setTransactions(updatedTxs);
      localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

      setNewIdeaForm({
        title: '', category: 'AI/ML', description: '', problem: '', solution: '', targetAudience: '', teamRequirements: ''
      });
      setIsSubmittingIdea(false);
      showNotification('Startup Idea submitted locally! Earned 50 Coins.', 'success');
    }
  };

  // 6. Upvote Idea
  const handleVoteIdea = async (ideaId) => {
    if (backendStatus === 'connected') {
      try {
        const res = await axios.post(`/api/ideas/${ideaId}/vote`);
        // update ideas list
        setIdeas(ideas.map(i => i.id === ideaId ? res.data : i));
        fetchServerData(); // update balance
        showNotification('Upvote recorded!', 'success');
      } catch (err) {
        showNotification('Upvote failed', 'error');
      }
    } else {
      // Demo vote
      const updatedIdeas = ideas.map(idea => {
        if (idea.id === ideaId) {
          const votes = [...idea.votes];
          const hasVoted = votes.includes(user.id);
          let diff = 0;
          if (hasVoted) {
            votes.splice(votes.indexOf(user.id), 1);
            diff = -5;
          } else {
            votes.push(user.id);
            diff = 5;
          }

          // Adjust user coins
          const updatedUser = { ...user, coinBalance: user.coinBalance + diff };
          setUser(updatedUser);
          localStorage.setItem('demo_user', JSON.stringify(updatedUser));

          // Log transaction
          const updatedTxs = [
            { id: `tx-${Date.now()}`, userId: user.id, type: diff > 0 ? 'EARN' : 'SPEND', amount: Math.abs(diff), description: diff > 0 ? `Upvoted idea: ${idea.title}` : `Removed upvote from: ${idea.title}`, timestamp: Date.now() },
            ...transactions
          ];
          setTransactions(updatedTxs);
          localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

          return { ...idea, votes };
        }
        return idea;
      });

      setIdeas(updatedIdeas);
      localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));
      showNotification('Upvote toggled locally!', 'success');
    }
  };

  // 7. Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (backendStatus === 'connected') {
      try {
        const res = await axios.post(`/api/ideas/${selectedIdea.id}/comment`, { text: commentText });
        // Add to selected idea
        const updatedIdea = { ...selectedIdea, comments: [...selectedIdea.comments, res.data] };
        setSelectedIdea(updatedIdea);
        setIdeas(ideas.map(i => i.id === selectedIdea.id ? updatedIdea : i));
        setCommentText('');
        fetchServerData();
        showNotification('Comment added! Earned 5 Coins.', 'success');
      } catch (err) {
        showNotification('Failed to add comment', 'error');
      }
    } else {
      // Demo comment
      const newComment = {
        id: `c-${Date.now()}`,
        senderId: user.id,
        senderName: user.name,
        text: commentText,
        timestamp: Date.now()
      };

      const updatedIdeas = ideas.map(idea => {
        if (idea.id === selectedIdea.id) {
          const comments = [...idea.comments, newComment];
          const updatedIdea = { ...idea, comments };
          setSelectedIdea(updatedIdea);
          return updatedIdea;
        }
        return idea;
      });

      setIdeas(updatedIdeas);
      localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));

      // Award coins
      const updatedUser = { ...user, coinBalance: user.coinBalance + 5 };
      setUser(updatedUser);
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));

      // Log transaction
      const updatedTxs = [
        { id: `tx-${Date.now()}`, userId: user.id, type: 'EARN', amount: 5, description: `Commented on: ${selectedIdea.title}`, timestamp: Date.now() },
        ...transactions
      ];
      setTransactions(updatedTxs);
      localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

      setCommentText('');
      showNotification('Comment added locally! Earned 5 Coins.', 'success');
    }
  };

  // 8. Update Idea Development Stage
  const handleUpdateStage = async (ideaId, newStage) => {
    if (backendStatus === 'connected') {
      try {
        const res = await axios.put(`/api/ideas/${ideaId}/stage`, { stage: newStage });
        setIdeas(ideas.map(i => i.id === ideaId ? res.data : i));
        if (selectedIdea && selectedIdea.id === ideaId) {
          setSelectedIdea(res.data);
        }
        fetchServerData();
        showNotification(`Project stage updated to ${newStage}!`, 'success');
      } catch (err) {
        showNotification('Failed to update stage', 'error');
      }
    } else {
      // Demo stage
      const updatedIdeas = ideas.map(idea => {
        if (idea.id === ideaId) {
          const updatedIdea = { ...idea, stage: newStage };
          if (selectedIdea && selectedIdea.id === ideaId) {
            setSelectedIdea(updatedIdea);
          }

          // Award coins
          const updatedUser = { ...user, coinBalance: user.coinBalance + 40, reputation: user.reputation + 20 };
          setUser(updatedUser);
          localStorage.setItem('demo_user', JSON.stringify(updatedUser));

          // Log transaction
          const updatedTxs = [
            { id: `tx-${Date.now()}`, userId: user.id, type: 'EARN', amount: 40, description: `Milestone: ${idea.title} moved to ${newStage}`, timestamp: Date.now() },
            ...transactions
          ];
          setTransactions(updatedTxs);
          localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

          return updatedIdea;
        }
        return idea;
      });

      setIdeas(updatedIdeas);
      localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));
      showNotification(`Stage updated locally! Earned 40 Coins.`, 'success');
    }
  };

  // 9. AI Feasibility Analysis Request
  const handleRequestAiAnalysis = async (idea) => {
    setIsAnalyzingAi(true);
    setAiReport(null);

    // Call FastAPI AI service
    try {
      // FastAPI runs on port 8000
      const res = await axios.post('http://localhost:8000/analyze-feasibility', {
        title: idea.title,
        description: idea.description,
        problem: idea.problem,
        solution: idea.solution
      });
      setAiReport(res.data);
      setIsAnalyzingAi(false);
    } catch (err) {
      console.warn("AI service not online. Simulating AI analysis parameters...");
      // Simulate analysis if Python server is not currently running
      setTimeout(() => {
        const fullText = (idea.title + idea.description + idea.problem + idea.solution).toLowerCase();
        let complexity = 50;
        if (fullText.includes('ai') || fullText.includes('ml') || fullText.includes('learning')) complexity += 20;
        if (fullText.includes('blockchain') || fullText.includes('solidity') || fullText.includes('contract')) complexity += 25;
        
        let market = 60;
        if (fullText.includes('market') || fullText.includes('customer') || fullText.includes('revenue')) market += 15;
        
        const risk = Math.max(20, Math.min(85, Math.floor((complexity * 0.8) + (100 - market) * 0.3)));
        const score = Math.min(98, Math.max(30, Math.floor((market * 0.6) + (100 - complexity) * 0.25 + (100 - risk) * 0.15)));

        setAiReport({
          score: score,
          metrics: {
            technicalComplexity: complexity,
            marketFeasibility: market,
            riskFactor: risk
          },
          strengths: [
            "Clear alignment with student needs and collaborative innovation goals.",
            "Solid integration of modern components inside the system description."
          ],
          challenges: [
            complexity > 70 ? "High development overhead. Requires custom specialized libraries." : "Requires steady user acquisition strategies.",
            "Potential competition from established platforms."
          ],
          recommendations: [
            "Use the Launchpad discussion groups to recruit 1 developer with React experience.",
            "Register the idea hash on the Polygon blockchain to secure IP ownership proof."
          ]
        });
        setIsAnalyzingAi(false);
      }, 1500);
    }
  };

  // Send message to AI Chatbot
  const handleSendChatbotMessage = async (msgText) => {
    const textToSend = msgText || chatbotInput;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: textToSend
    };
    
    setChatbotMessages(prev => [...prev, userMsg]);
    setChatbotInput('');
    setIsChatbotTyping(true);

    const userContext = {
      username: user ? user.name : 'Builder',
      coinBalance: user ? user.coinBalance : 0,
      reputation: user ? user.reputation : 0,
      achievements: user ? user.achievements : [],
      ideasCount: ideas ? ideas.filter(i => i.ownerId === user?.id).length : 0
    };

    try {
      const res = await axios.post('http://localhost:8000/chatbot', {
        message: textToSend,
        userContext
      });
      
      const botMsg = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: res.data.reply,
        suggestedTab: res.data.suggestedTab,
        suggestedAction: res.data.suggestedAction
      };
      
      setChatbotMessages(prev => [...prev, botMsg]);
      setIsChatbotTyping(false);
    } catch (err) {
      console.warn("AI service not online or error. Simulating chatbot response locally...");
      setTimeout(() => {
        const replyObj = simulateChatbotResponse(textToSend, userContext);
        const botMsg = {
          id: `msg-${Date.now()}-bot`,
          sender: 'bot',
          text: replyObj.reply,
          suggestedTab: replyObj.suggestedTab,
          suggestedAction: replyObj.suggestedAction
        };
        setChatbotMessages(prev => [...prev, botMsg]);
        setIsChatbotTyping(false);
      }, 800);
    }
  };

  const simulateChatbotResponse = (query, context) => {
    const msg = query.toLowerCase();
    const coinBalance = context.coinBalance || 0;
    const achievements = context.achievements || [];
    const username = context.username || 'Builder';
    
    let reply = "";
    let suggestedTab = null;
    let suggestedAction = null;
    
    if (msg.includes('coin') || msg.includes('earn') || msg.includes('money') || msg.includes('token') || msg.includes('reward') || msg.includes('balance')) {
      reply = `Hey ${username}, here's how you can earn Launchpad Coins to fund your startups and participate in governance:\n\n• 💡 **Submit an Idea** in the Incubator (+50 Coins)\n• 🔗 **Secure your IP** by registering it on-chain (+100 Coins)\n• 🚀 **Progress your Idea** to a new stage like Validation/Prototyping (+40 Coins)\n• 🗳️ **Vote on DAO Proposals** (+10 Coins)\n• 💬 **Engage in the community** (+5 Coins for upvoting/commenting, +2 for chats)\n\nCurrently, you have **${coinBalance} Coins**. Try submitting a new idea to boost your balance!`;
      suggestedTab = "incubator";
      suggestedAction = "submit_idea";
    } else if (msg.includes('blockchain') || msg.includes('solidity') || msg.includes('ethereum') || msg.includes('polygon') || msg.includes('ip') || msg.includes('ownership') || msg.includes('register') || msg.includes('secure') || msg.includes('hash')) {
      reply = `Registering your startup idea on-chain creates a cryptographic fingerprint (hash) of your work, proving you had the idea at a specific point in time.\n\nTo do this:\n1. Go to the **Incubator** tab.\n2. Select your idea and click **'Connect MetaMask'**.\n3. Click **'Register on Blockchain'**.\n\nThis secures your intellectual property and rewards you with **+100 Coins** and the **'IP Protector'** achievement!`;
      suggestedTab = "incubator";
      suggestedAction = "register_blockchain";
    } else if (msg.includes('ai') || msg.includes('feasibility') || msg.includes('report') || msg.includes('analyze') || msg.includes('complexity') || msg.includes('evaluation')) {
      reply = `Our integrated AI Evaluation Co-pilot performs an automated analysis on your startup ideas. It grades:\n• 🛠️ **Technical Complexity**: Difficulty of implementation.\n• 📈 **Market Feasibility**: Commercial and monetization viability.\n• ⚠️ **Risk Factor**: Complexity matched against details provided.\n\nTo run it, open any idea in the **Incubator** and click **'Launch AI Evaluation'**. The advice will help you refine your solution!`;
      suggestedTab = "incubator";
      suggestedAction = "launch_ai";
    } else if (msg.includes('team') || msg.includes('partner') || msg.includes('member') || msg.includes('collaborate') || msg.includes('skill') || msg.includes('match') || msg.includes('find')) {
      reply = `Building a startup requires a great team! To get teammate recommendations:\n1. Create an idea and fill in the **'Teammate/Skill Requirements'** field (e.g., 'Looking for a React developer with UI design skills').\n2. Open the idea; the platform will run a TF-IDF cosine similarity matching engine against other students' skills and display the best matches.\n\nYou can also chat directly in **Community Hubs** to network with students.`;
      suggestedTab = "communities";
      suggestedAction = "find_teammates";
    } else if (msg.includes('dao') || msg.includes('vote') || msg.includes('proposal') || msg.includes('governance') || msg.includes('funding')) {
      reply = `DAO (Decentralized Autonomous Organization) Governance allows students to vote on startup funding proposals.\n\n• 🗳️ **Voting**: Cast your vote for active proposals. Your voting power is proportional to your coin balance!\n• 💡 **Proposals**: Submit a new proposal (costs 50 Coins) to pitch for funding or change incubator rules.\n\nVoting rewards you with **+10 Coins** and **+5 Reputation XP**.`;
      suggestedTab = "dao";
      suggestedAction = "create_proposal";
    } else if (msg.includes('profile') || msg.includes('avatar') || msg.includes('theme') || msg.includes('glow') || msg.includes('customize') || msg.includes('edit')) {
      reply = `Personalizing your workspace profile is a great first step! You can:\n• Select a role-based identity (e.g., Robo Dev, Sorcerer, Ninja).\n• Customize your neon glow border color (Teal, Violet, Pink, Gold).\n• Upload a profile photo or select a preset.\n• Link your GitHub and LinkedIn profiles.\n\nCompleting your profile unlocks the **'Fully Detailed'** achievement and grants you **+50 Coins**!`;
      suggestedTab = "profile";
      suggestedAction = "edit_profile";
    } else if (msg.includes('achievement') || msg.includes('trophy') || msg.includes('badge') || msg.includes('xp') || msg.includes('reputation')) {
      const unlocked = achievements.length;
      reply = `You have unlocked **${unlocked} Achievements** so far!\n\nAchievements reward you with bonus coins and XP. Key badges you can earn:\n• 🏆 **'Skill Builder'** (+20 Coins): Add skills to your profile.\n• 🏆 **'Fully Detailed'** (+50 Coins): Complete bio, tagline, and avatar.\n• 🏆 **'Ideator Spark'** (+25 Coins): Submit your first idea.\n• 🏆 **'IP Protector'** (+50 Coins): Register an idea on the blockchain.\n• 🏆 **'DAO Citizen'** (+20 Coins): Vote on a DAO proposal.`;
      suggestedTab = "profile";
      suggestedAction = "view_achievements";
    } else {
      reply = `Hello ${username}! I'm your Launchpad Co-pilot. I can guide you on what to do and how the platform works.\n\nHere are some topics you can ask me about:\n• 💰 *How to earn coins?*\n• 🔗 *Why register ideas on the blockchain?*\n• 🧠 *How does the AI feasibility report work?*\n• 👥 *How to find teammates?*\n• 🗳️ *What is the DAO?*\n• 🎨 *How to customize my profile and avatar?*\n\nWhat would you like to explore?`;
    }
    
    return { reply, suggestedTab, suggestedAction };
  };

  // 10. Web3 MetaMask Connection & Registration
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setMetaMaskAddress(accounts[0]);
        localStorage.setItem('metaMaskAddress', accounts[0]);
        showNotification('Connected MetaMask successfully!', 'success');
      } catch (err) {
        showNotification('Failed to connect MetaMask', 'error');
      }
    } else {
      // Simulate MetaMask
      const mockAddr = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setMetaMaskAddress(mockAddr);
      localStorage.setItem('metaMaskAddress', mockAddr);
      showNotification('Simulating MetaMask connection (no wallet installed).', 'info');
    }
  };

  const disconnectMetaMask = () => {
    setMetaMaskAddress('');
    localStorage.removeItem('metaMaskAddress');
    showNotification('Wallet disconnected.', 'info');
  };

  const handleRegisterOnBlockchain = async (idea) => {
    if (!metaMaskAddress) {
      showNotification('Please connect MetaMask first', 'warning');
      return;
    }

    setIsBlockchainLoading(true);
    let finalHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    let finalTx = '0x' + Array.from({length: 66}, () => Math.floor(Math.random()*16).toString(16)).join('');
    let finalIpfs = 'Qm' + Array.from({length: 44}, () => Math.floor(Math.random()*36).toString(36)).join('');
    let finalBlock = 15423800 + Math.floor(Math.random() * 20000);

    const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const CONTRACT_ABI = [
      {
        "inputs": [
          {"internalType": "string", "name": "ideaId", "type": "string"},
          {"internalType": "bytes32", "name": "ideaHash", "type": "bytes32"},
          {"internalType": "string", "name": "ipfsHash", "type": "string"}
        ],
        "name": "registerIdea",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        // Generate cryptographic hash of descriptions
        const descHash = ethers.keccak256(ethers.toUtf8Bytes(idea.description || idea.title));
        
        showNotification('Initiating MetaMask Transaction...', 'info');
        const tx = await contract.registerIdea(idea.id, descHash, finalIpfs);
        showNotification('Transaction sent! Awaiting block confirmation...', 'info');
        const receipt = await tx.wait();
        
        finalHash = descHash;
        finalTx = receipt.hash || tx.hash;
        finalBlock = Number(receipt.blockNumber) || finalBlock;
        showNotification('On-Chain Registration Confirmed!', 'success');
      } catch (e) {
        console.warn("MetaMask transaction error, falling back to simulated tx.", e);
        showNotification('MetaMask transaction failed or rejected. Using simulated IP hash.', 'warning');
      }
    } else {
      showNotification('Simulating on-chain IP protection (MetaMask not installed).', 'info');
    }

    if (backendStatus === 'connected') {
      try {
        const res = await axios.post(`/api/ideas/${idea.id}/blockchain`, {
          blockchainHash: finalHash,
          blockchainTx: finalTx,
          ipfsHash: finalIpfs,
          blockNumber: finalBlock
        });
        setIdeas(ideas.map(i => i.id === idea.id ? res.data : i));
        if (selectedIdea && selectedIdea.id === idea.id) {
          setSelectedIdea(res.data);
        }
        fetchServerData();
        setIsBlockchainLoading(false);
        showNotification('On-Chain Registration complete! +100 Coins.', 'success');
      } catch (err) {
        showNotification('Blockchain registration update failed on backend', 'error');
        setIsBlockchainLoading(false);
      }
    } else {
      const mockHash = finalHash;
      const mockTx = finalTx;
      const ipfs = finalIpfs;
      const block = finalBlock;
        // Demo Blockchain Register
        const updatedIdeas = ideas.map(i => {
          if (i.id === idea.id) {
            const updated = {
              ...i,
              blockchainHash: mockHash,
              blockchainTx: mockTx,
              ipfsHash: ipfs,
              blockNumber: block,
              timestamp: Date.now()
            };
            if (selectedIdea && selectedIdea.id === idea.id) {
              setSelectedIdea(updated);
            }
            return updated;
          }
          return i;
        });

        setIdeas(updatedIdeas);
        localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));

        // Coins & Achievements
        const updatedUser = { ...user, coinBalance: user.coinBalance + 100, reputation: user.reputation + 30 };
        if (!updatedUser.achievements.includes('IP Protector')) {
          updatedUser.achievements.push('IP Protector');
          updatedUser.coinBalance += 50;
        }
        setUser(updatedUser);
        localStorage.setItem('demo_user', JSON.stringify(updatedUser));

        // Logs
        const updatedTxs = [
          { id: `tx-${Date.now()}`, userId: user.id, type: 'EARN', amount: 100, description: `Blockchain IP Protection: ${idea.title}`, timestamp: Date.now() },
          ...transactions
        ];
        setTransactions(updatedTxs);
        localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

        setIsBlockchainLoading(false);
        showNotification('Demo On-Chain protection activated! +100 Coins.', 'success');
      }
  };

  // 11. DAO Proposal Creation & Vote
  const handleCreateProposal = async (e) => {
    e.preventDefault();
    if (user.coinBalance < 50) {
      showNotification('Insufficient coin balance (50 required)', 'error');
      return;
    }

    if (backendStatus === 'connected') {
      try {
        const res = await axios.post('/api/dao/proposals', newProposal);
        setProposals([res.data, ...proposals]);
        setShowProposalForm(false);
        setNewProposal({ title: '', description: '', category: 'Funding' });
        fetchServerData();
        showNotification('DAO Proposal created! -50 Coins.', 'success');
      } catch (err) {
        showNotification(err.response?.data?.msg || 'Failed to create proposal', 'error');
      }
    } else {
      // Demo Proposal
      const newProp = {
        id: `prop-${Date.now()}`,
        ...newProposal,
        creatorId: user.id,
        creatorName: user.name,
        votes: { yes: [], no: [] },
        votesWeight: { yes: 0, no: 0 },
        status: 'active',
        createdAt: Date.now(),
        expiresAt: Date.now() + 604800000
      };

      const updatedProps = [newProp, ...proposals];
      setProposals(updatedProps);
      localStorage.setItem('demo_proposals', JSON.stringify(updatedProps));

      // Subtract coins
      const updatedUser = { ...user, coinBalance: user.coinBalance - 50 };
      setUser(updatedUser);
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));

      const updatedTxs = [
        { id: `tx-${Date.now()}`, userId: user.id, type: 'SPEND', amount: 50, description: `Created DAO Proposal: ${newProp.title}`, timestamp: Date.now() },
        ...transactions
      ];
      setTransactions(updatedTxs);
      localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

      setShowProposalForm(false);
      setNewProposal({ title: '', description: '', category: 'Funding' });
      showNotification('DAO Proposal created locally! -50 Coins.', 'success');
    }
  };

  const handleVoteProposal = async (proposalId, option) => {
    if (backendStatus === 'connected') {
      try {
        const res = await axios.post(`/api/dao/proposals/${proposalId}/vote`, { option });
        setProposals(proposals.map(p => p.id === proposalId ? res.data : p));
        fetchServerData();
        showNotification(`Vote cast for "${option.toUpperCase()}"!`, 'success');
      } catch (err) {
        showNotification(err.response?.data?.msg || 'Voting failed', 'error');
      }
    } else {
      // Demo Vote
      const updatedProps = proposals.map(p => {
        if (p.id === proposalId) {
          const votes = { ...p.votes };
          const hasVotedYes = votes.yes.includes(user.id);
          const hasVotedNo = votes.no.includes(user.id);

          if (hasVotedYes || hasVotedNo) {
            showNotification('You have already voted on this proposal!', 'error');
            return p;
          }

          // Cast vote
          votes[option].push(user.id);
          const votesWeight = { ...p.votesWeight };
          votesWeight[option] += user.coinBalance;

          // Reward user
          const updatedUser = { ...user, coinBalance: user.coinBalance + 10, reputation: user.reputation + 5 };
          if (!updatedUser.achievements.includes('DAO Citizen')) {
            updatedUser.achievements.push('DAO Citizen');
            updatedUser.coinBalance += 20;
          }
          setUser(updatedUser);
          localStorage.setItem('demo_user', JSON.stringify(updatedUser));

          const updatedTxs = [
            { id: `tx-${Date.now()}`, userId: user.id, type: 'EARN', amount: 10, description: `Voted in DAO: ${p.title}`, timestamp: Date.now() },
            ...transactions
          ];
          setTransactions(updatedTxs);
          localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

          showNotification(`Demo Vote registered! Weight: ${user.coinBalance} units. +10 Coins.`, 'success');
          return { ...p, votes, votesWeight };
        }
        return p;
      });

      setProposals(updatedProps);
      localStorage.setItem('demo_proposals', JSON.stringify(updatedProps));
    }
  };

  // 12. Join Community
  const handleJoinCommunity = async (commId) => {
    if (backendStatus === 'connected') {
      try {
        const res = await axios.post(`/api/communities/${commId}/join`);
        setCommunities(communities.map(c => c.id === commId ? res.data : c));
        fetchServerData();
      } catch (err) {
        showNotification('Failed to join community', 'error');
      }
    } else {
      // Demo join
      const updatedComms = communities.map(c => {
        if (c.id === commId) {
          const members = [...c.members];
          const idx = members.indexOf(user.id);
          let joined = false;
          if (idx === -1) {
            members.push(user.id);
            joined = true;
          } else {
            members.splice(idx, 1);
          }

          const diff = joined ? 10 : -10;
          const updatedUser = { ...user, coinBalance: Math.max(0, user.coinBalance + diff) };
          setUser(updatedUser);
          localStorage.setItem('demo_user', JSON.stringify(updatedUser));

          const updatedTxs = [
            { id: `tx-${Date.now()}`, userId: user.id, type: joined ? 'EARN' : 'SPEND', amount: Math.abs(diff), description: joined ? `Joined community: ${c.name}` : `Left community: ${c.name}`, timestamp: Date.now() },
            ...transactions
          ];
          setTransactions(updatedTxs);
          localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

          return { ...c, members, membersCount: c.membersCount + (joined ? 1 : -1) };
        }
        return c;
      });

      setCommunities(updatedComms);
      localStorage.setItem('demo_communities', JSON.stringify(updatedComms));
      showNotification('Community status updated locally!', 'success');
    }
  };

  // 13. Chat / Discussion message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || !selectedCommunity) return;

    if (backendStatus === 'connected') {
      try {
        const res = await axios.post(`/api/communities/${selectedCommunity.id}/messages`, { text: chatMessage });
        setMessages([...messages, res.data]);
        setChatMessage('');
        fetchServerData();
      } catch (err) {
        showNotification('Message post failed', 'error');
      }
    } else {
      // Demo Chat
      const newMsg = {
        id: `msg-${Date.now()}`,
        communityId: selectedCommunity.id,
        senderId: user.id,
        senderName: user.name,
        text: chatMessage,
        timestamp: Date.now()
      };

      const updatedMsgs = [...messages, newMsg];
      setMessages(updatedMsgs);
      localStorage.setItem('demo_messages', JSON.stringify(updatedMsgs));

      // Award coins
      const updatedUser = { ...user, coinBalance: user.coinBalance + 2 };
      setUser(updatedUser);
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));

      setChatMessage('');
    }
  };

  // Select community chat
  const handleSelectCommunity = async (comm) => {
    setSelectedCommunity(comm);
    if (backendStatus === 'connected') {
      try {
        const res = await axios.get(`/api/communities/${comm.id}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load server messages");
      }
    }
  };

  // 14. Reward Shop Redeem
  const handleRedeemPerk = async (perk) => {
    if (user.coinBalance < perk.cost) {
      showNotification('Insufficient coin balance', 'error');
      return;
    }

    if (backendStatus === 'connected') {
      try {
        const res = await axios.post('/api/coins/redeem', {
          rewardId: perk.id,
          cost: perk.cost,
          label: perk.label
        });
        fetchServerData();
        showNotification(`Successfully redeemed "${perk.label}"!`, 'success');
      } catch (err) {
        showNotification('Failed to redeem reward', 'error');
      }
    } else {
      // Demo redeem
      const updatedUser = { ...user, coinBalance: user.coinBalance - perk.cost };
      if (!updatedUser.achievements.includes('Platform Beneficiary')) {
        updatedUser.achievements.push('Platform Beneficiary');
        updatedUser.coinBalance += 10;
      }
      setUser(updatedUser);
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));

      const updatedTxs = [
        { id: `tx-${Date.now()}`, userId: user.id, type: 'SPEND', amount: perk.cost, description: `Redeemed: ${perk.label}`, timestamp: Date.now() },
        ...transactions
      ];
      setTransactions(updatedTxs);
      localStorage.setItem('demo_transactions', JSON.stringify(updatedTxs));

      showNotification(`Demo Redemption successful for "${perk.label}"!`, 'success');
    }
  };

  // Render Authentication overlay if user is null
  if (!user) {
    return (
      <div className="min-h-screen bg-darkbg text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-neonteal/10 rounded-full blur-[140px] animate-drift-glow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-neonviolet/10 rounded-full blur-[140px] animate-drift-glow" style={{ animationDelay: '3s' }}></div>

        {/* Title Panel */}
        <div className="text-center mb-8 z-10 animate-fade-in-up">
          <div className="flex justify-center items-center gap-3.5 mb-2 animate-float">
            <div className="p-0.5 bg-gradient-to-tr from-neonteal to-neonviolet rounded-2xl shadow-neon hover:scale-105 hover:rotate-3 transition-all duration-300 overflow-hidden w-16 h-16 flex items-center justify-center">
              <img src={appLogo} alt="Launchpad Logo" className="w-full h-full object-cover scale-[1.35] rounded-[14px]" />
            </div>
            <span className="text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-neonteal via-white to-neonviolet font-display font-display-glow">
              LAUNCHPAD
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Decentralized virtual startup incubator and collaborative sandbox for student builders.
          </p>
        </div>

        {/* Auth Card */}
        <div className="w-full max-w-md bg-glass border-glass rounded-3xl p-8 shadow-glass z-10 relative animate-scale-in delay-100">
          <div className="flex border-b border-darkborder pb-4 mb-6">
            <button 
              className={`flex-1 font-semibold text-lg pb-2 transition-colors duration-300 ${isLogin ? 'text-neonteal border-b-2 border-neonteal' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 font-semibold text-lg pb-2 transition-colors duration-300 ${!isLogin ? 'text-neonviolet border-b-2 border-neonviolet' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="animate-fade-in-up">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neonteal transition-colors"
                />
              </div>
            )}
            <div className="animate-fade-in-up delay-75">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="student@university.edu" 
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neonteal transition-colors"
              />
            </div>
            <div className="animate-fade-in-up delay-100">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neonteal transition-colors"
              />
            </div>

            <button 
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-darkbg tracking-wide shadow-neon transition-all bg-gradient-to-r ${
                isLogin 
                  ? 'from-neonteal to-cyan-400 btn-premium' 
                  : 'from-neonviolet to-fuchsia-500 btn-premium-purple'
              }`}
            >
              {isLogin ? 'Enter Incubator' : 'Claim 100 Welcome Coins'}
            </button>
          </form>

          {/* Connection Status Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2 pt-4 border-t border-darkborder text-xs">
            <span className="text-gray-400">Database Engine:</span>
            {backendStatus === 'checking' && (
              <span className="flex items-center text-yellow-500 gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> Checking connection...
              </span>
            )}
            {backendStatus === 'connected' && (
              <span className="text-neonteal font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neonteal"></span> Server Mode (MongoDB/JWT active)
              </span>
            )}
            {backendStatus === 'demo' && (
              <span className="text-yellow-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Client-Demo Mode (Local Sandbox)
              </span>
            )}
          </div>
        </div>

        {/* Bottom notifications */}
        {notification && (
          <div className="absolute bottom-6 right-6 bg-darkcard border border-darkborder px-5 py-3 rounded-2xl shadow-glass flex items-center gap-3 z-50 animate-slide-in-right">
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-neonteal" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        )}
      </div>
    );
  }

  // Active user Dashboard shell
  return (
    <div className="min-h-screen bg-darkbg text-gray-100 flex relative overflow-hidden">
      
      {/* Background radial highlights */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-neonteal/5 rounded-full blur-[120px] pointer-events-none animate-drift-glow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-neonviolet/5 rounded-full blur-[120px] pointer-events-none animate-drift-glow" style={{ animationDelay: '5s' }}></div>

      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-glass border-r border-darkborder p-6 flex flex-col justify-between z-10 shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="p-0.5 bg-gradient-to-tr from-neonteal to-neonviolet rounded-xl shadow-neon group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 overflow-hidden w-9 h-9 flex items-center justify-center">
              <img src={appLogo} alt="Launchpad Logo" className="w-full h-full object-cover scale-[1.35] rounded-[10px]" />
            </div>
            <span className="font-extrabold text-lg tracking-wider font-display bg-clip-text text-transparent bg-gradient-to-r from-neonteal to-white">
              LAUNCHPAD
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
              { id: 'incubator', label: 'Idea Incubator', icon: Rocket },
              { id: 'communities', label: 'Community Hubs', icon: Users },
              { id: 'dao', label: 'DAO Governance', icon: Vote },
              { id: 'blockchain', label: 'On-Chain Registry', icon: ShieldCheck },
              { id: 'wallet', label: 'Coin Wallet & Perks', icon: Wallet },
              { id: 'profile', label: 'My Profile', icon: User },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Reset analysis / detail views when navigating
                    setAiReport(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:translate-x-1 ${
                    isActive 
                      ? 'bg-gradient-to-r from-neonteal/15 to-neonviolet/5 border-l-4 border-neonteal text-neonteal shadow-neon scale-102 font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-neonteal scale-110' : 'text-gray-400 group-hover:scale-110'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        <div className="pt-6 border-t border-darkborder space-y-4">
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neonteal to-neonviolet p-0.5 shadow-neon">
              <ProfilePhoto photo={user.profilePhoto} name={user.name} className="w-full h-full" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold truncate">{user.name}</h4>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neonteal bg-neonteal/10 px-2 py-0.5 rounded-full animate-pulse-glow">
                {user.rank}
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER */}
      <main className="flex-1 flex flex-col z-10 overflow-y-auto max-h-screen">
        
        {/* Top Navbar */}
        <header className="h-20 bg-glass border-b border-darkborder px-8 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3 animate-fade-in-up">
            <h1 className="text-xl font-extrabold capitalize tracking-wide font-display">
              {activeTab === 'dashboard' ? 'Student Workspace' : activeTab.replace('-', ' ')}
            </h1>
            {/* Status indicator badge */}
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse-glow ${backendStatus === 'connected' ? 'bg-neonteal/10 text-neonteal' : 'bg-yellow-500/10 text-yellow-500'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${backendStatus === 'connected' ? 'bg-neonteal animate-ping' : 'bg-yellow-500'}`}></span>
              {backendStatus === 'connected' ? 'Connected API' : 'Demo Sandbox'}
            </span>
          </div>

          <div className="flex items-center gap-4 animate-fade-in-up">
            {/* Wallet balance capsule */}
            <div className="flex items-center gap-2.5 bg-darkcard border border-darkborder px-4 py-2 rounded-full shadow-neon hover:scale-105 transition-transform duration-300">
              <Coins className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-sm font-extrabold text-yellow-400 tracking-wide">
                {user.coinBalance} <span className="text-[10px] text-gray-400 font-semibold font-sans">Coins</span>
              </span>
            </div>
          </div>
        </header>

        {/* 3. CONTENT AREA */}
        <div className="p-8 flex-1 space-y-8">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-3 gap-8 animate-fade-in-up">
              
              {/* Profile Card & Info */}
              <div className="col-span-2 space-y-8 animate-fade-in-up delay-75">
                
                {/* Welcome Glassmorphic Banner */}
                <div className="bg-glass border-glass rounded-3xl p-8 relative overflow-hidden shadow-glass animate-float card-premium-hover">
                  <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-l from-neonteal/10 to-transparent pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-neonteal text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse-glow" /> Launchpad Member Status
                  </div>
                  <h2 className="text-2xl font-extrabold mb-4 font-display">
                    Welcome back, {user.name}! 🚀
                  </h2>
                  <p className="text-gray-400 text-sm max-w-lg mb-6 leading-relaxed">
                    Build and test startup concepts, join specialized hubs, secure your IP on-chain, and govern the treasury using Launchpad Coins.
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-darkbg/50 border border-darkborder p-4 rounded-2xl hover:scale-105 transition-all duration-300">
                      <span className="text-xs text-gray-400 font-medium">Platform Rank</span>
                      <p className="text-lg font-bold text-neonteal mt-1">{user.rank}</p>
                    </div>
                    <div className="bg-darkbg/50 border border-darkborder p-4 rounded-2xl hover:scale-105 transition-all duration-300">
                      <span className="text-xs text-gray-400 font-medium">Reputation</span>
                      <p className="text-lg font-bold text-neonviolet mt-1">{user.reputation} XP</p>
                    </div>
                    <div className="bg-darkbg/50 border border-darkborder p-4 rounded-2xl hover:scale-105 transition-all duration-300">
                      <span className="text-xs text-gray-400 font-medium">Ideas Tracked</span>
                      <p className="text-lg font-bold text-white mt-1">
                        {ideas.filter(i => i.ownerId === user.id).length} Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills and Profile Settings */}
                <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-bold flex items-center gap-2">
                      <Award className="w-4 h-4 text-neonteal" /> Skills & Focus Areas
                    </h3>
                    {!isEditingProfile ? (
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="text-xs font-bold text-neonteal border border-neonteal/20 hover:border-neonteal px-3 py-1.5 rounded-xl transition-all hover:scale-105 active:scale-95 duration-200"
                      >
                        Edit Skills
                      </button>
                    ) : null}
                  </div>

                  {!isEditingProfile ? (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-2">My Skills</span>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.length > 0 ? user.skills.map((s, i) => (
                            <span key={i} className="bg-neonteal/10 text-neonteal border border-neonteal/10 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 hover:bg-neonteal hover:text-darkbg transition-all duration-200 cursor-default">
                              {s}
                            </span>
                          )) : <p className="text-sm text-gray-500 italic">No skills listed yet. Click edit to customize.</p>}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-2">My Interests</span>
                        <div className="flex flex-wrap gap-2">
                          {user.interests.length > 0 ? user.interests.map((s, i) => (
                            <span key={i} className="bg-neonviolet/10 text-neonviolet border border-neonviolet/10 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 hover:bg-neonviolet hover:text-white transition-all duration-200 cursor-default">
                              {s}
                            </span>
                          )) : <p className="text-sm text-gray-500 italic">No interests listed yet.</p>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 font-semibold">Skills (Comma-separated)</label>
                        <input 
                          type="text"
                          value={profileSkills}
                          onChange={(e) => setProfileSkills(e.target.value)}
                          placeholder="React, Python, Solidity, Marketing"
                          className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 font-semibold">Interests (Comma-separated)</label>
                        <input 
                          type="text"
                          value={profileInterests}
                          onChange={(e) => setProfileInterests(e.target.value)}
                          placeholder="AI/ML, Web3, CleanTech, EdTech"
                          className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          type="submit" 
                          className="bg-gradient-to-r from-neonteal to-cyan-400 text-darkbg font-bold px-4 py-2 rounded-xl text-xs btn-premium"
                        >
                          Save Profile
                        </button>
                        <button 
                          type="button" 
                          onClick={() => {
                            setIsEditingProfile(false);
                            setProfileSkills(user.skills.join(', '));
                            setProfileInterests(user.interests.join(', '));
                          }} 
                          className="bg-white/5 border border-darkborder text-gray-300 font-bold px-4 py-2 rounded-xl text-xs hover:bg-white/10 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* User Achievements */}
                <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover-purple">
                  <h3 className="text-base font-bold flex items-center gap-2 mb-4">
                    <Trophy className="w-4 h-4 text-yellow-400 animate-bounce-scale" /> Platform Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {user.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-darkbg/50 border border-darkborder p-3 rounded-2xl hover:scale-103 hover:border-yellow-400/25 transition-all duration-300 cursor-default">
                        <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{ach}</p>
                          <span className="text-[10px] text-gray-400">Claimed & Verified</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar AI recommendation module */}
              <div className="space-y-8">
                
                {/* AI Suggestions Box */}
                <div className="bg-gradient-to-b from-darkcard to-darkbg border border-darkborder rounded-3xl p-6 relative overflow-hidden card-premium-hover-purple">
                  <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-neonviolet/5 rounded-full blur-[60px] pointer-events-none"></div>
                  
                  <div className="flex items-center gap-2 text-neonviolet text-xs font-bold uppercase tracking-wider mb-4 animate-pulse-glow">
                    <Cpu className="w-4 h-4 text-neonviolet" /> AI Workspace Recommendations
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">Recommended Communities</h4>
                  <p className="text-xs text-gray-400 mb-4">Based on your skills ({user.skills.join(', ') || 'N/A'}):</p>
                  
                  <div className="space-y-3 mb-6">
                    {communities.map(c => {
                      const hasSkillMatch = user.skills.some(s => c.category.toLowerCase().includes(s.toLowerCase()) || c.description.toLowerCase().includes(s.toLowerCase()));
                      return (
                        <div key={c.id} className={`p-3 rounded-xl border text-xs flex justify-between items-center transition-all duration-300 hover:translate-x-1 ${hasSkillMatch ? 'border-neonteal/30 bg-neonteal/5 shadow-[0_0_10px_rgba(6,182,212,0.05)]' : 'border-darkborder bg-darkbg/30'}`}>
                          <div>
                            <span className="font-semibold block">{c.name}</span>
                            <span className="text-[10px] text-gray-400">{c.category} Hub</span>
                          </div>
                          <button 
                            onClick={() => {
                              setActiveTab('communities');
                              handleSelectCommunity(c);
                            }}
                            className="p-1.5 bg-white/5 hover:bg-neonteal hover:text-darkbg rounded-lg text-gray-400 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">Teammate Search suggestions</h4>
                  <p className="text-xs text-gray-400 mb-3">Looking to add teammates with coding or business experience? Pitch ideas in the Incubator.</p>
                  <button 
                    onClick={() => setActiveTab('incubator')}
                    className="w-full py-2.5 bg-gradient-to-r from-neonviolet to-fuchsia-500 rounded-xl font-bold text-xs text-white hover:scale-105 transition-all text-center flex items-center justify-center gap-2 btn-premium-purple"
                  >
                    <Plus className="w-3.5 h-3.5" /> Submit Startup Idea
                  </button>
                </div>

                {/* Economy Stats */}
                <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Coins className="w-4 h-4 text-yellow-400" /> Incubation Economy Tips
                  </h4>
                  <ul className="text-xs text-gray-400 space-y-3 leading-relaxed">
                    <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                      <span className="text-neonteal font-bold">1.</span>
                      <span>Submitting a new idea earns <strong className="text-white">+50 Coins</strong> and <strong className="text-white">+15 Reputation XP</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                      <span className="text-neonteal font-bold">2.</span>
                      <span>Upvoting other ideas grants you <strong className="text-white">+5 Coins</strong> and builds peer feedback score.</span>
                    </li>
                    <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                      <span className="text-neonteal font-bold">3.</span>
                      <span>Securing idea ownership on the Polygon network rewards you with <strong className="text-white">+100 Coins</strong> and verified status.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          )}

          {/* TAB: IDEA INCUBATOR */}
          {activeTab === 'incubator' && (
            <div className="space-y-8 animate-fade-in-up">
              
              {/* Search & Submit Section */}
              <div className="flex justify-between items-center gap-6 animate-fade-in-up delay-75">
                <div className="flex-1 max-w-md relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                  <input 
                    type="text" 
                    placeholder="Search startup categories, ideas..." 
                    className="w-full bg-darkcard border border-darkborder rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-neonteal transition-colors"
                  />
                </div>

                <button 
                  onClick={() => setShowIdeaModal(true)}
                  className="bg-gradient-to-r from-neonteal to-cyan-400 text-darkbg font-extrabold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-neon hover:scale-105 transition-all btn-premium"
                >
                  <Plus className="w-4 h-4 text-darkbg" /> Pitch Idea
                </button>
              </div>

              {/* Ideas Grid */}
              <div className="grid grid-cols-2 gap-8">
                {ideas.map((idea, idx) => (
                  <div 
                    key={idea.id} 
                    className="bg-glass border-glass rounded-3xl p-6 card-premium-hover flex flex-col justify-between h-[280px] animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-neonteal/10 text-neonteal text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-neonteal/10">
                          {idea.category}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold bg-white/5 border border-darkborder px-2.5 py-1 rounded-full">
                          <span>Stage:</span>
                          <span className="text-white font-bold">{idea.stage}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold hover:text-neonteal cursor-pointer transition-colors line-clamp-1" onClick={() => setSelectedIdea(idea)}>
                        {idea.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-2 mb-4 line-clamp-3 leading-relaxed">
                        {idea.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-darkborder/50">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleVoteIdea(idea.id)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-90 hover:scale-105 duration-200 ${
                            idea.votes.includes(user.id) 
                              ? 'bg-neonteal/10 text-neonteal border-neonteal shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                              : 'bg-white/5 border-darkborder text-gray-400 hover:text-white'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{idea.votes.length}</span>
                        </button>

                        <button 
                          onClick={() => { setSelectedIdea(idea); handleRequestAiAnalysis(idea); }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neonviolet/10 text-neonviolet border border-neonviolet/10 hover:border-neonviolet text-xs font-bold transition-all hover:scale-105 active:scale-95 duration-200"
                        >
                          <Cpu className="w-3.5 h-3.5" /> AI Analysis
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {idea.blockchainHash ? (
                          <span className="text-[10px] font-bold text-neonteal flex items-center gap-1 uppercase tracking-wider bg-neonteal/5 border border-neonteal/20 px-2 py-1 rounded-lg animate-border-glow">
                            <ShieldCheck className="w-3.5 h-3.5" /> Protected
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleRegisterOnBlockchain(idea)}
                            disabled={isBlockchainLoading}
                            className="text-[10px] font-bold text-yellow-500 hover:text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-lg flex items-center gap-1 uppercase tracking-wider transition-all hover:scale-105 active:scale-95 duration-200 card-premium-hover-yellow"
                          >
                            Register IP
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedIdea(idea)}
                          className="text-xs font-bold text-white hover:underline flex items-center transition-all hover:translate-x-1"
                        >
                          Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Idea Modal Form */}
              {showIdeaModal && (
                <div className="fixed inset-0 bg-darkbg/80 backdrop-blur-md flex items-center justify-center p-6 z-50 overflow-y-auto animate-fade-in">
                  <div className="w-full max-w-2xl bg-glass border-glass rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-glass relative animate-scale-in">
                    <h2 className="text-xl font-extrabold mb-2 font-display">Pitch a Startup Idea</h2>
                    <p className="text-xs text-gray-400 mb-6">Explain the core problem, target audience, and technology components of your solution.</p>
 
                    <form onSubmit={handleSubmitIdea} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="animate-fade-in-up delay-75">
                          <label className="block text-xs text-gray-400 font-semibold mb-1">Title</label>
                          <input 
                            type="text" required
                            placeholder="e.g. HealthTracker App"
                            value={newIdeaForm.title}
                            onChange={(e) => setNewIdeaForm({ ...newIdeaForm, title: e.target.value })}
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                          />
                        </div>
                        <div className="animate-fade-in-up delay-75">
                          <label className="block text-xs text-gray-400 font-semibold mb-1">Category / Domain</label>
                          <select 
                            value={newIdeaForm.category}
                            onChange={(e) => setNewIdeaForm({ ...newIdeaForm, category: e.target.value })}
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                          >
                            <option value="AI/ML">AI/ML</option>
                            <option value="FinTech">FinTech</option>
                            <option value="CleanTech">CleanTech</option>
                            <option value="EdTech">EdTech</option>
                            <option value="HealthTech">HealthTech</option>
                          </select>
                        </div>
                      </div>
 
                      <div className="animate-fade-in-up delay-100">
                        <label className="block text-xs text-gray-400 font-semibold mb-1">Core Description</label>
                        <textarea 
                          rows="3" required
                          placeholder="Describe the application features, how users interact, and the core technology stack..."
                          value={newIdeaForm.description}
                          onChange={(e) => setNewIdeaForm({ ...newIdeaForm, description: e.target.value })}
                          className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                        ></textarea>
                      </div>
 
                      <div className="grid grid-cols-2 gap-4">
                        <div className="animate-fade-in-up delay-150">
                          <label className="block text-xs text-gray-400 font-semibold mb-1">Problem Statement</label>
                          <textarea 
                            rows="2"
                            placeholder="What pain points are you addressing?"
                            value={newIdeaForm.problem}
                            onChange={(e) => setNewIdeaForm({ ...newIdeaForm, problem: e.target.value })}
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                          ></textarea>
                        </div>
                        <div className="animate-fade-in-up delay-150">
                          <label className="block text-xs text-gray-400 font-semibold mb-1">Proposed Solution</label>
                          <textarea 
                            rows="2"
                            placeholder="What makes your approach uniquely efficient?"
                            value={newIdeaForm.solution}
                            onChange={(e) => setNewIdeaForm({ ...newIdeaForm, solution: e.target.value })}
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                          ></textarea>
                        </div>
                      </div>
 
                      <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
                        <div>
                          <label className="block text-xs text-gray-400 font-semibold mb-1">Target Market</label>
                          <input 
                            type="text"
                            placeholder="e.g. college students, remote workers"
                            value={newIdeaForm.targetAudience}
                            onChange={(e) => setNewIdeaForm({ ...newIdeaForm, targetAudience: e.target.value })}
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 font-semibold mb-1">Teammate / Skill Requirements</label>
                          <input 
                            type="text"
                            placeholder="e.g. React Developer, UI Designer"
                            value={newIdeaForm.teamRequirements}
                            onChange={(e) => setNewIdeaForm({ ...newIdeaForm, teamRequirements: e.target.value })}
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                          />
                        </div>
                      </div>
 
                      <div className="flex gap-3 justify-end pt-4 animate-fade-in-up delay-200">
                        <button 
                          type="submit" 
                          disabled={isSubmittingIdea}
                          className="bg-gradient-to-r from-neonteal to-cyan-400 text-darkbg font-bold px-6 py-2.5 rounded-xl text-xs hover:scale-105 active:scale-95 transition-all btn-premium"
                        >
                          {isSubmittingIdea ? 'Submitting...' : 'Pitch & Claim 50 Coins'}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setShowIdeaModal(false)}
                          className="bg-white/5 border border-darkborder text-gray-300 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-white/10 transition-colors"
                        >
                          Discard
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Detailed View Modal */}
              {selectedIdea && (
                <div className="fixed inset-0 bg-darkbg/80 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in">
                  <div className="w-full max-w-4xl bg-glass border-glass rounded-3xl p-8 max-h-[92vh] overflow-y-auto shadow-glass relative flex gap-8 animate-scale-in">
                    
                    {/* Left Column: Idea Details */}
                    <div className="flex-1 space-y-5 animate-fade-in-up delay-75">
                      <div className="flex justify-between items-center">
                        <span className="bg-neonteal/15 text-neonteal text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full animate-pulse-glow">
                          {selectedIdea.category}
                        </span>
                        <div className="flex gap-2">
                          {['Ideation', 'Validation', 'Prototyping', 'Launch'].map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateStage(selectedIdea.id, st)}
                              className={`text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded-lg border transition-all duration-200 active:scale-95 ${
                                selectedIdea.stage === st 
                                  ? 'bg-neonteal text-darkbg border-neonteal shadow-[0_0_10px_rgba(6,182,212,0.15)]' 
                                  : 'bg-transparent border-darkborder text-gray-400 hover:text-white hover:border-white/20'
                              } ${selectedIdea.ownerId !== user.id ? 'pointer-events-none opacity-60' : ''}`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      <h2 className="text-2xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{selectedIdea.title}</h2>
                      <p className="text-xs text-gray-400">Proposed by: <span onClick={() => handleOpenUserProfile(selectedIdea.ownerId, selectedIdea.ownerName)} className="text-neonteal font-bold hover:underline cursor-pointer transition-all">{selectedIdea.ownerName}</span></p>

                      <div className="space-y-3">
                        <div className="bg-darkbg/40 border border-darkborder p-4 rounded-2xl hover:border-neonteal/20 transition-all duration-300">
                          <h4 className="text-xs text-neonteal font-bold uppercase mb-1">Description</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{selectedIdea.description}</p>
                        </div>
                        {selectedIdea.problem && (
                          <div className="bg-darkbg/40 border border-darkborder p-4 rounded-2xl hover:border-cyan-400/20 transition-all duration-300">
                            <h4 className="text-xs text-cyan-400 font-bold uppercase mb-1">Problem Statement</h4>
                            <p className="text-xs text-gray-300 leading-relaxed">{selectedIdea.problem}</p>
                          </div>
                        )}
                        {selectedIdea.solution && (
                          <div className="bg-darkbg/40 border border-darkborder p-4 rounded-2xl hover:border-neonviolet/20 transition-all duration-300">
                            <h4 className="text-xs text-neonviolet font-bold uppercase mb-1">Proposed Solution</h4>
                            <p className="text-xs text-gray-300 leading-relaxed">{selectedIdea.solution}</p>
                          </div>
                        )}
                        {selectedIdea.teamRequirements && (
                          <div className="bg-darkbg/40 border border-darkborder p-4 rounded-2xl hover:border-yellow-500/20 transition-all duration-300">
                            <h4 className="text-xs text-yellow-500 font-bold uppercase mb-1">Needed Skills / Teammates</h4>
                            <p className="text-xs text-gray-300 leading-relaxed">{selectedIdea.teamRequirements}</p>
                          </div>
                        )}
                      </div>

                      {/* Blockchain proof details if registered */}
                      {selectedIdea.blockchainHash && (
                        <div className="bg-neonteal/5 border border-neonteal/20 p-4 rounded-2xl space-y-2 animate-border-glow">
                          <div className="flex items-center gap-2 text-neonteal text-xs font-bold uppercase animate-pulse-glow">
                            <ShieldCheck className="w-4 h-4" /> Blockchain Protection Registry Proof
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                            <div>IPFS metadata: <span className="text-white block font-mono truncate">{selectedIdea.ipfsHash}</span></div>
                            <div>Transaction: <span className="text-white block font-mono truncate">{selectedIdea.blockchainTx}</span></div>
                            <div>Block: <span className="text-white block font-semibold text-neonteal">{selectedIdea.blockNumber}</span></div>
                            <div>Timestamp: <span className="text-white block">{new Date(selectedIdea.timestamp).toLocaleString()}</span></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Comments & AI analysis */}
                    <div className="w-80 space-y-6 shrink-0 flex flex-col justify-between animate-fade-in-up delay-100">
                      <div>
                        <div className="flex justify-between items-center pb-2 border-b border-darkborder mb-4">
                          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-neonteal animate-bounce-scale" /> Comments ({selectedIdea.comments.length})
                          </h4>
                          <button onClick={() => { setSelectedIdea(null); setAiReport(null); }} className="text-gray-400 hover:text-white font-bold text-xs transition-colors">Close</button>
                        </div>

                        {/* Comments scroll container */}
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                          {selectedIdea.comments.length > 0 ? selectedIdea.comments.map(c => (
                            <div key={c.id} className="p-3 bg-darkbg/50 border border-darkborder rounded-xl text-xs space-y-1 hover:border-white/10 transition-colors">
                              <div className="flex justify-between items-center text-[10px]">
                                <span onClick={() => handleOpenUserProfile(c.senderId, c.senderName)} className="font-bold text-neonteal hover:underline cursor-pointer transition-all">{c.senderName}</span>
                                <span className="text-gray-500">{new Date(c.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              </div>
                              <p className="text-gray-300 leading-relaxed">{c.text}</p>
                            </div>
                          )) : <p className="text-xs text-gray-500 italic text-center py-4">No comments yet. Be the first to reply!</p>}
                        </div>

                        {/* Add comment form */}
                        <form onSubmit={handleAddComment} className="mt-4 flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Add suggestion..." 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="flex-1 bg-darkbg border border-darkborder rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neonteal transition-colors"
                          />
                          <button 
                            type="submit" 
                            className="bg-neonteal hover:bg-cyan-400 text-darkbg font-bold px-3 rounded-lg text-xs active:scale-95 transition-all"
                          >
                            Post
                          </button>
                        </form>
                      </div>

                      {/* AI Feasibility Mini-Panel */}
                      <div className="bg-darkbg/80 border border-darkborder p-4 rounded-2xl relative overflow-hidden flex-1 flex flex-col justify-between mt-4 hover:border-neonviolet/30 transition-all duration-300">
                        {isAnalyzingAi ? (
                          <div className="flex flex-col items-center justify-center py-8 space-y-3">
                            <RefreshCw className="w-8 h-8 text-neonviolet animate-spin" />
                            <span className="text-xs text-gray-400 font-bold">FastAPI AI analysis in progress...</span>
                          </div>
                        ) : aiReport ? (
                          <div className="space-y-3 flex-1 flex flex-col justify-between animate-fade-in">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-extrabold text-neonviolet flex items-center gap-1.5 animate-pulse-glow">
                                  <Cpu className="w-3.5 h-3.5" /> AI Feasibility Report
                                </span>
                                <span className="text-lg font-black text-neonviolet">{aiReport.score}%</span>
                              </div>

                              <div className="space-y-2 text-[10px] text-gray-400 mt-2">
                                <div className="flex justify-between">
                                  <span>Technical Complexity:</span>
                                  <span className="text-white font-bold">{aiReport.metrics.technicalComplexity}/100</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Market Feasibility:</span>
                                  <span className="text-white font-bold">{aiReport.metrics.marketFeasibility}/100</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Risk Evaluation:</span>
                                  <span className="text-white font-bold">{aiReport.metrics.riskFactor}/100</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Advice</span>
                              <p className="text-[10px] text-gray-300 leading-relaxed italic">{aiReport.recommendations[0]}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Cpu className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            <h5 className="text-xs font-bold mb-1">No AI Analysis Run</h5>
                            <p className="text-[10px] text-gray-400 mb-4">Request our intelligence co-pilot to check feasibility.</p>
                            <button 
                              onClick={() => handleRequestAiAnalysis(selectedIdea)}
                              className="px-4 py-2 bg-gradient-to-r from-neonviolet to-fuchsia-500 rounded-xl text-[10px] font-bold text-white hover:scale-105 active:scale-95 transition-all mx-auto btn-premium-purple"
                            >
                              Launch AI Evaluation
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB: COMMUNITY HUBS */}
          {activeTab === 'communities' && (
            <div className="grid grid-cols-3 gap-8 animate-fade-in-up">
              
              {/* Directory list */}
              <div className="col-span-1 space-y-4 animate-fade-in-up delay-75">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Available Startup Hubs</h3>
                
                {communities.map((comm, idx) => {
                  const isMember = comm.members.includes(user.id);
                  const isSelected = selectedCommunity && selectedCommunity.id === comm.id;
                  return (
                    <div 
                      key={comm.id}
                      onClick={() => handleSelectCommunity(comm)}
                      className={`p-5 rounded-3xl border transition-all duration-300 transform hover:translate-x-1 cursor-pointer card-premium-hover ${
                        isSelected 
                          ? 'bg-gradient-to-r from-neonteal/15 to-neonviolet/5 border-neonteal shadow-neon' 
                          : 'bg-darkcard border-darkborder hover:border-white/20'
                      }`}
                      style={{ animationDelay: `${idx * 75}ms` }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-darkborder px-2 py-0.5 rounded-md text-gray-400">
                          {comm.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-semibold">{comm.membersCount} Builders</span>
                      </div>

                      <h4 className="font-bold text-sm mb-1">{comm.name}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">{comm.description}</p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoinCommunity(comm.id);
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all border duration-200 active:scale-95 ${
                          isMember 
                            ? 'bg-transparent border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-400' 
                            : 'bg-neonteal border-neonteal text-darkbg hover:scale-105 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                        }`}
                      >
                        {isMember ? 'Leave Hub' : 'Join Hub (+10 Coins)'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Chat Discussion Board */}
              <div className="col-span-2 bg-glass border-glass rounded-3xl p-6 flex flex-col justify-between h-[580px] shadow-glass animate-fade-in-up delay-100 card-premium-hover">
                {selectedCommunity ? (
                  <>
                    <div className="pb-4 border-b border-darkborder flex justify-between items-center animate-fade-in">
                      <div>
                        <h3 className="font-extrabold text-lg font-display">
                          {selectedCommunity.name}
                        </h3>
                        <p className="text-xs text-gray-400">{selectedCommunity.description}</p>
                      </div>
                      <span className="text-xs text-gray-400 font-bold bg-white/5 px-3 py-1 rounded-full border border-darkborder animate-pulse-glow">
                        Channel Chat
                      </span>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1 animate-fade-in">
                      {messages.filter(m => m.communityId === selectedCommunity.id).length > 0 ? (
                        messages.filter(m => m.communityId === selectedCommunity.id).map((msg, mIdx) => (
                          <div 
                            key={msg.id} 
                            className={`flex flex-col max-w-lg p-4 rounded-2xl text-xs transition-all duration-300 hover:border-white/10 ${
                              msg.senderId === user.id 
                                ? 'ml-auto bg-neonteal/15 border border-neonteal/20 text-white rounded-tr-none' 
                                : 'bg-darkcard border border-darkborder text-gray-300 rounded-tl-none'
                            }`}
                            style={{ animationDelay: `${mIdx * 50}ms` }}
                          >
                            <div className="flex justify-between items-center gap-6 mb-1 text-[10px] text-gray-400">
                              <span onClick={() => handleOpenUserProfile(msg.senderId, msg.senderName)} className="font-bold text-neonteal hover:underline cursor-pointer transition-all">{msg.senderName}</span>
                              <span>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                            <p className="leading-relaxed">{msg.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                          <MessageSquare className="w-8 h-8 text-gray-500 animate-bounce-scale" />
                          <p className="text-xs text-gray-400 italic">This discussion channel is empty. Introduce your startup ideas!</p>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="pt-4 border-t border-darkborder flex gap-3 animate-fade-in">
                      <input 
                        type="text" 
                        placeholder={`Message #${selectedCommunity.name.toLowerCase()}...`}
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1 bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neonteal transition-colors"
                      />
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-neonteal to-cyan-400 text-darkbg font-bold px-6 py-3 rounded-xl text-sm hover:scale-105 active:scale-95 transition-all btn-premium"
                      >
                        Send
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                    <Users className="w-12 h-12 text-gray-500 animate-float" />
                    <div>
                      <h4 className="font-bold text-base">Select a Community Hub</h4>
                      <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1 leading-relaxed">
                        Join discussions and team recruitment chats. Click on any community in the left directory list to enter.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: DAO GOVERNANCE */}
          {activeTab === 'dao' && (
            <div className="grid grid-cols-3 gap-8 animate-fade-in-up">
              
              {/* Proposals List */}
              <div className="col-span-2 space-y-6 animate-fade-in-up delay-75">
                <div className="flex justify-between items-center pb-4 border-b border-darkborder">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Vote className="w-5 h-5 text-neonteal animate-pulse-glow" /> Active DAO Governance Decisions
                  </h3>
                  <button 
                    onClick={() => setShowProposalForm(!showProposalForm)}
                    className="text-xs font-bold text-neonteal border border-neonteal/20 hover:border-neonteal px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 hover:scale-102"
                  >
                    {showProposalForm ? 'View Proposals' : 'Submit Proposal (-50 Coins)'}
                  </button>
                </div>

                {showProposalForm ? (
                  <div className="bg-glass border-glass rounded-3xl p-6 shadow-glass animate-scale-in">
                    <h4 className="font-bold text-sm mb-4">Create Governance Proposal</h4>
                    
                    <form onSubmit={handleCreateProposal} className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-400 font-semibold mb-1">Proposal Title</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Fund Hackathon Prizes"
                          value={newProposal.title}
                          onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                          className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 font-semibold mb-1">Category</label>
                          <select 
                            value={newProposal.category}
                            onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value })}
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                          >
                            <option value="Funding">Funding</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Governance">Governance</option>
                          </select>
                        </div>
                        <div className="flex items-center pt-5">
                          <span className="text-[10px] text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-2 rounded-xl flex items-center gap-1.5 animate-pulse-glow">
                            <Info className="w-3.5 h-3.5" /> Costs 50 Launchpad Coins to submit
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 font-semibold mb-1">Detailed Description</label>
                        <textarea 
                          rows="4" required
                          placeholder="Provide context, cost breakdowns, and technical specifications for the DAO to vote..."
                          value={newProposal.description}
                          onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                          className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal transition-colors"
                        ></textarea>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button 
                          type="submit" 
                          className="bg-gradient-to-r from-neonteal to-cyan-400 text-darkbg font-bold px-6 py-2.5 rounded-xl text-xs hover:scale-105 active:scale-95 transition-all btn-premium"
                        >
                          Launch Vote
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setShowProposalForm(false)}
                          className="bg-white/5 border border-darkborder text-gray-300 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-white/10 transition-colors"
                        >
                          Discard
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {proposals.map((prop, idx) => {
                      const totalWeight = prop.votesWeight.yes + prop.votesWeight.no;
                      const yesPct = totalWeight > 0 ? Math.round((prop.votesWeight.yes / totalWeight) * 100) : 50;
                      const noPct = totalWeight > 0 ? Math.round((prop.votesWeight.no / totalWeight) * 100) : 50;

                      return (
                        <div 
                          key={prop.id} 
                          className="bg-glass border-glass rounded-3xl p-6 shadow-glass space-y-4 card-premium-hover animate-fade-in-up"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="bg-neonteal/10 text-neonteal text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-neonteal/10 animate-pulse-glow">
                                {prop.category}
                              </span>
                              <h4 className="font-bold text-sm mt-2 text-white">{prop.title}</h4>
                            </div>
                            <span className="text-[10px] text-gray-400 font-semibold bg-white/5 border border-darkborder px-2.5 py-1 rounded-full">
                              Active - {new Date(prop.expiresAt).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="text-xs text-gray-400 leading-relaxed">{prop.description}</p>

                          {/* Progress bar of votes */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-neonteal">YES: {prop.votesWeight.yes} votes ({yesPct}%)</span>
                              <span className="text-red-400">NO: {prop.votesWeight.no} votes ({noPct}%)</span>
                            </div>
                            <div className="h-2 w-full bg-darkbg border border-darkborder rounded-full overflow-hidden flex">
                              <div className="h-full bg-neonteal transition-all duration-1000 ease-out" style={{ width: `${yesPct}%` }}></div>
                              <div className="h-full bg-red-400 transition-all duration-1000 ease-out" style={{ width: `${noPct}%` }}></div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2 pt-2 justify-between items-center border-t border-darkborder/50">
                            <span className="text-[10px] text-gray-500 italic">Created by: {prop.creatorName}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleVoteProposal(prop.id, 'yes')}
                                className="bg-neonteal/10 hover:bg-neonteal hover:text-darkbg text-neonteal border border-neonteal/20 font-bold px-4 py-1.5 rounded-xl text-xs transition-all active:scale-95 duration-200"
                              >
                                Vote YES
                              </button>
                              <button
                                onClick={() => handleVoteProposal(prop.id, 'no')}
                                className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 font-bold px-4 py-1.5 rounded-xl text-xs transition-all active:scale-95 duration-200"
                              >
                                Vote NO
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sidebar explanation of DAO */}
              <div className="space-y-6 animate-fade-in-up delay-100">
                <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Vote className="w-4 h-4 text-neonteal" /> DAO Governance Rules
                  </h4>
                  <ul className="text-xs text-gray-400 space-y-3 leading-relaxed">
                    <li className="hover:translate-x-1 transition-transform duration-200">
                      <strong>Coin-Weighted Influence:</strong> Your voting power corresponds directly to your current coin balance. 
                      More coins = higher voting weight.
                    </li>
                    <li className="hover:translate-x-1 transition-transform duration-200">
                      <strong>Zero Expense Voting:</strong> Casting a vote does not spend your coins! It is a read-only registry check. 
                      Participating rewards you with <strong className="text-white">+10 Coins</strong>.
                    </li>
                    <li className="hover:translate-x-1 transition-transform duration-200">
                      <strong>Treasury Access:</strong> Approved funding proposals will programmatically allocate coins to student project wallets.
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* TAB: BLOCKCHAIN REGISTRY */}
          {activeTab === 'blockchain' && (
            <div className="grid grid-cols-3 gap-8 animate-fade-in-up">
              
              {/* Registry action card */}
              <div className="col-span-1 space-y-6 animate-fade-in-up delay-75">
                <div className="bg-glass border-glass rounded-3xl p-6 shadow-glass relative overflow-hidden card-premium-hover">
                  <div className="absolute top-[-40%] left-[-40%] w-[80%] h-[80%] bg-neonteal/10 rounded-full blur-[80px] pointer-events-none"></div>

                  <h3 className="font-extrabold text-base mb-4 font-display flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-neonteal animate-float" /> Web3 Registrar
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Connect your MetaMask wallet. Submitting an idea generates a cryptographically secure hash of its content, registering it on-chain to provide immutable proof of IP ownership.
                  </p>

                  {!metaMaskAddress ? (
                    <button 
                      onClick={connectMetaMask}
                      className="w-full py-3 bg-gradient-to-r from-neonteal to-cyan-400 text-darkbg font-bold text-xs rounded-xl shadow-neon hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 btn-premium"
                    >
                      <Lock className="w-4 h-4 text-darkbg" /> Connect MetaMask Wallet
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-3 bg-darkbg/50 border border-darkborder rounded-xl">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Connected Address</span>
                        <span className="text-xs font-mono text-neonteal break-all block">{metaMaskAddress}</span>
                      </div>
                      <button 
                        onClick={disconnectMetaMask}
                        className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs rounded-xl transition-all duration-200 active:scale-95"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">IP Protection Benefits</h4>
                  <ul className="text-xs text-gray-400 space-y-2.5">
                    <li className="flex gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="w-4 h-4 text-neonteal shrink-0 animate-pulse-glow" /> Permanent record on Polygon block header.</li>
                    <li className="flex gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="w-4 h-4 text-neonteal shrink-0 animate-pulse-glow" /> Immutable proof of idea submission timestamp.</li>
                    <li className="flex gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="w-4 h-4 text-neonteal shrink-0 animate-pulse-glow" /> Secure IP protection while looking for team recruits.</li>
                  </ul>
                </div>
              </div>

              {/* Blockchain Registry Ledger Explorer */}
              <div className="col-span-2 bg-glass border-glass rounded-3xl p-6 shadow-glass flex flex-col justify-between min-h-[480px] animate-fade-in-up delay-100 card-premium-hover">
                <div>
                  <div className="pb-3 border-b border-darkborder mb-4">
                    <h3 className="font-extrabold text-base font-display">Incubation Registry Explorer</h3>
                    <p className="text-xs text-gray-400">Verifiably logged ideas on local simulated Polygon testnet chain.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="text-gray-500 border-b border-darkborder">
                          <th className="py-3 font-semibold">Block</th>
                          <th className="py-3 font-semibold">Startup Project</th>
                          <th className="py-3 font-semibold">Cryptographic Hash</th>
                          <th className="py-3 font-semibold">IPFS Metadata</th>
                          <th className="py-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-darkborder/50 text-gray-300">
                        {ideas.filter(i => i.blockchainHash).map((idea, idx) => (
                          <tr key={idea.id} className="hover:bg-white/5 transition-colors group">
                            <td className="py-4 text-neonteal font-mono font-bold group-hover:animate-pulse-glow">{idea.blockNumber}</td>
                            <td className="py-4 font-bold">{idea.title}</td>
                            <td className="py-4 font-mono truncate max-w-[120px] text-gray-400 group-hover:text-white transition-colors">{idea.blockchainHash}</td>
                            <td className="py-4 font-mono truncate max-w-[100px] text-gray-400 group-hover:text-white transition-colors">{idea.ipfsHash}</td>
                            <td className="py-4">
                              <span className="text-[9px] bg-neonteal/10 text-neonteal border border-neonteal/20 font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 uppercase tracking-wide w-fit animate-border-glow">
                                <CheckCircle2 className="w-3 h-3 text-neonteal" /> Verified
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {ideas.filter(i => i.blockchainHash).length === 0 && (
                      <div className="text-center py-16 space-y-2">
                        <Lock className="w-8 h-8 text-gray-500 mx-auto animate-float" />
                        <p className="text-xs text-gray-400 italic">No ideas registered on-chain yet. Connect MetaMask to upload hashes.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: WALLET & REWARD SHOP */}
          {activeTab === 'wallet' && (
            <div className="grid grid-cols-3 gap-8 animate-fade-in-up">
              
              {/* Perks / Rewards Shop */}
              <div className="col-span-2 space-y-6 animate-fade-in-up delay-75">
                <h3 className="text-base font-bold pb-2 border-b border-darkborder flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400 animate-bounce-scale" /> Redeeming Launchpad Perks
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { id: 'perk-1', label: 'Feature Idea on Leaderboard', description: 'Pins your project to the top startup incubator feed for 7 days to get maximum exposure.', cost: 80 },
                    { id: 'perk-2', label: '1-on-1 Academic Mentor review', description: 'Schedule a 30-min feedback review with our university incubator specialist.', cost: 150 },
                    { id: 'perk-3', label: 'Developer Cloud Credit Grant', description: 'Redeem 50 Launchpad coins for $10 worth of AWS or Vercel cloud credits.', cost: 250 },
                    { id: 'perk-4', label: 'Beta Tester Recruitment Campaign', description: 'Request platform administrators to send a newsletter call for beta testing signup.', cost: 120 }
                  ].map((perk, idx) => {
                    const canAfford = user.coinBalance >= perk.cost;
                    return (
                      <div 
                        key={perk.id} 
                        className="bg-glass border-glass rounded-3xl p-5 shadow-glass flex flex-col justify-between h-[210px] hover:border-yellow-400/30 transition-all duration-300 card-premium-hover animate-fade-in-up"
                        style={{ animationDelay: `${idx * 75}ms` }}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] text-yellow-400 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider animate-pulse-glow">
                              <Coins className="w-3 h-3 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} /> {perk.cost} Coins
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-white mb-1.5">{perk.label}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{perk.description}</p>
                        </div>

                        <button 
                          onClick={() => handleRedeemPerk(perk)}
                          disabled={!canAfford}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border duration-200 active:scale-95 ${
                            canAfford 
                              ? 'bg-yellow-400 border-yellow-400 text-darkbg hover:scale-105 hover:shadow-[0_0_12px_rgba(250,204,21,0.2)]' 
                              : 'bg-transparent border-darkborder text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? 'Redeem Perk' : 'Insufficient Coins'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Wallet Transaction logs */}
              <div className="col-span-1 bg-glass border-glass rounded-3xl p-6 shadow-glass flex flex-col justify-between min-h-[480px] animate-fade-in-up delay-100 card-premium-hover">
                <div>
                  <div className="pb-3 border-b border-darkborder mb-4">
                    <h3 className="font-extrabold text-base font-display">Wallet History</h3>
                    <p className="text-xs text-gray-400">Record of coin earnings and redemptions.</p>
                  </div>

                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                    {transactions.map((tx, idx) => (
                      <div 
                        key={tx.id} 
                        className="p-3 bg-darkbg/50 border border-darkborder rounded-xl text-xs flex justify-between items-center hover:border-white/10 transition-colors animate-fade-in-up"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-white block truncate max-w-[130px]">{tx.description}</span>
                          <span className="text-[10px] text-gray-500 block">{new Date(tx.timestamp).toLocaleDateString()}</span>
                        </div>
                        <span className={`font-extrabold text-xs tracking-wide shrink-0 ${tx.type === 'EARN' ? 'text-neonteal' : 'text-red-400'}`}>
                          {tx.type === 'EARN' ? '+' : '-'}{tx.amount}
                        </span>
                      </div>
                    ))}
                    {transactions.length === 0 && (
                      <p className="text-xs text-gray-500 italic text-center py-8">No transaction logs available.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: MY PROFILE */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-3 gap-8 animate-fade-in-up">
              {/* Left Column: Avatar & Photos Customizer */}
              <div className="col-span-1 space-y-8 animate-fade-in-up delay-75">
                {/* Character Avatar Display */}
                <div className="bg-glass border-glass rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-glass card-premium-hover">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-neonteal/5 rounded-full blur-2xl"></div>
                  
                  <span className="text-xs text-neonteal uppercase tracking-widest font-extrabold mb-4 block">
                    Character Avatar
                  </span>

                  <div className="mb-4 relative">
                    <div className={`p-1.5 rounded-3xl bg-gradient-to-tr from-neonteal to-neonviolet shadow-neon`}>
                      <CharacterAvatar avatar={profileAvatar || 'robo'} color={avatarColor} className="w-40 h-40 rounded-[22px]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold capitalize mt-2">
                    {profileAvatar ? `${profileAvatar} Avatar` : 'Robo Dev Avatar'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                    Select your themed tech-identity in the customizer below.
                  </p>
                </div>

                {/* Avatar & Photo Customizer Controls */}
                <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover">
                  <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neonteal" /> Identity Customizer
                  </h4>

                  {/* Character Avatar Preset Selector */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-400 font-semibold block mb-2">1. Choose Avatar Role</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'robo', label: 'Robo Dev' },
                          { id: 'hacker', label: 'Hacker' },
                          { id: 'ninja', label: 'Ninja' },
                          { id: 'astro', label: 'Astronaut' },
                          { id: 'synth', label: 'AI Synth' },
                          { id: 'sage', label: 'Sorcerer' },
                        ].map(av => (
                          <button
                            key={av.id}
                            type="button"
                            onClick={() => setProfileAvatar(av.id)}
                            className={`py-2 px-1 rounded-xl text-[10px] font-bold border transition-all ${
                              profileAvatar === av.id
                                ? 'bg-neonteal/10 border-neonteal text-neonteal'
                                : 'bg-darkbg border-darkborder text-gray-400 hover:text-white'
                            }`}
                          >
                            {av.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Avatar Color Selector */}
                    <div>
                      <span className="text-xs text-gray-400 font-semibold block mb-2">2. Glowing Neon Theme</span>
                      <div className="flex gap-2">
                        {[
                          { id: 'teal', label: 'Teal', color: 'bg-neonteal' },
                          { id: 'violet', label: 'Violet', color: 'bg-neonviolet' },
                          { id: 'pink', label: 'Pink', color: 'bg-neonpink' },
                          { id: 'gold', label: 'Gold', color: 'bg-yellow-500' },
                        ].map(c => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setAvatarColor(c.id)}
                            className={`w-6 h-6 rounded-full ${c.color} border-2 transition-transform duration-200 ${
                              avatarColor === c.id ? 'border-white scale-120 shadow-lg' : 'border-transparent hover:scale-110'
                            }`}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Profile Photo Preset Selector */}
                    <div className="pt-2 border-t border-darkborder">
                      <span className="text-xs text-gray-400 font-semibold block mb-2">3. Profile Picture Preset</span>
                      <div className="grid grid-cols-6 gap-2">
                        {['preset-1', 'preset-2', 'preset-3', 'preset-4', 'preset-5', 'preset-6'].map(presetKey => (
                          <button
                            key={presetKey}
                            type="button"
                            onClick={() => setProfilePhoto(presetKey)}
                            className={`w-9 h-9 rounded-full border transition-all ${
                              profilePhoto === presetKey ? 'border-neonteal scale-110' : 'border-transparent hover:scale-105'
                            }`}
                          >
                            <ProfilePhoto photo={presetKey} className="w-full h-full" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Image Upload */}
                    <div className="pt-2">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">4. Or Upload Custom Image</span>
                      <div className="relative flex items-center justify-center border-2 border-dashed border-darkborder hover:border-neonteal rounded-xl p-4 transition-colors cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfilePhoto(reader.result);
                                showNotification('Profile photo uploaded successfully!', 'success');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-center">
                          <Camera className="w-5 h-5 mx-auto text-gray-400 group-hover:text-neonteal transition-colors mb-1" />
                          <span className="text-[10px] text-gray-400 group-hover:text-white font-medium block">
                            Select Photo (PNG/JPG)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: User Profile Info */}
              <div className="col-span-2 space-y-8 animate-fade-in-up delay-100">
                {/* Profile Detail Summary Card */}
                <div className="bg-glass border-glass rounded-3xl p-8 relative overflow-hidden shadow-glass card-premium-hover">
                  <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-l from-neonviolet/10 to-transparent pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neonteal to-neonviolet p-0.5 shadow-neon">
                        <ProfilePhoto photo={profilePhoto} name={user.name} className="w-full h-full" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold font-display flex items-center gap-2.5">
                          {user.name}
                          <span className="text-xs uppercase font-extrabold tracking-wider text-neonteal bg-neonteal/10 px-2.5 py-0.5 rounded-full">
                            {user.rank}
                          </span>
                        </h2>
                        <p className="text-sm text-gray-400 font-medium italic mt-0.5">
                          {profileTagline || 'Incubator Student Entrepreneur'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (isEditingProfile) {
                          handleUpdateProfile();
                        } else {
                          setIsEditingProfile(true);
                        }
                      }}
                      className="text-xs font-bold text-neonteal border border-neonteal/20 hover:border-neonteal px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 duration-200 flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      {isEditingProfile ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-darkbg/50 border border-darkborder p-4 rounded-2xl hover:scale-102 transition-all">
                      <span className="text-xs text-gray-400 font-medium block">Wallet Balance</span>
                      <p className="text-lg font-bold text-yellow-400 mt-1 flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        {user.coinBalance} Coins
                      </p>
                    </div>
                    <div className="bg-darkbg/50 border border-darkborder p-4 rounded-2xl hover:scale-102 transition-all">
                      <span className="text-xs text-gray-400 font-medium block">Reputation Score</span>
                      <p className="text-lg font-bold text-neonviolet mt-1">{user.reputation} XP</p>
                    </div>
                    <div className="bg-darkbg/50 border border-darkborder p-4 rounded-2xl hover:scale-102 transition-all">
                      <span className="text-xs text-gray-400 font-medium block">Contributions</span>
                      <p className="text-lg font-bold text-white mt-1">
                        {ideas.filter(i => i.ownerId === user.id).length} Pitch{ideas.filter(i => i.ownerId === user.id).length !== 1 ? 'es' : ''}
                      </p>
                    </div>
                  </div>

                  {!isEditingProfile ? (
                    <div className="space-y-6">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-1.5">Biography</span>
                        <p className="text-sm text-gray-300 leading-relaxed bg-darkbg/30 p-4 rounded-2xl border border-darkborder">
                          {profileBio || "No biography added yet. Update your profile to earn the 'Fully Detailed' achievement!"}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        {profileGithub && (
                          <a href={profileGithub} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white bg-darkbg/50 border border-darkborder px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5">
                            <span className="w-2 h-2 rounded-full bg-neonteal"></span> GitHub Profile
                          </a>
                        )}
                        {profileLinkedin && (
                          <a href={profileLinkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white bg-darkbg/50 border border-darkborder px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5">
                            <span className="w-2 h-2 rounded-full bg-neonviolet"></span> LinkedIn Profile
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1 font-semibold">Professional Tagline</label>
                          <input
                            type="text"
                            value={profileTagline}
                            onChange={(e) => setProfileTagline(e.target.value)}
                            placeholder="e.g. Lead Designer @ EcoScan | CS Student"
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1 font-semibold">Skills (Comma-separated)</label>
                          <input
                            type="text"
                            value={profileSkills}
                            onChange={(e) => setProfileSkills(e.target.value)}
                            placeholder="React, Python, Solidity, Marketing"
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1 font-semibold">Interests (Comma-separated)</label>
                          <input
                            type="text"
                            value={profileInterests}
                            onChange={(e) => setProfileInterests(e.target.value)}
                            placeholder="AI/ML, Web3, CleanTech, EdTech"
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1 font-semibold">GitHub Profile URL</label>
                          <input
                            type="url"
                            value={profileGithub}
                            onChange={(e) => setProfileGithub(e.target.value)}
                            placeholder="https://github.com/username"
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-xs text-gray-400 mb-1 font-semibold">LinkedIn Profile URL</label>
                          <input
                            type="url"
                            value={profileLinkedin}
                            onChange={(e) => setProfileLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1 font-semibold">Biography</label>
                        <textarea
                          rows="3"
                          value={profileBio}
                          onChange={(e) => setProfileBio(e.target.value)}
                          placeholder="Tell the community about yourself, your background, and your startup goals..."
                          className="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neonteal"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-neonteal to-cyan-400 text-darkbg font-bold px-5 py-2.5 rounded-xl text-xs btn-premium"
                        >
                          Save Profile Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingProfile(false);
                            setProfileSkills(user.skills.join(', '));
                            setProfileInterests(user.interests.join(', '));
                            setProfileBio(user.bio || '');
                            setProfileTagline(user.tagline || '');
                            setProfileGithub(user.githubUrl || '');
                            setProfileLinkedin(user.linkedinUrl || '');
                            setProfilePhoto(user.profilePhoto || '');
                            setProfileAvatar(user.characterAvatar || 'robo');
                            setAvatarColor(user.avatarColor || 'teal');
                          }}
                          className="bg-white/5 border border-darkborder text-gray-300 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-white/10 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Focus Areas Badges Section */}
                {!isEditingProfile && (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover">
                      <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                        <Award className="w-4 h-4 text-neonteal" /> Focus Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.length > 0 ? (
                          user.skills.map((s, idx) => (
                            <span key={idx} className="bg-neonteal/10 text-neonteal border border-neonteal/10 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 hover:bg-neonteal hover:text-darkbg transition-all duration-200 cursor-default">
                              {s}
                            </span>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 italic">No skills listed yet.</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover">
                      <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-neonviolet" /> Focus Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.length > 0 ? (
                          user.interests.map((s, idx) => (
                            <span key={idx} className="bg-neonviolet/10 text-neonviolet border border-neonviolet/10 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 hover:bg-neonviolet hover:text-white transition-all duration-200 cursor-default">
                              {s}
                            </span>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 italic">No interests listed yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievements List */}
                <div className="bg-darkcard border border-darkborder rounded-3xl p-6 card-premium-hover-purple">
                  <h3 className="text-base font-bold flex items-center gap-2 mb-4">
                    <Trophy className="w-4 h-4 text-yellow-400" /> Platform Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {user.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-darkbg/50 border border-darkborder p-3 rounded-2xl hover:scale-103 hover:border-yellow-400/25 transition-all duration-300 cursor-default">
                        <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{ach}</p>
                          <span className="text-[10px] text-gray-400">Earned & Verified</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Global Toast Alert Box */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-darkcard border border-darkborder px-5 py-3 rounded-2xl shadow-glass flex items-center gap-3 z-50 animate-slide-in-right">
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-neonteal animate-pulse-glow" /> : <AlertCircle className="w-5 h-5 text-red-400 animate-bounce-scale" />}
          <span className="text-sm font-medium text-white">{notification.message}</span>
        </div>
      )}

      {/* USER PUBLIC PROFILE MODAL */}
      {viewingUserProfile && (
        <div className="fixed inset-0 bg-darkbg/85 backdrop-blur-md flex items-center justify-center p-6 z-[60] overflow-y-auto animate-fade-in animate-duration-200">
          <div className="w-full max-w-3xl bg-glass border-glass rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-glass relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setViewingUserProfile(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-darkborder text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Side: Avatar/Photo */}
              <div className="col-span-1 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="p-1 rounded-full bg-gradient-to-tr from-neonteal to-neonviolet shadow-neon w-36 h-36 flex items-center justify-center overflow-hidden">
                    <ProfilePhoto photo={viewingUserProfile.profilePhoto} name={viewingUserProfile.name} className="w-full h-full" />
                  </div>
                  {viewingUserProfile.characterAvatar && (
                    <div className="absolute -bottom-3 -right-3 p-1 rounded-2xl bg-darkcard border border-darkborder shadow-neon">
                      <CharacterAvatar avatar={viewingUserProfile.characterAvatar} color={viewingUserProfile.avatarColor || 'teal'} className="w-12 h-12 rounded-xl" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display">{viewingUserProfile.name}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neonteal bg-neonteal/10 px-2 py-0.5 rounded-full mt-1.5 inline-block animate-pulse-glow">
                    {viewingUserProfile.rank || 'Bronze'}
                  </span>
                </div>

                <div className="w-full pt-4 border-t border-darkborder space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Reputation</span>
                    <span className="font-bold text-neonviolet">{viewingUserProfile.reputation || 0} XP</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Launchpad Coins</span>
                    <span className="font-bold text-yellow-400 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-yellow-400" />
                      {viewingUserProfile.coinBalance || 0}
                    </span>
                  </div>
                </div>

                {/* Socials */}
                <div className="w-full flex justify-center gap-3 pt-2">
                  {viewingUserProfile.githubUrl && (
                    <a
                      href={viewingUserProfile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 border border-darkborder text-gray-400 hover:text-white hover:-translate-y-0.5 transition-all"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {viewingUserProfile.linkedinUrl && (
                    <a
                      href={viewingUserProfile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 border border-darkborder text-gray-400 hover:text-white hover:-translate-y-0.5 transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Side: Bio, Skills, Ideas */}
              <div className="col-span-2 space-y-6 text-left">
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-gray-400 mb-1">Tagline</h4>
                  <p className="text-sm text-gray-300 font-semibold italic">
                    {viewingUserProfile.tagline || 'Student Builder & Innovator'}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-gray-400 mb-2">Biography</h4>
                  <p className="text-sm text-gray-300 leading-relaxed bg-darkbg/50 border border-darkborder p-4 rounded-2xl">
                    {viewingUserProfile.bio || 'This student hasn\'t added a biography yet.'}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-gray-400 mb-2">Skills & Focus Areas</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingUserProfile.skills && viewingUserProfile.skills.length > 0 ? (
                      viewingUserProfile.skills.map((s, idx) => (
                        <span key={idx} className="bg-neonteal/10 text-neonteal border border-neonteal/10 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 italic">No skills listed yet.</span>
                    )}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-gray-400 mb-2">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingUserProfile.achievements && viewingUserProfile.achievements.length > 0 ? (
                      viewingUserProfile.achievements.map((ach, idx) => (
                        <span key={idx} className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/10 px-2.5 py-0.5 rounded-xl text-[10px] font-bold flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> {ach}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-gray-500 italic">No achievements unlocked yet.</span>
                    )}
                  </div>
                </div>

                {/* Idea Portfolio */}
                <div className="pt-4 border-t border-darkborder">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-gray-400 mb-3">Startup Portfolio</h4>
                  <div className="space-y-2">
                    {ideas.filter(i => i.ownerId === viewingUserProfile.id).length > 0 ? (
                      ideas.filter(i => i.ownerId === viewingUserProfile.id).map(idea => (
                        <div
                          key={idea.id}
                          onClick={() => {
                            setSelectedIdea(idea);
                            setViewingUserProfile(null);
                            setActiveTab('incubator');
                          }}
                          className="p-3 bg-darkbg/40 border border-darkborder hover:border-neonteal/30 rounded-xl flex justify-between items-center cursor-pointer transition-all hover:translate-x-1"
                        >
                          <div>
                            <span className="font-bold text-sm block text-white">{idea.title}</span>
                            <span className="text-[10px] text-gray-400">{idea.category} • Stage: {idea.stage}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic">No startup ideas submitted yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatbotOpen ? (
          <button
            onClick={() => setIsChatbotOpen(true)}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-float ${
              avatarColor === 'teal' ? 'bg-neonteal glow-teal' :
              avatarColor === 'violet' ? 'bg-neonviolet glow-violet' :
              avatarColor === 'pink' ? 'bg-pink-500 glow-pink' :
              'bg-yellow-500 box-shadow-[0_0_20px_rgba(234,179,8,0.35)]'
            }`}
          >
            <MessageSquare className="w-6 h-6 animate-pulse" />
          </button>
        ) : (
          <div className="w-96 h-[500px] bg-glass border-glass rounded-3xl flex flex-col shadow-2xl border border-darkborder/50 animate-scale-in overflow-hidden relative text-left"
               style={{ 
                 borderColor: avatarColor === 'teal' ? 'rgba(6,182,212,0.3)' : 
                              avatarColor === 'violet' ? 'rgba(139,92,246,0.3)' : 
                              avatarColor === 'pink' ? 'rgba(236,72,153,0.3)' : 
                              'rgba(234,179,8,0.3)'
               }}>
            {/* Header */}
            <div className={`p-4 flex justify-between items-center border-b border-darkborder/50 ${
              avatarColor === 'teal' ? 'bg-neonteal/10' :
              avatarColor === 'violet' ? 'bg-neonviolet/10' :
              avatarColor === 'pink' ? 'bg-pink-500/10' :
              'bg-yellow-500/10'
            }`}>
              <div className="flex items-center gap-2">
                <Bot className={`w-5 h-5 ${
                  avatarColor === 'teal' ? 'text-neonteal' :
                  avatarColor === 'violet' ? 'text-neonviolet' :
                  avatarColor === 'pink' ? 'text-pink-500' :
                  'text-yellow-500'
                }`} />
                <div>
                  <h3 className="font-extrabold text-sm text-white">Launchpad Co-pilot</h3>
                  <span className="text-[10px] text-gray-400">AI Incubator Advisor</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatbotOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {chatbotMessages.map((m, idx) => (
                <div key={m.id || idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                    m.sender === 'user' 
                      ? 'bg-darkbg border border-darkborder text-white rounded-tr-none' 
                      : `${
                          avatarColor === 'teal' ? 'bg-neonteal/5 border-neonteal/10' :
                          avatarColor === 'violet' ? 'bg-neonviolet/5 border-neonviolet/10' :
                          avatarColor === 'pink' ? 'bg-pink-500/5 border-pink-500/10' :
                          'bg-yellow-500/5 border-yellow-500/10'
                        } border text-gray-300 rounded-tl-none`
                  }`}>
                    {m.text}
                  </div>
                  
                  {/* Action Shortcuts */}
                  {m.suggestedTab && (
                    <button
                      onClick={() => {
                        setActiveTab(m.suggestedTab);
                        showNotification(`Navigated to ${m.suggestedTab.charAt(0).toUpperCase() + m.suggestedTab.slice(1)}! 🚀`, 'info');
                      }}
                      className={`mt-2 flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-[10px] transition-all hover:scale-105 active:scale-95 ${
                        avatarColor === 'teal' ? 'bg-neonteal hover:bg-cyan-400 text-darkbg' :
                        avatarColor === 'violet' ? 'bg-neonviolet hover:bg-violet-400 text-white' :
                        avatarColor === 'pink' ? 'bg-pink-500 hover:bg-pink-400 text-white' :
                        'bg-yellow-500 hover:bg-yellow-400 text-darkbg'
                      }`}
                    >
                      <span>Go to {m.suggestedTab === 'incubator' ? 'Idea Incubator' : 
                                   m.suggestedTab === 'communities' ? 'Community Hubs' : 
                                   m.suggestedTab === 'dao' ? 'DAO Governance' : 
                                   m.suggestedTab === 'profile' ? 'Profile Editor' : 
                                   m.suggestedTab.charAt(0).toUpperCase() + m.suggestedTab.slice(1)} 🚀</span>
                    </button>
                  )}
                </div>
              ))}
              
              {isChatbotTyping && (
                <div className="flex items-center gap-1.5 text-gray-400 bg-white/5 border border-darkborder max-w-[120px] rounded-2xl p-2.5 rounded-tl-none">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 border-t border-darkborder/50 bg-darkbg/20 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              <button 
                onClick={() => handleSendChatbotMessage("How do I earn coins?")}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-darkborder rounded-full text-[10px] text-gray-400 hover:text-white transition-all duration-200"
              >
                💰 Earn Coins
              </button>
              <button 
                onClick={() => handleSendChatbotMessage("Why should I register on the Blockchain?")}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-darkborder rounded-full text-[10px] text-gray-400 hover:text-white transition-all duration-200"
              >
                🔗 Blockchain IP
              </button>
              <button 
                onClick={() => handleSendChatbotMessage("How does the AI report work?")}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-darkborder rounded-full text-[10px] text-gray-400 hover:text-white transition-all duration-200"
              >
                🧠 AI Evaluation
              </button>
              <button 
                onClick={() => handleSendChatbotMessage("How do I find teammates?")}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-darkborder rounded-full text-[10px] text-gray-400 hover:text-white transition-all duration-200"
              >
                👥 Find Teammates
              </button>
              <button 
                onClick={() => handleSendChatbotMessage("What is the DAO?")}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-darkborder rounded-full text-[10px] text-gray-400 hover:text-white transition-all duration-200"
              >
                🗳️ DAO Voting
              </button>
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatbotMessage();
              }}
              className="p-3 border-t border-darkborder/50 flex gap-2"
            >
              <input
                type="text"
                value={chatbotInput}
                onChange={(e) => setChatbotInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-darkbg border border-darkborder rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-neonteal transition-colors animate-none"
              />
              <button
                type="submit"
                className={`px-4 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
                  avatarColor === 'teal' ? 'bg-neonteal hover:bg-cyan-400 text-darkbg shadow-glow-teal' :
                  avatarColor === 'violet' ? 'bg-neonviolet hover:bg-violet-400 text-white' :
                  avatarColor === 'pink' ? 'bg-pink-500 hover:bg-pink-400 text-white' :
                  'bg-yellow-500 hover:bg-yellow-400 text-darkbg'
                }`}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
