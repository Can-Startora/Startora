import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(title="Launchpad AI Module")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class IdeaAnalysisRequest(BaseModel):
    title: str
    description: str
    problem: Optional[str] = ""
    solution: Optional[str] = ""

class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    skills: List[str]
    interests: List[str]

class TeammateRecommendationRequest(BaseModel):
    teamRequirements: str
    profiles: List[UserProfile]

class CommunityInfo(BaseModel):
    id: str
    name: str
    description: str
    category: str

class CommunityRecommendationRequest(BaseModel):
    skills: List[str]
    interests: List[str]
    communities: List[CommunityInfo]

class ChatRequest(BaseModel):
    message: str
    userContext: Optional[dict] = None

class ChatResponse(BaseModel):
    reply: str
    suggestedTab: Optional[str] = None
    suggestedAction: Optional[str] = None

# --- ENDPOINTS ---

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "FastAPI AI Module"}

@app.post("/analyze-feasibility")
def analyze_feasibility(request: IdeaAnalysisRequest):
    title = request.title
    desc = request.description
    prob = request.problem or ""
    sol = request.solution or ""
    
    full_text = f"{title} {desc} {prob} {sol}".lower()
    
    # Calculate score metrics based on structural analysis
    words_count = len(full_text.split())
    if words_count < 10:
        raise HTTPException(status_code=400, detail="Idea description is too short for a reliable feasibility analysis.")
    
    # 1. Technical Complexity (High complexity starts at 60, adjusts based on stack keywords)
    tech_keywords = {
        'blockchain': 12, 'solidity': 15, 'smart contract': 15, 'cryptography': 15,
        'ai': 10, 'machine learning': 10, 'deep learning': 12, 'nlp': 8, 'vision': 8,
        'iot': 12, 'hardware': 15, 'robotics': 15, 'sensor': 8,
        'real-time': 8, 'websockets': 6, 'database': 4, 'api': 3,
        'scale': 6, 'kubernetes': 8, 'docker': 4
    }
    
    tech_score = 45 # baseline
    for kw, val in tech_keywords.items():
        if kw in full_text:
            tech_score += val
    tech_score = min(95, max(30, tech_score))
    
    # 2. Market Feasibility (Length, structured problem/solution, business keywords)
    market_keywords = {
        'market': 8, 'customer': 8, 'user': 5, 'consumer': 5,
        'revenue': 10, 'saas': 12, 'subscription': 8, 'monetize': 10,
        'competitor': 8, 'niche': 6, 'growth': 6, 'pricing': 8,
        'b2b': 12, 'b2c': 8, 'platform': 5
    }
    
    market_score = 50 # baseline
    for kw, val in market_keywords.items():
        if kw in full_text:
            market_score += val
    # Add bonus for description length/detail
    market_score += min(15, int(words_count / 15))
    market_score = min(98, max(35, market_score))
    
    # 3. Risk Factor (derived from complexity vs completeness of idea)
    completeness = 0
    if len(prob.split()) > 10: completeness += 15
    if len(sol.split()) > 10: completeness += 15
    if words_count > 80: completeness += 20
    
    risk_score = max(15, min(90, int((tech_score * 0.7) + (100 - market_score * 0.5) - completeness)))
    
    # 4. Total Feasibility Score (Weighted average)
    feasibility_score = int((market_score * 0.5) + ((100 - tech_score) * 0.3) + ((100 - risk_score) * 0.2))
    feasibility_score = min(99, max(15, feasibility_score))
    
    # Generate structured commentary
    challenges = []
    strengths = []
    recommendations = []
    
    if tech_score > 75:
        challenges.append("High technical complexity. Building this requires specialized expertise in blockchain/cryptography or advanced AI systems.")
        recommendations.append("Build a simplified, non-blockchain/non-AI Web prototype first to validate customer demand before writing complex smart contracts or training ML models.")
    else:
        strengths.append("Moderate technical complexity. A standard web/mobile application stack will suffice, enabling rapid MVP development.")
        recommendations.append("Focus on rapid frontend prototyping using simple mock servers (e.g. Firebase or SQLite) to test user experience.")
        
    if market_score > 75:
        strengths.append("Strong business and market orientation. You have clearly identified customer personas, monetization strategies, or distribution channels.")
    else:
        challenges.append("Under-defined business viability. The monetization model or target customer segmentation is not fully articulated in the description.")
        recommendations.append("Clearly answer: Who will pay for this, how much, and why? Draft a simple Subscription or Transaction fee model.")
        
    if words_count < 40:
        challenges.append("Limited project description depth. The analysis engine has fewer metrics to evaluate your project scope.")
        recommendations.append("Elaborate further on the Problem and Solution fields to get a more accurate score.")
        
    if risk_score > 60:
        challenges.append("High project risk due to the combination of high technical overhead and unvalidated customer segments.")
    else:
        strengths.append("Lower overall risk profile. The project represents a clear, solvable problem with moderate development requirements.")

    # Fill default advice if empty
    if not strengths:
        strengths.append("Good initial concept with a clear focus on collaborative student efforts.")
    if not recommendations:
        recommendations.append("Engage with the corresponding Launchpad Community to get feedback from peers who have built similar products.")

    return {
        "score": feasibility_score,
        "metrics": {
            "technicalComplexity": tech_score,
            "marketFeasibility": market_score,
            "riskFactor": risk_score
        },
        "strengths": strengths,
        "challenges": challenges,
        "recommendations": recommendations
    }

