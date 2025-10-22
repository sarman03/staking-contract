import hre from "hardhat";
import fs from "fs";

const { ethers } = hre;

async function main() {
  console.log("Deploying contracts...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy MockToken
  console.log("\n1. Deploying MockToken...");
  const MockToken = await ethers.getContractFactory("MockToken");
  const mockToken = await MockToken.deploy();
  await mockToken.waitForDeployment();
  const mockTokenAddress = await mockToken.getAddress();
  console.log("MockToken deployed to:", mockTokenAddress);

  // Deploy StakingContract (using same token for staking and rewards)
  console.log("\n2. Deploying StakingContract...");
  const StakingContract = await ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.deploy(
    mockTokenAddress,
    mockTokenAddress
  );
  await stakingContract.waitForDeployment();
  const stakingContractAddress = await stakingContract.getAddress();
  console.log("StakingContract deployed to:", stakingContractAddress);

  // Fund the staking contract with reward tokens
  console.log("\n3. Funding StakingContract with reward tokens...");
  const rewardAmount = ethers.parseEther("500000"); // 500,000 tokens for rewards
  await mockToken.transfer(stakingContractAddress, rewardAmount);
  console.log("Transferred", ethers.formatEther(rewardAmount), "tokens to StakingContract");

  // Mint some tokens to deployer for testing
  console.log("\n4. Minting test tokens to deployer...");
  const mintAmount = ethers.parseEther("10000");
  await mockToken.mint(mintAmount);
  console.log("Minted", ethers.formatEther(mintAmount), "tokens to deployer");

  // Display contract information
  console.log("\n=================================");
  console.log("Deployment Summary");
  console.log("=================================");
  console.log("MockToken:", mockTokenAddress);
  console.log("StakingContract:", stakingContractAddress);
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer.address);
  console.log("=================================");

  // Save deployment addresses to a file
  const deploymentInfo = {
    network: hre.network.name,
    mockToken: mockTokenAddress,
    stakingContract: stakingContractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    "./deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\nDeployment info saved to deployment-info.json");

  // Also save to frontend directory for easy access
  const frontendDir = "./frontend/src";
  if (fs.existsSync(frontendDir)) {
    fs.writeFileSync(
      `${frontendDir}/contracts.json`,
      JSON.stringify(deploymentInfo, null, 2)
    );
    console.log("Deployment info also saved to frontend/src/contracts.json");
  }

  // Show verification commands for testnet deployments
  if (hre.network.name === "sepolia") {
    console.log("\n=================================");
    console.log("Verify contracts on Etherscan:");
    console.log("=================================");
    console.log(`npx hardhat verify --network sepolia ${mockTokenAddress}`);
    console.log(`npx hardhat verify --network sepolia ${stakingContractAddress} ${mockTokenAddress} ${mockTokenAddress}`);
    console.log("\nView on Sepolia Etherscan:");
    console.log(`https://sepolia.etherscan.io/address/${mockTokenAddress}`);
    console.log(`https://sepolia.etherscan.io/address/${stakingContractAddress}`);
  }

  return {
    mockToken: mockTokenAddress,
    stakingContract: stakingContractAddress,
  };
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
