# Complete Credentials Setup Guide

This guide shows you **exactly** how to get every credential needed for your Sepolia deployment.

---

## Overview: What You Need

### Root `.env` File (for deployment)
1. ✅ **SEPOLIA_RPC_URL** - RPC endpoint to connect to Sepolia blockchain
2. ✅ **PRIVATE_KEY** - Your wallet's private key (to sign transactions)
3. ⚠️ **ETHERSCAN_API_KEY** - (Optional) To verify contracts on Etherscan

### Frontend Files (for web app)
4. ✅ **WalletConnect Project ID** - For wallet connection UI
5. ✅ **Contract Addresses** - After deployment, update frontend

---

# Part 1: Root `.env` File Setup

## 1️⃣ Get SEPOLIA_RPC_URL (Alchemy - Recommended)

### Step-by-Step:

1. **Go to Alchemy Website**
   - URL: https://dashboard.alchemy.com/
   - Click "Sign up" (or "Login" if you have account)

2. **Create Free Account**
   - Sign up with email or Google
   - No credit card required!

3. **Create a New App**
   - Click "+ Create new app" button
   - Fill in details:
     - **Name**: `Staking DApp` (or any name)
     - **Description**: Leave empty or write "Testing staking contract"
     - **Chain**: Select **Ethereum**
     - **Network**: Select **Ethereum Sepolia**
   - Click "Create app"

4. **Get Your API Key**
   - You'll see your app in the dashboard
   - Click on your app name
   - Click the "API Key" button (top right)
   - You'll see two URLs:
     - **HTTPS**: This is what you need!
     - WebSocket: Don't need this

5. **Copy the HTTPS URL**
   - It looks like: `https://eth-sepolia.g.alchemy.com/v2/AbCdEf123456789`
   - Click the copy icon next to it

6. **Add to `.env` File**
   ```bash
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/AbCdEf123456789
   ```
   ✅ Replace the placeholder with your actual URL

### Alternative: Infura (if you prefer)

1. Go to https://infura.io/
2. Sign up for free account
3. Create new project
4. Select "Ethereum" → "Sepolia"
5. Copy the endpoint URL
6. Add to `.env` file

---

## 2️⃣ Get PRIVATE_KEY (MetaMask Wallet)

### ⚠️ IMPORTANT SECURITY WARNING:
- **Create a NEW wallet just for testing** - don't use your main wallet!
- This wallet will only hold test ETH (no real money)
- Never share this private key with anyone
- The `.env` file is already in `.gitignore` so it won't be committed

### Step-by-Step:

#### A. Install MetaMask (if not installed)

1. **Install Extension**
   - Chrome: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/
   - Edge: Search "MetaMask" in Edge Add-ons

2. **Click "Get Started"**

3. **Create a New Wallet** (or import if you have one)
   - Click "Create a new wallet"
   - Create a password
   - **Save your Secret Recovery Phrase securely!**
     - Write it down on paper
     - Store in password manager
     - NEVER share it with anyone

#### B. Switch to Sepolia Network

1. **Open MetaMask**
2. **Click Network Dropdown** (top left, shows "Ethereum Mainnet")
3. **Enable Test Networks**:
   - If you don't see "Sepolia", do this:
   - Click MetaMask menu (3 dots)
   - Settings → Advanced
   - Scroll down and enable "Show test networks"
   - Close settings
4. **Select "Sepolia test network"** from dropdown

#### C. Export Private Key

1. **Click on Account Name** (top of MetaMask)
   - Usually says "Account 1"

2. **Click the 3 Dots Menu** (⋮) next to account name

3. **Click "Account Details"**

4. **Click "Show Private Key"**

5. **Enter Your MetaMask Password**

6. **Click and Hold** the "Hold to reveal Private Key" button

7. **Copy the Private Key**
   - It's a 64-character hexadecimal string
   - Looks like: `a1b2c3d4e5f6...` (without 0x prefix)
   

