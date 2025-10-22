# Quick Start Guide - Staking DApp

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- MetaMask browser extension

## Steps

### 1. Install Dependencies (2 min)
```bash
# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 2. Start Local Blockchain (30 sec)
```bash
# Terminal 1 - Keep this running!
npm run node
```

**IMPORTANT**: Copy one of the private keys shown in the output. You'll need it for MetaMask.

### 3. Deploy Contracts (1 min)
```bash
# Terminal 2
npm run deploy
```

**Copy the two contract addresses** from the output:
- MockToken address
- StakingContract address

### 4. Update Frontend Config (30 sec)

Edit `frontend/lib/contracts.ts` and replace these addresses:
```typescript
export const CONTRACTS = {
  mockToken: '0xPASTE_YOUR_MOCKTOKEN_ADDRESS',
  stakingContract: '0xPASTE_YOUR_STAKINGCONTRACT_ADDRESS',
};
```

### 5. Configure MetaMask (1 min)

Add Network:
- Network Name: `Hardhat Local`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency: `ETH`

Import Account:
- Use the private key you copied from step 2

### 6. Start Frontend (30 sec)
```bash
# Terminal 3 (or use Terminal 2)
npm run dev:frontend
```

Visit: http://localhost:3000

### 7. Test It Out!

1. **Connect Wallet** (click button, select MetaMask)
2. **Mint Tokens** → Enter 1000 → Click "Mint Test Tokens"
3. **Stake** → Enter 100 → Click "Approve" → Click "Stake"
4. **Wait** → Watch rewards accumulate
5. **Claim** → Click "Claim Rewards"
6. **Unstake** → Enter amount → Click "Unstake"

## Common Commands

```bash
# Restart everything
npm run node           # Terminal 1
npm run deploy         # Terminal 2 (after node starts)
npm run dev:frontend   # Terminal 3

# Recompile contracts
npm run compile

# Check if contracts compiled
ls artifacts/contracts
```

## Troubleshooting

**Transactions failing?**
→ MetaMask: Settings → Advanced → Clear activity tab data

**Wrong network?**
→ Switch to "Hardhat Local" in MetaMask

**Contract not found?**
→ Did you update the addresses in `frontend/lib/contracts.ts`?

**Need more test ETH?**
→ Import another account from the Hardhat node output

## That's It!

You now have a fully functional staking DApp running locally with test tokens. No real money required!

Read README.md for detailed documentation.
