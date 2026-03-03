// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AurexiaCoin is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 Billion

    constructor() ERC20("Aurexia Coin", "AXC") Ownable(msg.sender) {
        _mint(msg.sender, MAX_SUPPLY);
    }

    // Proof of Consciousness Reward Hook
    function rewardExplorer(address explorer, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply reached");
        _mint(explorer, amount);
    }
}
