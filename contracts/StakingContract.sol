// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StakingContract
 * @dev A staking contract where users can stake tokens and earn rewards over time
 * Rewards are calculated based on the time staked and a fixed reward rate (APY)
 */
contract StakingContract is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // The token being staked
    IERC20 public stakingToken;

    // The token used for rewards (can be same as staking token)
    IERC20 public rewardToken;

    // Annual Percentage Yield (APY) in basis points (100 = 1%, 1000 = 10%)
    uint256 public rewardRate = 1000; // 10% APY by default

    // Total amount staked in the contract
    uint256 public totalStaked;

    // Minimum staking period in seconds (optional, set to 0 for no minimum)
    uint256 public minStakingPeriod = 0;

    // Struct to hold staker information
    struct Staker {
        uint256 stakedAmount;      // Amount of tokens staked
        uint256 lastUpdateTime;    // Last time rewards were calculated
        uint256 accumulatedRewards; // Rewards accumulated but not claimed
        uint256 stakeTimestamp;    // When the user first staked
    }

    // Mapping from user address to their staking info
    mapping(address => Staker) public stakers;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);

    /**
     * @dev Constructor
     * @param _stakingToken Address of the token to be staked
     * @param _rewardToken Address of the token used for rewards
     */
    constructor(address _stakingToken, address _rewardToken) Ownable(msg.sender) {
        require(_stakingToken != address(0), "Invalid staking token");
        require(_rewardToken != address(0), "Invalid reward token");

        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    /**
     * @dev Calculate pending rewards for a user
     * @param user Address of the user
     * @return Pending rewards amount
     */
    function calculatePendingRewards(address user) public view returns (uint256) {
        Staker memory staker = stakers[user];

        if (staker.stakedAmount == 0) {
            return staker.accumulatedRewards;
        }

        // Calculate time elapsed since last update
        uint256 timeElapsed = block.timestamp - staker.lastUpdateTime;

        // Calculate rewards: (stakedAmount * rewardRate * timeElapsed) / (365 days * 10000)
        // rewardRate is in basis points (10000 = 100%)
        // This gives us the proportional reward for the time elapsed
        uint256 newRewards = (staker.stakedAmount * rewardRate * timeElapsed) / (365 days * 10000);

        return staker.accumulatedRewards + newRewards;
    }

    /**
     * @dev Update rewards for a user (internal function)
     * @param user Address of the user
     */
    function _updateRewards(address user) internal {
        Staker storage staker = stakers[user];

        if (staker.stakedAmount > 0) {
            staker.accumulatedRewards = calculatePendingRewards(user);
        }

        staker.lastUpdateTime = block.timestamp;
    }

    /**
     * @dev Stake tokens
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0 tokens");

        _updateRewards(msg.sender);

        Staker storage staker = stakers[msg.sender];

        // If first time staking, set the stake timestamp
        if (staker.stakedAmount == 0) {
            staker.stakeTimestamp = block.timestamp;
        }

        staker.stakedAmount += amount;
        totalStaked += amount;

        stakingToken.safeTransferFrom(msg.sender, address(this), amount);

        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Unstake tokens
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        Staker storage staker = stakers[msg.sender];
        require(staker.stakedAmount >= amount, "Insufficient staked amount");
        require(amount > 0, "Cannot unstake 0 tokens");

        // Check minimum staking period if set
        if (minStakingPeriod > 0) {
            require(
                block.timestamp >= staker.stakeTimestamp + minStakingPeriod,
                "Minimum staking period not met"
            );
        }

        _updateRewards(msg.sender);

        staker.stakedAmount -= amount;
        totalStaked -= amount;

        stakingToken.safeTransfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Claim accumulated rewards
     */
    function claimRewards() external nonReentrant {
        _updateRewards(msg.sender);

        Staker storage staker = stakers[msg.sender];
        uint256 rewards = staker.accumulatedRewards;

        require(rewards > 0, "No rewards to claim");

        staker.accumulatedRewards = 0;

        rewardToken.safeTransfer(msg.sender, rewards);

        emit RewardClaimed(msg.sender, rewards);
    }

    /**
     * @dev Emergency unstake - unstake all tokens and forfeit rewards
     * Useful if user needs to exit quickly
     */
    function emergencyUnstake() external nonReentrant {
        Staker storage staker = stakers[msg.sender];
        uint256 amount = staker.stakedAmount;

        require(amount > 0, "No tokens staked");

        staker.stakedAmount = 0;
        staker.accumulatedRewards = 0;
        totalStaked -= amount;

        stakingToken.safeTransfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Get staker information
     * @param user Address of the user
     * @return stakedAmount Amount staked
     * @return pendingRewards Pending rewards
     * @return stakeTime Time when user first staked
     */
    function getStakerInfo(address user)
        external
        view
        returns (
            uint256 stakedAmount,
            uint256 pendingRewards,
            uint256 stakeTime
        )
    {
        Staker memory staker = stakers[user];
        return (
            staker.stakedAmount,
            calculatePendingRewards(user),
            staker.stakeTimestamp
        );
    }

    // Owner functions

    /**
     * @dev Update reward rate (only owner)
     * @param newRate New reward rate in basis points
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 50000, "Rate too high"); // Max 500% APY
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }

    /**
     * @dev Set minimum staking period (only owner)
     * @param period Minimum period in seconds
     */
    function setMinStakingPeriod(uint256 period) external onlyOwner {
        minStakingPeriod = period;
    }

    /**
     * @dev Deposit reward tokens into the contract (only owner)
     * @param amount Amount of reward tokens to deposit
     */
    function depositRewardTokens(uint256 amount) external onlyOwner {
        rewardToken.safeTransferFrom(msg.sender, address(this), amount);
    }

    /**
     * @dev Get contract reward token balance
     * @return Available reward tokens in contract
     */
    function getRewardBalance() external view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }
}
