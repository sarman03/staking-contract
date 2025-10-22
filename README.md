# Staking Contract DApp with Rewards

A complete decentralized staking application built with Solidity smart contracts and a Next.js frontend. This project allows users to stake tokens and earn rewards over time using **test tokens only** - no real money involved!

## Features

- **Mock ERC20 Token**: Mint free test tokens for staking
- **Staking Contract**: Stake tokens and earn rewards based on time staked
- **Reward System**: 10% APY by default (configurable)
- **Modern Frontend**: Built with Next.js 15, TailwindCSS, and RainbowKit
- **Real-time Updates**: Live reward calculations and balance updates
- **Wallet Integration**: Connect with MetaMask or other Web3 wallets

## Technology Stack

### Smart Contracts
- Solidity ^0.8.20
- Hardhat (development environment)
- OpenZeppelin Contracts (security & standards)

### Frontend
- Next.js 15 (React framework)
- TypeScript
- Wagmi v2 (React Hooks for Ethereum)
- Viem (Ethereum interactions)
- RainbowKit (Wallet connection)
- TailwindCSS (Styling)

## Project Structure

```
staking-contract/
├── contracts/              # Solidity smart contracts
│   ├── MockToken.sol      # ERC20 test token
│   └── StakingContract.sol # Main staking logic
├── scripts/                # Deployment scripts
│   └── deploy.js          # Deploy contracts to network
├── frontend/               # Next.js application
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   └── lib/               # Utilities & configs
├── hardhat.config.js      # Hardhat configuration
└── package.json           # Project dependencies
```

## Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask browser extension (or any Web3 wallet)

## Installation & Setup

### 1. Install Dependencies

Install root dependencies (Hardhat):
```bash
npm install
```

Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

### 2. Get Sepolia Test ETH

You'll need Sepolia ETH to pay for gas fees:

