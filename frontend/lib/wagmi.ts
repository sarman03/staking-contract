import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Staking DApp',
  projectId: '0694edd22cc0245f8a8f2b53271ab49d', // Get from WalletConnect Cloud (https://cloud.walletconnect.com/)
  chains: [sepolia, hardhat], // Sepolia first for default, hardhat for local testing
  ssr: true, // For Next.js
});