@app.post("/recommend-teammates")
def recommend_teammates(request: TeammateRecommendationRequest):
    req_text = request.teamRequirements.lower()
    profiles = request.profiles
    
    if not req_text or not profiles:
        return []
    
    # Build text descriptions for each user profile
    user_documents = []
    for p in profiles:
        skills_str = " ".join(p.skills).lower()
        interests_str = " ".join(p.interests).lower()
        # Combine name, skills, and interests to build search profile
        user_documents.append(f"{skills_str} {skills_str} {interests_str}") # double weight on skills
        
    # Run TF-IDF Cosine Similarity
    try:
        vectorizer = TfidfVectorizer(token_pattern=r'(?u)\b\w+\b') # include single letter words like C
        corpus = [req_text] + user_documents
        tfidf = vectorizer.fit_transform(corpus)
        
        # Calculate cosine similarity of req_text (index 0) against all users (indices 1 to N)
        similarities = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()
        
        # Zip, sort, and filter recommendations
        results = []
        for idx, score in enumerate(similarities):
            user = profiles[idx]
            # Normalize score to percentage
            match_percentage = int(score * 100)
            
            # Find matching keywords
            matching_skills = [s for s in user.skills if s.lower() in req_text]
            matching_interests = [i for i in user.interests if i.lower() in req_text]
            
            results.append({
                "userId": user.id,
                "name": user.name,
                "email": user.email,
                "skills": user.skills,
                "interests": user.interests,
                "matchScore": match_percentage,
                "matchingSkills": matching_skills,
                "matchingInterests": matching_interests
            })
            
        # Sort by matchScore descending
        results = sorted(results, key=lambda x: x["matchScore"], reverse=True)
        return results
    except Exception as e:
        print("TF-IDF vectorization failed, falling back to simple keyword matching:", e)
        # Fallback to Jaccard/keyword match
        results = []
        req_words = set(re.findall(r'\w+', req_text))
        for p in profiles:
            p_words = set([s.lower() for s in p.skills] + [i.lower() for i in p.interests])
            intersection = req_words.intersection(p_words)
            match_percentage = int((len(intersection) / max(1, len(req_words))) * 100)
            results.append({
                "userId": p.id,
                "name": p.name,
                "email": p.email,
                "skills": p.skills,
                "interests": p.interests,
                "matchScore": min(95, match_percentage),
                "matchingSkills": [s for s in p.skills if s.lower() in req_words],
                "matchingInterests": [i for i in p.interests if i.lower() in req_words]
            })
        return sorted(results, key=lambda x: x["matchScore"], reverse=True)