1. Get a wallet address from MetaMask
2. Visit a Sepolia faucet:
   - [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
   - [Chainlink Sepolia Faucet](https://faucets.chain.link/sepolia)
3. Request test ETH (typically 0.5 ETH per request)

### 3. Configure Environment

Create a `.env` file in the root directory:

```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_wallet_private_key
```

**Get Alchemy API Key**:
1. Sign up at [Alchemy](https://www.alchemy.com/)
2. Create a new app for Sepolia testnet
3. Copy the API key

**Get Private Key**:
1. Open MetaMask → Click the three dots → Account Details → Export Private Key
2. ⚠️ **NEVER share this key or use it for real funds!**

### 4. Deploy Smart Contracts to Sepolia

Deploy the contracts:
```bash
npm run deploy:sepolia
```

This will:
- Deploy the MockToken contract to Sepolia
- Deploy the StakingContract to Sepolia
- Fund the staking contract with reward tokens
- Save deployment addresses to `deployment-info.json`

**Copy the deployed contract addresses** from the output.

### 5. Update Frontend Contract Addresses

The deployment script automatically updates the contract addresses, but verify `frontend/lib/contracts.ts`:

```typescript
export const CONTRACTS = {
  mockToken: '0xYOUR_DEPLOYED_TOKEN_ADDRESS',
  stakingContract: '0xYOUR_DEPLOYED_STAKING_ADDRESS',
};
```

### 6. Configure MetaMask for Sepolia

MetaMask usually has Sepolia pre-configured:

1. Open MetaMask
2. Click the network dropdown
3. Enable "Show test networks" in Settings if needed
4. Select "Sepolia test network"

If Sepolia is not available:
1. Click "Add Network" → "Add a network manually"
2. Fill in:
   - **Network Name**: Sepolia
   - **New RPC URL**: `https://sepolia.infura.io/v3/YOUR_INFURA_KEY` or `https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY`
   - **Chain ID**: `11155111`
   - **Currency Symbol**: ETH
   - **Block Explorer**: `https://sepolia.etherscan.io`
3. Click "Save"

### 7. Start the Frontend

```bash
npm run dev:frontend
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### 1. Connect Wallet

Click "Connect Wallet" button and select MetaMask (or your preferred wallet). Make sure you're on the "Sepolia test network".

### 2. Get Test Tokens

1. In the "Get Test Tokens" section, enter an amount (e.g., 1000)
2. Click "Mint Test Tokens"
3. Confirm the transaction in MetaMask
4. You now have MST (Mock Staking Tokens)!

### 3. Stake Tokens

1. Enter the amount you want to stake
2. Click "Approve Tokens" (first time only)
3. Confirm the approval transaction
4. Click "Stake Tokens"
5. Confirm the staking transaction
6. Your tokens are now staked and earning rewards!

### 4. Watch Rewards Accumulate

Rewards are calculated based on:
- **Amount staked**: More tokens = more rewards
- **Time staked**: Longer stake = more rewards
- **APY**: Default 10% annual percentage yield

The pending rewards update automatically and compound over time.

### 5. Claim Rewards

1. Navigate to the "Claim Rewards" section
2. View your pending rewards
3. Click "Claim Rewards"
4. Confirm the transaction
5. Rewards are added to your wallet balance!

### 6. Unstake Tokens

1. Enter the amount to unstake (or click "Max")
2. Click "Unstake Tokens"
3. Confirm the transaction
4. Tokens return to your wallet

## Smart Contract Details

### MockToken

- **Name**: Mock Staking Token
- **Symbol**: MST
- **Decimals**: 18
- **Features**:
  - Anyone can mint tokens (for testing)
  - Standard ERC20 functionality

### StakingContract

- **Reward Rate**: 1000 basis points (10% APY)
- **Reward Calculation**: Proportional to time and amount staked
- **Features**:
  - Stake any amount of tokens
  - Earn rewards continuously
  - Claim rewards at any time
  - Unstake tokens with no lock period (by default)
  - Emergency unstake (forfeit rewards for immediate withdrawal)

**Reward Formula**:
```
rewards = (stakedAmount × rewardRate × timeElapsed) / (365 days × 10000)
```

## Available Scripts

### Root Directory

- `npm run compile` - Compile smart contracts
- `npm run deploy:sepolia` - Deploy contracts to Sepolia testnet
- `npm run verify:sepolia` - Verify contracts on Etherscan

### Frontend Directory

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Testing Scenarios

### Scenario 1: Basic Staking
1. Mint 1000 MST tokens
2. Stake 500 MST
3. Wait a few minutes
4. Check pending rewards (should show small amount)
5. Claim rewards
6. Verify rewards added to balance

### Scenario 2: Multiple Stakes
1. Stake 100 MST
2. Wait a bit
3. Stake another 200 MST
4. Total staked = 300 MST
5. Rewards accumulate on total amount

### Scenario 3: Partial Unstake
1. Stake 1000 MST
2. Wait for rewards to accumulate
3. Unstake 500 MST
4. Remaining 500 MST continues earning
5. Rewards are NOT forfeited

### Scenario 4: Full Cycle
1. Mint → Stake → Wait → Claim → Unstake
2. Verify all balances are correct
3. Pool share percentage updates correctly

## Troubleshooting

### MetaMask Issues

**Problem**: Transactions failing
- **Solution**: Reset MetaMask account (Settings → Advanced → Clear activity tab data)
- **Solution**: Ensure you have enough Sepolia ETH for gas fees

**Problem**: Wrong network
- **Solution**: Ensure "Sepolia test network" is selected in MetaMask

**Problem**: Insufficient funds
- **Solution**: Get more Sepolia ETH from a faucet (see Setup section)

### Contract Issues

**Problem**: Contract addresses not working
- **Solution**: Make sure you updated `frontend/lib/contracts.ts` with deployed addresses
- **Solution**: Verify contracts are deployed on Sepolia (check Etherscan)

**Problem**: Deployment failed
- **Solution**: Check your `.env` file has correct SEPOLIA_RPC_URL and PRIVATE_KEY
- **Solution**: Ensure you have enough Sepolia ETH in your deployer account

### Frontend Issues

**Problem**: Page won't load
- **Solution**: Run `cd frontend && npm install` to ensure dependencies are installed

**Problem**: Wallet won't connect
- **Solution**: Refresh page, ensure MetaMask is unlocked, try a different wallet
- **Solution**: Make sure Sepolia network is added to MetaMask

### Verification Issues

**Problem**: Contract verification failing
- **Solution**: Ensure you have ETHERSCAN_API_KEY in your `.env` file
- **Solution**: Wait a few minutes after deployment before verifying

## Security Notes

⚠️ **This is for testing only!**

- Uses Sepolia testnet with test ETH (no real value)
- MockToken can be minted by anyone (intentional for testing)
- Never use these contracts on mainnet without a professional security audit
- Keep your private keys secure - never share them or commit them to Git
- Test ETH has no real value, but still keep your keys safe as practice

## Advanced Configuration

### Change Reward Rate

In the deployed staking contract, only the owner can change the reward rate:

```solidity
// From deployed contract (as owner)
await stakingContract.setRewardRate(2000); // Change to 20% APY
```

### Set Minimum Staking Period

```solidity
// Require 7 days minimum stake
await stakingContract.setMinStakingPeriod(7 * 24 * 60 * 60);
```

## Future Enhancements

Potential improvements:
- [ ] Staking tiers with different APYs
- [ ] Lock periods with higher rewards
- [ ] Multi-token support
- [ ] Governance features
- [ ] NFT rewards
- [ ] Historical rewards chart
- [ ] Mobile responsive improvements

## License

MIT License - feel free to use for learning and testing!

## Support

If you encounter issues:
1. Verify MetaMask is on Sepolia test network
2. Ensure you have Sepolia ETH for gas fees
3. Confirm contract addresses are updated in frontend
4. Try resetting MetaMask account data
5. Check console for error messages
6. Verify contracts on [Sepolia Etherscan](https://sepolia.etherscan.io)

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)

---

**Built with test tokens - No real money involved! Perfect for learning DeFi development.**
