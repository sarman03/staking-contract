# Sepolia Testnet Setup Guide

This guide will help you deploy your staking DApp to the Sepolia testnet using real test money from faucets.

## Why Sepolia?

- **Real blockchain experience** with test money (no risk)
- **Persistent deployment** - contracts stay deployed between sessions
- **Shareable** - share your DApp URL with others to test
- **Blockchain explorers** - view transactions on Etherscan
- **Realistic testing** - mimics mainnet behavior

---

## Step 1: Get a Wallet (MetaMask)

1. Install [MetaMask browser extension](https://metamask.io/)
2. Create a new wallet and **save your seed phrase securely**
3. Copy your wallet address (click on account name to copy)

---

## Step 2: Get Free Sepolia ETH (Test Money)

You need Sepolia ETH to pay for gas fees when deploying contracts. Use these faucets:

### Recommended Faucets:

1. **Alchemy Sepolia Faucet** (requires account)
   - URL: https://sepoliafaucet.com/
   - Amount: 0.5 ETH per day
   - Steps:
     - Sign up for free Alchemy account
     - Paste your wallet address
     - Click "Send Me ETH"

2. **QuickNode Faucet** (no account needed)
   - URL: https://faucet.quicknode.com/ethereum/sepolia
   - Amount: 0.1 ETH per request
   - Steps:
     - Paste your wallet address
     - Complete CAPTCHA
     - Click "Continue"

3. **Infura Faucet** (requires account)
   - URL: https://www.infura.io/faucet/sepolia
   - Amount: 0.5 ETH per day

4. **Google Cloud Faucet** (no account, Twitter verification)
   - URL: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
   - Amount: 0.05 ETH per request

### Verify You Received ETH:

1. Open MetaMask
2. Switch network to "Sepolia test network"
   - Click network dropdown at top
   - Enable "Show test networks" in settings if needed
   - Select "Sepolia"
3. You should see your balance (e.g., 0.5 ETH)

---

## Step 3: Get an RPC Provider

You need an RPC URL to connect to Sepolia. Choose one:

### Option A: Alchemy (Recommended)

1. Go to https://dashboard.alchemy.com/
2. Sign up for free account
3. Click "Create new app"
   - Name: "Staking DApp"
   - Chain: Ethereum
   - Network: Sepolia
4. Click on your app
5. Click "API Key" button
6. Copy the HTTPS URL (looks like: `https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY`)

### Option B: Infura

1. Go to https://infura.io/
2. Sign up for free account
3. Create new project
4. Copy the Sepolia endpoint URL

---

## Step 4: Set Up Environment Variables

1. Copy the example env file:
```bash
cp .env.example .env
```

2. Edit `.env` file and add your credentials:

```bash
# Sepolia RPC URL from Alchemy or Infura
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-ALCHEMY-API-KEY

# Your MetaMask wallet's private key
# WARNING: Never share this or commit to git!
PRIVATE_KEY=your-private-key-here

# Optional: Etherscan API key for contract verification
ETHERSCAN_API_KEY=your-etherscan-api-key-here
```

### How to Get Your Private Key from MetaMask:

1. Open MetaMask
2. Click the 3 dots menu
3. Click "Account details"
4. Click "Show private key"
5. Enter your password
6. Copy the private key (64 character hex string)

**IMPORTANT SECURITY NOTES:**
- ✅ This is a test wallet - only use for Sepolia testnet
- ❌ NEVER use your main wallet's private key
- ❌ NEVER commit `.env` file to git (it's already in .gitignore)
- ❌ NEVER share your private key with anyone
- ✅ Create a dedicated test wallet for development

---

## Step 5: Deploy to Sepolia

1. Make sure you have Sepolia ETH in your wallet (from Step 2)

2. Compile contracts:
```bash
npm run compile
```

3. Deploy to Sepolia:
```bash
npm run deploy:sepolia
```

You should see output like:
```
Deploying contracts...
Deploying contracts with account: 0xYourAddress
Account balance: 0.5 ETH

1. Deploying MockToken...
MockToken deployed to: 0xABC123...

2. Deploying StakingContract...
StakingContract deployed to: 0xDEF456...

3. Funding StakingContract with reward tokens...
Transferred 500000.0 tokens to StakingContract

4. Minting test tokens to deployer...
Minted 10000.0 tokens to deployer

=================================
Deployment Summary
=================================
MockToken: 0xABC123...
StakingContract: 0xDEF456...
Network: sepolia
Deployer: 0xYourAddress
=================================

View on Sepolia Etherscan:
https://sepolia.etherscan.io/address/0xABC123...
https://sepolia.etherscan.io/address/0xDEF456...
```

4. **Save these contract addresses!** You'll need them for the frontend.

---

## Step 6: Update Frontend Contract Addresses

1. Open `frontend/lib/contracts.ts`

2. Update the Sepolia contract addresses with your deployed addresses:

```typescript
export const CONTRACTS = {
  // Sepolia testnet addresses (update with YOUR deployed addresses)
  sepolia: {
    mockToken: '0xYourMockTokenAddress' as `0x${string}`,
    stakingContract: '0xYourStakingContractAddress' as `0x${string}`,
  },
  // ...
};
```

---

## Step 7: Get a WalletConnect Project ID (for Frontend)

1. Go to https://cloud.walletconnect.com/
2. Sign up for free account
3. Create new project
4. Copy the Project ID

5. Update `frontend/lib/wagmi.ts`:
```typescript
export const config = getDefaultConfig({
  appName: 'Staking DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Paste your Project ID here
  chains: [sepolia, hardhat],
  ssr: true,
});
```

---

## Step 8: Run the Frontend

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

4. **Connect MetaMask**:
   - Click "Connect Wallet"
   - Select MetaMask
   - Make sure you're on Sepolia network in MetaMask
   - Approve connection

---

## Step 9: Test Your DApp

### A. Mint Test Tokens

1. In the "Mint Test Tokens" section
2. Enter amount (e.g., 1000)
3. Click "Mint Tokens"
4. Approve transaction in MetaMask
5. Wait for confirmation
6. Your balance should update

### B. Approve Tokens for Staking

1. In the "Approve Tokens" section
2. Enter approval amount (e.g., 10000)
3. Click "Approve"
4. Confirm in MetaMask

### C. Stake Tokens

1. In the "Stake Tokens" section
2. Enter stake amount (e.g., 500)
3. Click "Stake"
4. Confirm in MetaMask
5. Watch rewards accumulate in real-time!

### D. Claim Rewards

1. Wait a few seconds for rewards to accumulate
2. Click "Claim Rewards"
3. Confirm in MetaMask

### E. Unstake Tokens

1. Enter amount to unstake
2. Click "Unstake" or "Unstake All"
3. Confirm in MetaMask

---

## Step 10: Verify Contracts on Etherscan (Optional)

Verification makes your contract source code publicly visible and verifiable.

1. Get Etherscan API key:
   - Go to https://etherscan.io/myapikey
   - Sign up and create API key
   - Add to `.env` file

2. Verify MockToken:
```bash
npx hardhat verify --network sepolia <MockToken-Address>
```

3. Verify StakingContract:
```bash
npx hardhat verify --network sepolia <StakingContract-Address> <MockToken-Address> <MockToken-Address>
```

After verification, you can view the contract source code on Sepolia Etherscan!

---

## Troubleshooting

### "Insufficient funds for gas"
- Get more Sepolia ETH from faucets (Step 2)
- Check you're on Sepolia network in MetaMask

### "Invalid API Key"
- Check your `SEPOLIA_RPC_URL` in `.env` is correct
- Make sure you copied the full URL including the API key

### "Private key invalid"
- Export private key from MetaMask again (Step 4)
- Remove any "0x" prefix
- Make sure no extra spaces

### "Cannot connect wallet"
- Make sure MetaMask is installed
- Switch to Sepolia network in MetaMask
- Try refreshing the page

### "Transaction failed"
- Check you have enough Sepolia ETH for gas
- Check contract addresses are correct in `contracts.ts`
- View transaction on Sepolia Etherscan to see error

---

## View Your Transactions

All your transactions are publicly visible on Sepolia Etherscan:

1. Go to https://sepolia.etherscan.io/
2. Search for your wallet address or contract address
3. View all transactions, balances, and contract interactions

---

## Benefits Over Local Hardhat

| Feature | Local Hardhat | Sepolia Testnet |
|---------|---------------|-----------------|
| Deployment persistence | ❌ Resets on restart | ✅ Permanent |
| Blockchain explorer | ❌ Limited | ✅ Full Etherscan |
| Share with others | ❌ Localhost only | ✅ Anyone can test |
| Real wallet | ❌ Test accounts | ✅ MetaMask |
| Gas fees | ❌ Free/instant | ✅ Real (but free test ETH) |
| Network latency | ❌ Instant | ✅ Realistic (~12s blocks) |
| Learning experience | ⚠️ Basic | ✅ Production-like |

---

## Next Steps

1. **Share your DApp**: Deploy frontend to Vercel/Netlify
2. **Add more features**: Implement staking locks, multiple tokens, etc.
3. **Test edge cases**: Try various scenarios with test tokens
4. **Learn more**: Explore Etherscan to understand transactions
5. **Deploy to Mainnet**: When ready, use the same process with real ETH

---

## Important Reminders

- ✅ This is a **testnet** - no real money involved
- ✅ Test ETH is **free** - get more anytime from faucets
- ✅ Contracts are **public** - anyone can interact with them
- ❌ **Never** commit `.env` file to git
- ❌ **Never** use mainnet private keys for testing
- ✅ Create **separate test wallets** for development

---

## Resources

- **Sepolia Faucets**: https://sepoliafaucet.com/
- **Alchemy Dashboard**: https://dashboard.alchemy.com/
- **Sepolia Etherscan**: https://sepolia.etherscan.io/
- **WalletConnect Cloud**: https://cloud.walletconnect.com/
- **MetaMask**: https://metamask.io/
- **Hardhat Docs**: https://hardhat.org/docs

---

Happy testing on Sepolia! 🚀