@app.post("/recommend-communities")
def recommend_communities(request: CommunityRecommendationRequest):
    user_skills = [s.lower() for s in request.skills]
    user_interests = [i.lower() for i in request.interests]
    comms = request.communities
    
    if not comms:
        return []
    
    user_profile_text = " ".join(user_skills + user_interests)
    if not user_profile_text.strip():
        # No profile info, return all with 0% match score
        return [{"communityId": c.id, "matchScore": 0} for c in comms]
        
    comm_documents = [f"{c.name} {c.category} {c.description}".lower() for c in comms]
    
    try:
        vectorizer = TfidfVectorizer()
        corpus = [user_profile_text] + comm_documents
        tfidf = vectorizer.fit_transform(corpus)
        
        similarities = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()
        
        results = []
        for idx, score in enumerate(similarities):
            results.append({
                "communityId": comms[idx].id,
                "matchScore": int(score * 100)
            })
            
        return sorted(results, key=lambda x: x["matchScore"], reverse=True)
    except Exception as e:
        print("Community recommendations error, fallback Jaccard:", e)
        user_words = set(re.findall(r'\w+', user_profile_text))
        results = []
        for c in comms:
            c_text = f"{c.name} {c.category} {c.description}".lower()
            c_words = set(re.findall(r'\w+', c_text))
            intersection = user_words.intersection(c_words)
            results.append({
                "communityId": c.id,
                "matchScore": int((len(intersection) / max(1, len(user_words))) * 100)
            })
        return sorted(results, key=lambda x: x["matchScore"], reverse=True)

