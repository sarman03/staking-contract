'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { getContracts, MOCK_TOKEN_ABI, STAKING_CONTRACT_ABI } from '../lib/contracts';

export function StakingDashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const CONTRACTS = getContracts(chainId);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [mintAmount, setMintAmount] = useState('1000');

  // Contract read calls
  const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
    address: CONTRACTS.mockToken,
    abi: MOCK_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: stakerInfo, refetch: refetchStakerInfo } = useReadContract({
    address: CONTRACTS.stakingContract,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'getStakerInfo',
    args: address ? [address] : undefined,
  });

  const { data: totalStaked } = useReadContract({
    address: CONTRACTS.stakingContract,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'totalStaked',
  });

  const { data: rewardRate } = useReadContract({
    address: CONTRACTS.stakingContract,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'rewardRate',
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.mockToken,
    abi: MOCK_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.stakingContract] : undefined,
  });

  // Write contract hooks
  const { writeContract: mintTokens, data: mintHash } = useWriteContract();
  const { writeContract: approveTokens, data: approveHash } = useWriteContract();
  const { writeContract: stakeTokens, data: stakeHash } = useWriteContract();
  const { writeContract: unstakeTokens, data: unstakeHash } = useWriteContract();
  const { writeContract: claimRewardsWrite, data: claimHash } = useWriteContract();

  // Wait for transactions
  const { isLoading: isMinting } = useWaitForTransactionReceipt({ hash: mintHash });
  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isStaking } = useWaitForTransactionReceipt({ hash: stakeHash });
  const { isLoading: isUnstaking } = useWaitForTransactionReceipt({ hash: unstakeHash });
  const { isLoading: isClaiming } = useWaitForTransactionReceipt({ hash: claimHash });

  // Refetch data after transactions
  useEffect(() => {
    if (mintHash || stakeHash || unstakeHash || claimHash) {
      const timer = setTimeout(() => {
        refetchTokenBalance();
        refetchStakerInfo();
        refetchAllowance();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mintHash, stakeHash, unstakeHash, claimHash, refetchTokenBalance, refetchStakerInfo, refetchAllowance]);

  // Calculate APY for display
  const apyPercentage = rewardRate ? Number(rewardRate) / 100 : 0;

  // Handle mint test tokens
  const handleMint = () => {
    if (!mintAmount || Number(mintAmount) <= 0) return;
    mintTokens({
      address: CONTRACTS.mockToken,
      abi: MOCK_TOKEN_ABI,
      functionName: 'mint',
      args: [parseEther(mintAmount)],
    });
  };

  // Handle approve
  const handleApprove = () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) return;
    approveTokens({
      address: CONTRACTS.mockToken,
      abi: MOCK_TOKEN_ABI,
      functionName: 'approve',
      args: [CONTRACTS.stakingContract, parseEther(stakeAmount)],
    });
  };

  // Handle stake
  const handleStake = () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) return;
    stakeTokens({
      address: CONTRACTS.stakingContract,
      abi: STAKING_CONTRACT_ABI,
      functionName: 'stake',
      args: [parseEther(stakeAmount)],
    });
  };

  // Handle unstake
  const handleUnstake = () => {
    if (!unstakeAmount || Number(unstakeAmount) <= 0) return;
    unstakeTokens({
      address: CONTRACTS.stakingContract,
      abi: STAKING_CONTRACT_ABI,
      functionName: 'unstake',
      args: [parseEther(unstakeAmount)],
    });
  };

  // Handle claim rewards
  const handleClaimRewards = () => {
    claimRewardsWrite({
      address: CONTRACTS.stakingContract,
      abi: STAKING_CONTRACT_ABI,
      functionName: 'claimRewards',
    });
  };

  if (!isConnected) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-gray-400">
          Please connect your wallet to start staking
        </p>
      </div>
    );
  }

  const stakedAmount = stakerInfo ? stakerInfo[0] : 0n;
  const pendingRewards = stakerInfo ? stakerInfo[1] : 0n;

  const needsApproval = !allowance || allowance < parseEther(stakeAmount || '0');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stats Overview */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Your Balance</p>
          <p className="text-2xl font-bold text-white">
            {tokenBalance ? parseFloat(formatEther(tokenBalance)).toFixed(2) : '0.00'} MST
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Staked Amount</p>
          <p className="text-2xl font-bold text-green-400">
            {stakedAmount ? parseFloat(formatEther(stakedAmount)).toFixed(2) : '0.00'} MST
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Pending Rewards</p>
          <p className="text-2xl font-bold text-yellow-400">
            {pendingRewards ? parseFloat(formatEther(pendingRewards)).toFixed(6) : '0.000000'} MST
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">APY</p>
          <p className="text-2xl font-bold text-blue-400">
            {apyPercentage}%
          </p>
        </div>
      </div>

      {/* Get Test Tokens */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Get Test Tokens</h3>
        <p className="text-gray-400 text-sm mb-4">
          Mint free test tokens to try out staking
        </p>
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Amount to Mint</label>
            <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1000"
            />
          </div>
          <button
            onClick={handleMint}
            disabled={isMinting || !mintAmount || Number(mintAmount) <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            {isMinting ? 'Minting...' : 'Mint Test Tokens'}
          </button>
        </div>
      </div>

      {/* Stake Tokens */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Stake Tokens</h3>
        <p className="text-gray-400 text-sm mb-4">
          Stake your tokens to start earning rewards
        </p>
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Amount to Stake</label>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0.0"
            />
            <button
              onClick={() => setStakeAmount(tokenBalance ? formatEther(tokenBalance) : '0')}
              className="text-blue-400 text-sm mt-2 hover:text-blue-300"
            >
              Max
            </button>
          </div>
          {needsApproval ? (
            <button
              onClick={handleApprove}
              disabled={isApproving || !stakeAmount || Number(stakeAmount) <= 0}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {isApproving ? 'Approving...' : 'Approve Tokens'}
            </button>
          ) : (
            <button
              onClick={handleStake}
              disabled={isStaking || !stakeAmount || Number(stakeAmount) <= 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {isStaking ? 'Staking...' : 'Stake Tokens'}
            </button>
          )}
        </div>
      </div>

      {/* Claim Rewards */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Claim Rewards</h3>
        <p className="text-gray-400 text-sm mb-4">
          Claim your accumulated staking rewards
        </p>
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-gray-400 text-sm">Available to Claim</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {pendingRewards ? parseFloat(formatEther(pendingRewards)).toFixed(6) : '0.000000'} MST
          </p>
        </div>
        <button
          onClick={handleClaimRewards}
          disabled={isClaiming || !pendingRewards || pendingRewards === 0n}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {isClaiming ? 'Claiming...' : 'Claim Rewards'}
        </button>
      </div>

      {/* Unstake Tokens */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Unstake Tokens</h3>
        <p className="text-gray-400 text-sm mb-4">
          Withdraw your staked tokens
        </p>
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Amount to Unstake</label>
            <input
              type="number"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="0.0"
            />
            <button
              onClick={() => setUnstakeAmount(stakedAmount ? formatEther(stakedAmount) : '0')}
              className="text-blue-400 text-sm mt-2 hover:text-blue-300"
            >
              Max
            </button>
          </div>
          <button
            onClick={handleUnstake}
            disabled={isUnstaking || !unstakeAmount || Number(unstakeAmount) <= 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            {isUnstaking ? 'Unstaking...' : 'Unstake Tokens'}
          </button>
        </div>
      </div>

      {/* Total Pool Stats */}
      <div className="lg:col-span-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Pool Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Total Value Locked (TVL)</p>
            <p className="text-2xl font-bold text-white mt-1">
              {totalStaked ? parseFloat(formatEther(totalStaked)).toFixed(2) : '0.00'} MST
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Your Pool Share</p>
            <p className="text-2xl font-bold text-white mt-1">
              {totalStaked && stakedAmount && totalStaked > 0n
                ? ((Number(stakedAmount) / Number(totalStaked)) * 100).toFixed(2)
                : '0.00'}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
