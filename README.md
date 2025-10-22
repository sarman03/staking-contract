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

### 2. Start Local Blockchain

Open a terminal and run:
```bash
npm run node
```

This starts a Hardhat local blockchain at `http://127.0.0.1:8545`. Keep this terminal running.

**Important**: You'll see 20 test accounts with private keys. Copy one of these private keys to import into MetaMask.

### 3. Deploy Smart Contracts

Open a new terminal and run:
```bash
npm run deploy
```

This will:
- Deploy the MockToken contract
- Deploy the StakingContract
- Fund the staking contract with reward tokens
- Save deployment addresses to `deployment-info.json`

**Copy the deployed contract addresses** from the output. You'll need to update them in the frontend.

### 4. Update Frontend Contract Addresses

After deployment, open `frontend/lib/contracts.ts` and update the contract addresses:

```typescript
export const CONTRACTS = {
  mockToken: '0xYOUR_MOCK_TOKEN_ADDRESS',
  stakingContract: '0xYOUR_STAKING_CONTRACT_ADDRESS',
};
```

Replace with the addresses shown in the deployment output.

### 5. Configure MetaMask

#### Add Hardhat Local Network

1. Open MetaMask
2. Click the network dropdown → "Add Network" → "Add a network manually"
3. Fill in:
   - **Network Name**: Hardhat Local
   - **New RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: ETH
4. Click "Save"

#### Import Test Account

1. Copy a private key from the Hardhat node terminal output
2. In MetaMask: Click account icon → "Import Account"
3. Paste the private key
4. You now have test ETH to pay for gas!

### 6. Start the Frontend

```bash
npm run dev:frontend
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### 1. Connect Wallet

Click "Connect Wallet" button and select MetaMask (or your preferred wallet). Make sure you're on the "Hardhat Local" network.

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
- `npm run node` - Start local Hardhat blockchain
- `npm run deploy` - Deploy contracts to local network

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

**Problem**: Wrong network
- **Solution**: Ensure "Hardhat Local" network is selected

**Problem**: Insufficient funds
- **Solution**: Make sure you imported an account from the Hardhat node output

### Contract Issues

**Problem**: Contract addresses not working
- **Solution**: Make sure you updated `frontend/lib/contracts.ts` with deployed addresses

**Problem**: Deployment failed
- **Solution**: Ensure Hardhat node is running first (`npm run node`)

### Frontend Issues

**Problem**: Page won't load
- **Solution**: Run `cd frontend && npm install` to ensure dependencies are installed

**Problem**: Wallet won't connect
- **Solution**: Refresh page, ensure MetaMask is unlocked, try a different wallet

## Security Notes

⚠️ **This is for testing only!**

- Uses local Hardhat network with test ETH
- MockToken can be minted by anyone (intentional for testing)
- Never use these contracts on mainnet without security audit
- Private keys from Hardhat are public - never send real funds to these addresses

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
1. Check all terminals are running (Hardhat node, frontend)
2. Verify MetaMask is on correct network
3. Ensure contract addresses are updated in frontend
4. Try resetting MetaMask account data
5. Check console for error messages

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)

---

**Built with test tokens - No real money involved! Perfect for learning DeFi development.**
