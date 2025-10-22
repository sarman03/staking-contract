import { ConnectButton } from '@rainbow-me/rainbowkit';
import { StakingDashboard } from '../components/StakingDashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Staking DApp
            </h1>
            <p className="text-gray-400">
              Stake your tokens and earn rewards
            </p>
          </div>
          <ConnectButton />
        </header>

        <main>
          <StakingDashboard />
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with Next.js, Wagmi & RainbowKit</p>
          <p className="mt-2">Connected to Sepolia testnet</p>
        </footer>
      </div>
    </div>
  );
}