8. **Add to `.env` File**
   ```bash
   PRIVATE_KEY=a1b2c3d4e5f6789012345678901234567890123456789012345678901234
   ```
   ✅ Paste your actual private key (no quotes, no 0x prefix)

#### D. Copy Your Wallet Address

1. **Click on Account Name** to copy address
   - It copies automatically when you click
   - Format: `0x1234567890abcdef...`
   - You'll need this for getting test ETH!

---

## 3️⃣ Get Sepolia ETH (Free Test Money)

You need Sepolia ETH to pay for gas when deploying contracts.

### Recommended: Alchemy Faucet (0.5 ETH/day)

1. **Go to Sepolia Faucet**
   - URL: https://sepoliafaucet.com/

2. **Login with Alchemy** (if not logged in)
   - Use same account from Step 1

3. **Paste Your Wallet Address**
   - Paste the address you copied from MetaMask
   - Format: `0x1234...`

4. **Click "Send Me ETH"**

5. **Wait 10-30 seconds**
   - You'll see "Transaction sent!"
   - Check MetaMask - you should see 0.5 ETH

### Alternative Faucets (if Alchemy doesn't work)

#### QuickNode (No account needed, 0.1 ETH)
1. Go to: https://faucet.quicknode.com/ethereum/sepolia
2. Paste wallet address
3. Complete CAPTCHA
4. Click "Continue"

#### Google Cloud Faucet (0.05 ETH, needs Twitter)
1. Go to: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
2. Paste wallet address
3. Verify with Twitter
4. Receive ETH

#### Infura Faucet (Requires Infura account)
1. Go to: https://www.infura.io/faucet/sepolia
2. Login to Infura
3. Request ETH

### Verify You Got ETH

1. Open MetaMask
2. Make sure you're on **Sepolia test network**
3. You should see: `0.5 ETH` (or whatever amount)
4. ✅ Ready to deploy!

---

## 4️⃣ Get ETHERSCAN_API_KEY (Optional - for verification)

**This is OPTIONAL** - only needed if you want to verify your contracts on Etherscan.

### Why Verify?
- Makes your contract source code public and readable
- Users can verify it's not malicious
- Better transparency
- Professional touch

### Step-by-Step:

1. **Go to Etherscan**
   - URL: https://etherscan.io/ (or https://sepolia.etherscan.io/)

2. **Create Account**
   - Click "Sign In" (top right)
   - Click "Click to sign up"
   - Register with email
   - Verify your email

3. **Go to API Keys**
   - URL: https://etherscan.io/myapikey
   - Or: Profile → API Keys

4. **Create New API Key**
   - Click "+ Add" button
   - Name it: "Staking DApp"
   - Click "Create New API Key"

5. **Copy API Key**
   - Looks like: `ABC123XYZ456...`

6. **Add to `.env` File**
   ```bash
   ETHERSCAN_API_KEY=ABC123XYZ456...
   ```

---

# Part 2: Frontend Configuration

## 5️⃣ Get WalletConnect Project ID

This is needed for the wallet connection button in your frontend (RainbowKit).

### Step-by-Step:

1. **Go to WalletConnect Cloud**
   - URL: https://cloud.walletconnect.com/

2. **Sign Up / Login**
   - Sign up with email or GitHub
   - Free forever!

3. **Create New Project**
   - Click "+ New Project" or "Create"
   - Fill in:
     - **Name**: `Staking DApp`
     - **Homepage URL**: `http://localhost:3000` (for now)
   - Click "Create"

4. **Copy Project ID**
   - You'll see your project dashboard
   - Find "Project ID"
   - Looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
   - Click copy icon

5. **Update Frontend File**
   - Open: `frontend/lib/wagmi.ts`
   - Replace this line:
   ```typescript
   projectId: 'YOUR_PROJECT_ID', // Replace this
   ```
   - With:
   ```typescript
   projectId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // Your actual Project ID
   ```

---

