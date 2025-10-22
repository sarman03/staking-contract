# Quick Setup Reference Card

**TL;DR - Get these 5 things and you're ready to deploy!**

---

## ✅ Checklist

### 1. Alchemy RPC URL
- **Where**: https://dashboard.alchemy.com/
- **What**: Create app → Ethereum Sepolia → Copy HTTPS URL
- **Format**: `https://eth-sepolia.g.alchemy.com/v2/ABC123...`
- **Goes in**: `.env` → `SEPOLIA_RPC_URL`

### 2. MetaMask Private Key
- **Where**: MetaMask → Account Details → Show Private Key
- **What**: Your 64-character private key
- **Format**: `a1b2c3d4e5f6...` (no 0x prefix)
- **Goes in**: `.env` → `PRIVATE_KEY`
- ⚠️ **Create NEW test wallet!**

### 3. Sepolia Test ETH
- **Where**: https://sepoliafaucet.com/
- **What**: Free test ETH (0.5 ETH)
- **Need**: Your MetaMask address (0x123...)
- **Check**: MetaMask should show 0.5 ETH on Sepolia

### 4. WalletConnect Project ID
- **Where**: https://cloud.walletconnect.com/
- **What**: Create project → Copy Project ID
- **Format**: `a1b2c3d4e5f6g7h8...`
- **Goes in**: `frontend/lib/wagmi.ts` → `projectId`

### 5. Deploy & Get Contract Addresses
- **Run**: `npm run deploy:sepolia`
- **Get**: Two addresses from output
- **Goes in**: `frontend/lib/contracts.ts` → `sepolia` section

---

## 📁 Files to Edit

### 1. `.env` (root directory)
```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-KEY
PRIVATE_KEY=your-private-key-64-chars
ETHERSCAN_API_KEY=optional-for-verification
```

### 2. `frontend/lib/wagmi.ts`
```typescript
projectId: 'your-walletconnect-project-id',
```

### 3. `frontend/lib/contracts.ts`
```typescript
sepolia: {
  mockToken: '0xYourTokenAddress' as `0x${string}`,
  stakingContract: '0xYourStakingAddress' as `0x${string}`,
},
```

---

## 🚀 Deployment Commands

```bash
# 1. Compile contracts
npm run compile

# 2. Deploy to Sepolia
npm run deploy:sepolia

# 3. Start frontend
cd frontend
npm install
npm run dev
```

---

## 🔗 Quick Links

| Service | URL | Purpose |
|---------|-----|---------|
| Alchemy | https://dashboard.alchemy.com/ | RPC provider |
| Sepolia Faucet | https://sepoliafaucet.com/ | Free test ETH |
| WalletConnect | https://cloud.walletconnect.com/ | Wallet connection |
| Sepolia Etherscan | https://sepolia.etherscan.io/ | View transactions |
| MetaMask | https://metamask.io/ | Wallet |

---

## 📋 Example `.env` File

```bash
# From Alchemy Dashboard
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/Xyz789AbcDef456GhiJkl

# From MetaMask (no 0x prefix!)
PRIVATE_KEY=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

# Optional - from Etherscan
ETHERSCAN_API_KEY=ABC123XYZ456
```

---

## 📋 Example `wagmi.ts`

```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Staking DApp',
  projectId: 'a1b2c3d4e5f6g7h8i9j0',  // ← Your WalletConnect ID
  chains: [sepolia, hardhat],
  ssr: true,
});
```

---

## 📋 Example `contracts.ts` (after deployment)

```typescript
export const CONTRACTS = {
  sepolia: {
    mockToken: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4' as `0x${string}`,
    stakingContract: '0x0165878A594ca255338adfa4d48449f69242Eb8F' as `0x${string}`,
  },
  localhost: {
    mockToken: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`,
    stakingContract: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as `0x${string}`,
  },
};
```

---

## ⚡ Super Quick Setup (5 minutes)

```bash
# 1. Get Alchemy key (2 min)
open https://dashboard.alchemy.com/

# 2. Get Sepolia ETH (2 min)
open https://sepoliafaucet.com/

# 3. Get WalletConnect ID (1 min)
open https://cloud.walletconnect.com/

# 4. Edit .env file
cp .env.example .env
nano .env  # Add your credentials

# 5. Edit wagmi.ts
nano frontend/lib/wagmi.ts  # Add Project ID

# 6. Deploy!
npm run compile
npm run deploy:sepolia

# 7. Update contracts.ts with addresses from output
nano frontend/lib/contracts.ts

# 8. Run frontend
cd frontend && npm run dev

# 9. Open browser
open http://localhost:3000
```

---

## 🎯 Expected Workflow

```
1. Sign up for Alchemy     → Get RPC URL
2. Install MetaMask        → Get Private Key + Address
3. Get Sepolia ETH         → Fund wallet
4. Create .env file        → Add credentials
5. Deploy contracts        → Get contract addresses
6. Sign up WalletConnect   → Get Project ID
7. Update frontend files   → Add IDs and addresses
8. Run frontend            → Test app!
```

---

## ❓ "I'm stuck!" Quick Fixes

**Q: Where do I create .env file?**
A: In project root: `/root/projects/staking-contract/.env`

**Q: What's my wallet address?**
A: MetaMask → Click account name → Address copies automatically

**Q: How do I get private key?**
A: MetaMask → ⋮ menu → Account Details → Show Private Key

**Q: I didn't get Sepolia ETH**
A: Try different faucet, make sure you're on Sepolia network

**Q: Deployment failed**
A: Check you have 0.5 ETH, check .env file has correct values

**Q: Frontend won't connect wallet**
A: Add WalletConnect Project ID to wagmi.ts

**Q: "Contract not found" error**
A: Update contract addresses in contracts.ts after deployment

---

## 🔒 Security Checklist

- ✅ Created NEW MetaMask wallet (not your main one)
- ✅ Only has Sepolia test ETH (no real money)
- ✅ `.env` file is in `.gitignore`
- ✅ Never shared private key with anyone
- ✅ Saved recovery phrase safely

---

For detailed instructions, see:
- **CREDENTIALS_GUIDE.md** - Detailed step-by-step with explanations
- **SEPOLIA_SETUP.md** - Complete deployment guide
- **README.md** - Full project documentation

Happy deploying! 🚀
