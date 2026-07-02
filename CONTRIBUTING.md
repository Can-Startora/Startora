# Contributing to Virtual Startup Launchpad

First off, thank you for taking the time to contribute! 🎉

We welcome contributions from developers of all skill levels. By contributing to Virtual Startup Launchpad (Startora), you help build a better innovation ecosystem for students worldwide.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Features](#suggesting-features)
   - [Pull Requests](#pull-requests)
3. [Local Development Setup](#local-development-setup)
   - [Repository Structure](#repository-structure)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [AI Service Setup](#ai-service-setup)
   - [Blockchain Setup](#blockchain-setup)
4. [Style Guides & Standards](#style-guides--standards)
   - [Commit Messages](#commit-messages)
   - [JavaScript/React Style Guide](#javascriptreact-style-guide)
   - [Python/FastAPI Style Guide](#pythonfastapi-style-guide)
   - [Solidity Style Guide](#solidity-style-guide)
5. [Looking for Starter Issues?](#looking-for-starter-issues)

---

## Code of Conduct

This project and everyone participating in it is governed by the [Virtual Startup Launchpad Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

Before submitting a bug report, please check our open issues to see if the problem has already been reported.

If you find a new bug, please open an issue and include:
* A clear, descriptive title.
* Steps to reproduce the issue.
* Expected vs. actual behavior.
* Screenshots or gifs if applicable.
* Your operating system and browser version.

### Suggesting Features

We love new ideas! If you have a suggestion for improving the platform:
* Open an issue with the tag `enhancement` or `feature-request`.
* Describe the feature, why it is useful, and how it fits into the current system.
* Provide mockups or flowcharts if possible.

### Pull Requests

1. **Fork** the repository and create your branch from `main`.
2. **Name** your branch descriptively (e.g., `feature/ai-chatbot` or `bugfix/login-error`).
3. **Write** clean, readable code and keep commits focused.
4. **Test** your changes locally.
5. **Open** a Pull Request against the `main` branch.
6. **Describe** your changes clearly in the PR description, referencing any related issues.

---

## Local Development Setup

### Repository Structure

* `/backend` - Node.js & Express API Gateway.
* `/frontend` - React.js Web Client (built with Vite and Tailwind CSS).
* `/ai_service` - Python & FastAPI Machine Learning modules.
* `/blockchain` - Solidity smart contracts & Web3 layer.

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template:
   ```bash
   cp .env.example .env  # Or create a .env file
   ```
   Add the following variables:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   AI_SERVICE_URL=http://localhost:8000
   # OPTIONAL: MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The client will be available at `http://localhost:3000`.

---

### AI Service Setup

1. Navigate to the AI service directory:
   ```bash
   cd ai_service
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

---

### Blockchain Setup

1. Navigate to the blockchain directory:
   ```bash
   cd blockchain
   ```
2. Install Hardhat dependencies:
   ```bash
   npm install
   ```
3. Compile the contracts:
   ```bash
   npx hardhat compile
   ```
4. Run a local Hardhat node or deploy to a testnet (e.g., Polygon Amoy):
   ```bash
   npx hardhat node
   ```

---

## Style Guides & Standards

### Commit Messages

We follow the **Conventional Commits** specification. Commit messages should be structured as follows:

`<type>(<scope>): <description>`

Common types:
* `feat`: A new feature.
* `fix`: A bug fix.
* `docs`: Documentation changes.
* `style`: Code formatting changes (whitespace, semi-colons, etc. without affecting functionality).
* `refactor`: Code changes that neither fix bugs nor add features.
* `test`: Adding or correcting tests.
* `chore`: Maintenance tasks (dependency updates, configuration settings).

Examples:
* `feat(profile): add coin rewards for completing profile setup`
* `fix(auth): resolve JWT expiration token crash`
* `docs(readme): update API port documentation`

### JavaScript/React Style Guide

* Use functional React components with hooks.
* Place reusable components in `/frontend/src/components/`.
* Use Tailwind CSS for UI design, matching the neon-themed aesthetic.
* Format code with Prettier and run ESLint before submitting.

### Python/FastAPI Style Guide

* Write clear type hints for all route inputs/outputs.
* Follow PEP 8 guidelines.
* Keep routes organized and delegate heavy computational/ML logic to utility classes.

### Solidity Style Guide

* Match the version defined in the compiler configs (`pragma solidity ^0.8.0`).
* Add detailed comments using the Natspec format for all public and external methods.
* Keep contract sizes minimized to prevent high gas consumption.

---

## Looking for Starter Issues?

We curate beginner-friendly tasks marked as `good first issue` to help you get started with the codebase! 

Check out the local `NEWCOMER_ISSUES.md` file in the root of the repository for a curated list of starter issues that you can pick up immediately to start contributing.