## 6️⃣ Deploy Contracts & Get Contract Addresses

After you have Steps 1-3 complete, you can deploy!

### Deploy:

```bash
# Make sure you're in project root
npm run compile
npm run deploy:sepolia
```

### You'll See Output Like:

```
Deploying contracts...
Deploying contracts with account: 0xYourAddress
Account balance: 0.5 ETH

1. Deploying MockToken...
MockToken deployed to: 0xABC123...  ← COPY THIS!

2. Deploying StakingContract...
StakingContract deployed to: 0xDEF456...  ← COPY THIS!

=================================
Deployment Summary
=================================
MockToken: 0xABC123...
StakingContract: 0xDEF456...
Network: sepolia
Deployer: 0xYourAddress
=================================
```

### Update Frontend:

1. **Open**: `frontend/lib/contracts.ts`

2. **Find the `sepolia` section**:
```typescript
sepolia: {
  mockToken: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  stakingContract: '0x0000000000000000000000000000000000000000' as `0x${string}`,
},
```

3. **Replace with your deployed addresses**:
```typescript
sepolia: {
  mockToken: '0xABC123...' as `0x${string}`,  // Your MockToken address
  stakingContract: '0xDEF456...' as `0x${string}`,  // Your StakingContract address
},
```

---

# Summary: Complete Checklist

## Root `.env` File
```bash
# 1. From Alchemy Dashboard
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY

# 2. From MetaMask (Account Details > Export Private Key)
PRIVATE_KEY=your-64-character-private-key

# 3. From Etherscan (Optional)
ETHERSCAN_API_KEY=your-etherscan-api-key
```

## Frontend Files

### `frontend/lib/wagmi.ts`
```typescript
projectId: 'your-walletconnect-project-id', // From WalletConnect Cloud
```

### `frontend/lib/contracts.ts`
```typescript
sepolia: {
  mockToken: '0xYourDeployedTokenAddress' as `0x${string}`,
  stakingContract: '0xYourDeployedStakingAddress' as `0x${string}`,
},
```

---

# Testing Your Setup

## Test Deployment:

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia
npm run deploy:sepolia
```

Expected: Should see deployment success with contract addresses!

## Test Frontend:

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if not done)
npm install

# Run dev server
npm run dev
```

Expected:
- Frontend opens at http://localhost:3000
- "Connect Wallet" button works
- Can connect MetaMask
- Can mint, stake, and claim tokens!

---

# Common Issues

### "Insufficient funds for gas"
❌ Problem: Not enough Sepolia ETH
✅ Solution: Get more from faucets (Step 3)

### "Invalid API Key"
❌ Problem: Wrong Alchemy URL
✅ Solution: Double-check you copied the full HTTPS URL

### "Cannot read private key"
❌ Problem: Private key format wrong
✅ Solution: Make sure no `0x` prefix, no quotes, 64 hex characters

### "WalletConnect error"
❌ Problem: Missing or wrong Project ID
✅ Solution: Get new Project ID from WalletConnect Cloud

### "Contract not found"
❌ Problem: Wrong contract address
✅ Solution: Re-check addresses in `contracts.ts` match deployment output

---

# Security Reminders

- ✅ Use a **separate test wallet** for development
- ✅ Only put **test ETH** in this wallet (no real money!)
- ✅ `.env` file is in `.gitignore` (never commit it!)
- ❌ **Never** share your private key
- ❌ **Never** use mainnet private key for testing
- ✅ Keep Secret Recovery Phrase safe (for wallet backup)

---

# Next Steps After Setup

1. ✅ Deploy contracts: `npm run deploy:sepolia`
2. ✅ Update contract addresses in `frontend/lib/contracts.ts`
3. ✅ Run frontend: `cd frontend && npm run dev`
4. ✅ Connect wallet and test all features
5. ✅ View transactions on Sepolia Etherscan
6. 🎉 Share your DApp with friends!

---

Happy deploying! 🚀