@app.post("/chatbot", response_model=ChatResponse)
def chatbot_endpoint(request: ChatRequest):
    msg = request.message.lower()
    ctx = request.userContext or {}
    
    reply = ""
    suggested_tab = None
    suggested_action = None
    
    # Extract contextual variables if available
    coin_balance = ctx.get("coinBalance", 0)
    reputation = ctx.get("reputation", 0)
    achievements = ctx.get("achievements", [])
    ideas_count = ctx.get("ideasCount", 0)
    username = ctx.get("username", "Builder")
    
    # 1. Check for specific keywords
    if any(k in msg for k in ["coin", "earn", "money", "token", "reward", "balance"]):
        reply = (
            f"Hey {username}, here's how you can earn Launchpad Coins to fund your startups and participate in governance:\n\n"
            "• 💡 **Submit an Idea** in the Incubator (+50 Coins)\n"
            "• 🔗 **Secure your IP** by registering it on-chain (+100 Coins)\n"
            "• 🚀 **Progress your Idea** to a new stage like Validation/Prototyping (+40 Coins)\n"
            "• 🗳️ **Vote on DAO Proposals** (+10 Coins)\n"
            "• 💬 **Engage in the community** (+5 Coins for upvoting/commenting, +2 for chats)\n\n"
            f"Currently, you have **{coin_balance} Coins**. Try submitting a new idea to boost your balance!"
        )
        suggested_tab = "incubator"
        suggested_action = "submit_idea"
        
    elif any(k in msg for k in ["blockchain", "solidity", "ethereum", "polygon", "ip", "ownership", "register", "secure", "hash"]):
        reply = (
            "Registering your startup idea on-chain creates a cryptographic fingerprint (hash) of your work, proving you had the idea at a specific point in time.\n\n"
            "To do this:\n"
            "1. Go to the **Incubator** tab.\n"
            "2. Select your idea and click **'Connect MetaMask'**.\n"
            "3. Click **'Register on Blockchain'**.\n\n"
            "This secures your intellectual property and rewards you with **+100 Coins** and the **'IP Protector'** achievement!"
        )
        suggested_tab = "incubator"
        suggested_action = "register_blockchain"
        
    elif any(k in msg for k in ["ai", "feasibility", "report", "analyze", "complexity", "evaluation"]):
        reply = (
            "Our integrated AI Evaluation Co-pilot performs an automated analysis on your startup ideas. It grades:\n"
            "• 🛠️ **Technical Complexity**: Difficulty of implementation.\n"
            "• 📈 **Market Feasibility**: Commercial and monetization viability.\n"
            "• ⚠️ **Risk Factor**: Complexity matched against details provided.\n\n"
            "To run it, open any idea in the **Incubator** and click **'Launch AI Evaluation'**. The advice will help you refine your solution!"
        )
        suggested_tab = "incubator"
        suggested_action = "launch_ai"
        
    elif any(k in msg for k in ["team", "partner", "member", "collaborate", "skill", "match", "find"]):
        reply = (
            "Building a startup requires a great team! To get teammate recommendations:\n"
            "1. Create an idea and fill in the **'Teammate/Skill Requirements'** field (e.g., 'Looking for a React developer with UI design skills').\n"
            "2. Open the idea; the platform will run a TF-IDF cosine similarity matching engine against other students' skills and display the best matches.\n\n"
            "You can also chat directly in **Community Hubs** to network with students."
        )
        suggested_tab = "communities"
        suggested_action = "find_teammates"
        
    elif any(k in msg for k in ["dao", "vote", "proposal", "governance", "funding"]):
        reply = (
            "DAO (Decentralized Autonomous Organization) Governance allows students to vote on startup funding proposals.\n\n"
            "• 🗳️ **Voting**: Cast your vote for active proposals. Your voting power is proportional to your coin balance!\n"
            "• 💡 **Proposals**: Submit a new proposal (costs 50 Coins) to pitch for funding or change incubator rules.\n\n"
            "Voting rewards you with **+10 Coins** and **+5 Reputation XP**."
        )
        suggested_tab = "dao"
        suggested_action = "create_proposal"
        
    elif any(k in msg for k in ["profile", "avatar", "theme", "glow", "customize", "edit"]):
        reply = (
            "Personalizing your workspace profile is a great first step! You can:\n"
            "• Select a role-based identity (e.g., Robo Dev, Sorcerer, Ninja).\n"
            "• Customize your neon glow border color (Teal, Violet, Pink, Gold).\n"
            "• Upload a profile photo or select a preset.\n"
            "• Link your GitHub and LinkedIn profiles.\n\n"
            "Completing your profile unlocks the **'Fully Detailed'** achievement and grants you **+50 Coins**!"
        )
        suggested_tab = "profile"
        suggested_action = "edit_profile"
        
    elif any(k in msg for k in ["achievement", "trophy", "badge", "xp", "reputation"]):
        unlocked = len(achievements)
        reply = (
            f"You have unlocked **{unlocked} Achievements** so far!\n\n"
            "Achievements reward you with bonus coins and XP. Key badges you can earn:\n"
            "• 🏆 **'Skill Builder'** (+20 Coins): Add skills to your profile.\n"
            "• 🏆 **'Fully Detailed'** (+50 Coins): Complete bio, tagline, and avatar.\n"
            "• 🏆 **'Ideator Spark'** (+25 Coins): Submit your first idea.\n"
            "• 🏆 **'IP Protector'** (+50 Coins): Register an idea on the blockchain.\n"
            "• 🏆 **'DAO Citizen'** (+20 Coins): Vote on a DAO proposal."
        )
        suggested_tab = "profile"
        suggested_action = "view_achievements"
        
    else:
        # Default smart response
        reply = (
            f"Hello {username}! I'm your Launchpad Co-pilot. I can guide you on what to do and how the platform works.\n\n"
            "Here are some topics you can ask me about:\n"
            "• 💰 *How to earn coins?*\n"
            "• 🔗 *Why register ideas on the blockchain?*\n"
            "• 🧠 *How does the AI feasibility report work?*\n"
            "• 👥 *How to find teammates?*\n"
            "• 🗳️ *What is the DAO?*\n"
            "• 🎨 *How to customize my profile and avatar?*\n\n"
            "What would you like to explore?"
        )
        
    return ChatResponse(reply=reply, suggestedTab=suggested_tab, suggestedAction=suggested_action)

