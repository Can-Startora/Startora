# Open Issues for Newcomers

Welcome! If you are new to the **Virtual Startup Launchpad** repository and want to make your first contribution, this file is the perfect place to start. We have compiled a list of beginner-friendly tasks categorized by difficulty, language, and project modules.

---

## Index of Issues

- [Frontend: UI Toast Notifications for Coin Rewards](#issue-1-frontend-ui-toast-notifications-for-coin-rewards) (React / Tailwind)
- [Backend: Environment Configuration Validation](#issue-2-backend-environment-configuration-validation) (Node.js / Express)
- [AI Service: Health Check Route Implementation](#issue-3-ai-service-health-check-route-implementation) (Python / FastAPI)
- [Blockchain: Input Validation in Solidity Registry](#issue-4-blockchain-input-validation-in-solidity-registry) (Solidity)
- [Documentation: Add API Endpoints Guide](#issue-5-documentation-add-api-endpoints-guide) (Markdown)

---

### Issue 1 (Frontend): UI Toast Notifications for Coin Rewards

* **Difficulty:** Easy
* **Labels:** `good first issue`, `frontend`, `react`
* **Status:** Open 🔓
* **Description:** 
  Currently, when a user completes their profile setup, they receive 50 Launchpad Coins as an achievement reward. However, there is no visual feedback or toast message alerting them that the coins were successfully added. We should show a beautiful neon-themed toast notification when this occurs.
* **Suggested Solution:**
  1. Create a lightweight Toast component in `/frontend/src/components/Toast.jsx` or integrate a simple notification system.
  2. Locate the profile completion logic inside `/frontend/src/App.jsx` or the profile page.
  3. Trigger the Toast message when the profile completion criteria (unlocking "Fully Detailed") are met.
* **Files to modify:**
  - Create: `/frontend/src/components/Toast.jsx`
  - Modify: `/frontend/src/App.jsx` (or the relevant settings screen)

---

### Issue 2 (Backend): Environment Configuration Validation

* **Difficulty:** Easy / Medium
* **Labels:** `good first issue`, `backend`, `express`
* **Status:** Open 🔓
* **Description:**
  When starting the backend API Gateway server, there are no checks to ensure the required environment variables (`JWT_SECRET` and `PORT`) are configured in the `.env` file. If they are missing, the server starts but crashes on authentication steps or defaults to arbitrary ports without explanation.
* **Suggested Solution:**
  1. In `backend/server.js`, add a check at startup that reads the environment variables.
  2. If `JWT_SECRET` is missing, log a clear warning or throw an error preventing startup.
  3. Ensure default values are cleanly handled or fallback rules are logged.
* **Files to modify:**
  - `/backend/server.js`

---

### Issue 3 (AI Service): Health Check Route Implementation

* **Difficulty:** Easy
* **Labels:** `good first issue`, `ai-service`, `fastapi`, `python`
* **Status:** Open 🔓
* **Description:**
  The FastAPI server acts as our intelligence recommendations layer, but there is no simple `/health` check route. The Node Express server needs a reliable way to check if the AI service is live.
* **Suggested Solution:**
  1. Add a new `GET /health` endpoint in `/ai_service/main.py`.
  2. The endpoint should return a simple JSON response: `{"status": "healthy", "service": "ai-matching"}`.
  3. Add a basic unit test in `/ai_service/test_main.py` (if tests exist) or create it to run locally.
* **Files to modify:**
  - `/ai_service/main.py`

---

### Issue 4 (Blockchain): Input Validation in Solidity Registry

* **Difficulty:** Medium
* **Labels:** `good first issue`, `blockchain`, `solidity`
* **Status:** Open 🔓
* **Description:**
  In the smart contract that registers startup ideas, students upload an IP proof hash. Currently, the contract does not validate if the submitted hash length or address parameters are empty, which can lead to empty registrations.
* **Suggested Solution:**
  1. Open the Solidity contract file under `/blockchain/contracts/`.
  2. Add a `require` statement inside the idea registration function verifying that the hash string length is greater than 0.
  3. Ensure error messaging (e.g. `"Hash cannot be empty"`) is passed back clearly.
  4. Write/modify a Hardhat test inside the testing suite to verify the validation is working.
* **Files to modify:**
  - `/blockchain/contracts/IdeaRegistry.sol` (or similar)
  - `/blockchain/test/registryTest.js`

---

### Issue 5 (Documentation): Add API Endpoints Guide

* **Difficulty:** Easy
* **Labels:** `good first issue`, `documentation`
* **Status:** Open 🔓
* **Description:**
  To make it easier for frontend developers to integrate backend API requests, we should document all existing backend routes (auth, idea submission, communities, profile updates) in a single markdown document.
* **Suggested Solution:**
  1. Create a `docs/API_GUIDE.md` file.
  2. Review the routing files in `backend/routes/` to compile a list of endpoints.
  3. Document the HTTP Method, Route Path, Headers, Request Body format, and Expected Response.
* **Files to modify:**
  - Create: `/docs/API_GUIDE.md`
  - Update `README.md` and `CONTRIBUTING.md` to link to it.

---

## How to Claim an Issue

1. Comment on the respective GitHub issue or reach out on the discussions forum to state you'd like to work on a task.
2. A maintainer will assign it to you.
3. Once assigned, follow the [Contributing Guidelines](CONTRIBUTING.md) to set up and submit your Pull Request!
