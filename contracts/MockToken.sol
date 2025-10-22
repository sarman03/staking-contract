// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockToken
 * @dev A simple ERC20 token for testing purposes
 * Users can mint tokens freely for testing the staking contract
 */
contract MockToken is ERC20 {
    constructor() ERC20("Mock Staking Token", "MST") {
        // Mint initial supply to deployer
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    /**
     * @dev Allow anyone to mint tokens for testing
     * @param amount Amount of tokens to mint (in wei units)
     */
    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    /**
     * @dev Mint tokens to a specific address (useful for testing)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mintTo(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
