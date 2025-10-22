# What You Need - Visual Guide

## 🎯 The Big Picture

You need **5 things** to get your staking app running on Sepolia testnet:

```
┌─────────────────────────────────────────────────────────┐
│  1. Alchemy RPC URL      → Connect to blockchain       │
│  2. Private Key          → Sign transactions            │
│  3. Sepolia Test ETH     → Pay for gas fees            │
│  4. WalletConnect ID     → Frontend wallet connection   │
│  5. Contract Addresses   → After deployment            │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 STEP 1: Alchemy RPC URL

### What is it?
An endpoint that lets your code talk to the Sepolia blockchain.

### Where to get it?
**https://dashboard.alchemy.com/**

### Steps:
```
1. Sign up (free, no credit card)
2. Create New App
   - Chain: Ethereum
   - Network: Sepolia
3. Click on app → "API Key" button
4. Copy the HTTPS URL
```

### What it looks like:
```
https://eth-sepolia.g.alchemy.com/v2/AbC123XyZ789...
                                        ↑
                                    Your API Key
```

### Where to put it:
**File:** `.env` (root directory)
```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-KEY-HERE
```

---

## 🔑 STEP 2: Private Key

### What is it?
Your wallet's secret key that signs transactions (like deploying contracts).

### Where to get it?
**MetaMask browser extension**

### Steps:
```
1. Install MetaMask: https://metamask.io/
2. Create NEW wallet (for testing only!)
3. Save recovery phrase safely
4. Switch to Sepolia network:
   - Click network dropdown
   - Enable "Show test networks" in settings
   - Select "Sepolia test network"
5. Click account → ⋮ menu → Account Details
6. Click "Show Private Key"
7. Enter password → Copy key
```

### What it looks like:
```
a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd
↑                                                              ↑
64 hexadecimal characters (no 0x prefix!)
```

### Where to put it:
**File:** `.env` (root directory)
```bash
PRIVATE_KEY=a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd
```

### ⚠️ IMPORTANT:
- **Use a NEW test wallet** - not your main wallet!
- This wallet will only hold fake test money
- Never share this key with anyone
- `.env` is already in `.gitignore` so it won't be committed to git

---

## 💰 STEP 3: Sepolia Test ETH

### What is it?
Free fake money to pay for gas when deploying contracts.

### Where to get it?
**https://sepoliafaucet.com/** (Alchemy's faucet)

### What you need:
Your MetaMask wallet address (looks like: `0x1234...abcd`)

### How to get your address:
```
1. Open MetaMask
2. Make sure you're on Sepolia network
3. Click on account name at top
4. Address is copied automatically!
```

### Steps to get ETH:
```
1. Go to https://sepoliafaucet.com/
2. Login with Alchemy (same account from Step 1)
3. Paste your wallet address
4. Click "Send Me ETH"
5. Wait 10-30 seconds
```

### How much you get:
```
0.5 ETH per day (enough for many deployments!)
```

### Verify you got it:
```
1. Open MetaMask
2. Switch to Sepolia network
3. Should see: 0.5 ETH
```

### Alternative faucets:
```
- QuickNode: https://faucet.quicknode.com/ethereum/sepolia (0.1 ETH)
- Google Cloud: https://cloud.google.com/application/web3/faucet/ethereum/sepolia (0.05 ETH)
- Infura: https://www.infura.io/faucet/sepolia (0.5 ETH)
```

---

## 🌐 STEP 4: WalletConnect Project ID

### What is it?
ID that enables the "Connect Wallet" button in your frontend.

### Where to get it?
**https://cloud.walletconnect.com/**

### Steps:
```
1. Sign up (free forever!)
2. Create New Project
   - Name: "Staking DApp"
   - Homepage: http://localhost:3000
3. Copy the Project ID
```

### What it looks like:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
↑                              ↑
32 character alphanumeric string
```

### Where to put it:
**File:** `frontend/lib/wagmi.ts`
```typescript
export const config = getDefaultConfig({
  appName: 'Staking DApp',
  projectId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // ← Put here!
  chains: [sepolia, hardhat],
  ssr: true,
});
```

---

## 📄 STEP 5: Contract Addresses

### What are they?
The addresses where your deployed contracts live on the blockchain.

### Where to get them?
You get these AFTER deploying! Run:
```bash
npm run deploy:sepolia
```

### What the output looks like:
```
=================================
Deployment Summary
=================================
MockToken: 0xABC123...def456           ← Copy this!
StakingContract: 0xDEF789...abc123     ← Copy this!
Network: sepolia
=================================
```

### Where to put them:
**File:** `frontend/lib/contracts.ts`
```typescript
export const CONTRACTS = {
  sepolia: {
    mockToken: '0xABC123...def456' as `0x${string}`,        // ← Paste here!
    stakingContract: '0xDEF789...abc123' as `0x${string}`,  // ← Paste here!
  },
  // ...
};
```

---

## 📁 Summary: Files You'll Edit

### 1. `.env` (in project root)
```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-KEY
PRIVATE_KEY=your-64-character-private-key-here
ETHERSCAN_API_KEY=optional
```

### 2. `frontend/lib/wagmi.ts`
```typescript
projectId: 'your-walletconnect-project-id',
```

### 3. `frontend/lib/contracts.ts` (after deployment)
```typescript
sepolia: {
  mockToken: '0xYourTokenAddress' as `0x${string}`,
  stakingContract: '0xYourStakingAddress' as `0x${string}`,
},
```

---

## 🔄 Complete Workflow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. Get Alchemy RPC URL        → Add to .env               │
│           ↓                                                  │
│  2. Create MetaMask wallet     → Export private key         │
│           ↓                       Add to .env               │
│  3. Get Sepolia ETH            → Fund your wallet           │
│           ↓                                                  │
│  4. Deploy contracts           → npm run deploy:sepolia     │
│           ↓                       Get contract addresses    │
│  5. Update frontend            → Add addresses to           │
│           ↓                       contracts.ts               │
│  6. Get WalletConnect ID       → Add to wagmi.ts            │
│           ↓                                                  │
│  7. Run frontend               → npm run dev                │
│           ↓                                                  │
│  8. Test your DApp! 🎉                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ⏱️ Time Estimate

- **Alchemy account + RPC URL**: 2 minutes
- **MetaMask setup + private key**: 3 minutes
- **Get Sepolia ETH from faucet**: 2 minutes
- **Deploy contracts**: 2 minutes
- **WalletConnect Project ID**: 1 minute
- **Update frontend files**: 2 minutes
- **Run and test**: 3 minutes

**Total: ~15 minutes** from zero to working DApp!

---

## 🆘 Quick Help

### "Where do I create the .env file?"
In the project root directory: `/root/projects/staking-contract/.env`

### "How do I edit files?"
```bash
nano .env                          # Edit .env
nano frontend/lib/wagmi.ts        # Edit wagmi.ts
nano frontend/lib/contracts.ts    # Edit contracts.ts
```

### "I can't find my wallet address"
Open MetaMask → Click account name at top → It copies automatically!

### "Private key starts with 0x, do I include it?"
No! Remove the `0x` prefix. Only paste the 64 hex characters.

### "I didn't get Sepolia ETH"
- Make sure you're on Sepolia network in MetaMask
- Try a different faucet
- Wait a minute and check again

### "Deployment says 'insufficient funds'"
Get more Sepolia ETH from faucets - you need at least 0.1 ETH

### "Frontend won't connect wallet"
Did you add the WalletConnect Project ID to `wagmi.ts`?

---

## 📚 Documentation Files

- **QUICK_SETUP.md** ← Quick reference card (you are here!)
- **CREDENTIALS_GUIDE.md** ← Detailed step-by-step with screenshots
- **SEPOLIA_SETUP.md** ← Complete deployment guide
- **README.md** ← Full project documentation

---

## 🎯 Next Actions

1. ✅ Sign up for Alchemy: https://dashboard.alchemy.com/
2. ✅ Install MetaMask: https://metamask.io/
3. ✅ Get Sepolia ETH: https://sepoliafaucet.com/
4. ✅ Sign up for WalletConnect: https://cloud.walletconnect.com/
5. ✅ Edit `.env` file with your credentials
6. ✅ Deploy: `npm run deploy:sepolia`
7. ✅ Update frontend files
8. ✅ Run: `cd frontend && npm run dev`

**Let's go! 🚀**
