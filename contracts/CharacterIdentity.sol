// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CharacterIdentity is ERC721Enumerable, Ownable {
    using Strings for uint256;

    enum OriginClass { VoidWalker, StarForger, NebulaSage, QuantumBlade }

    struct Attributes {
        uint8 power;
        uint8 agility;
        uint8 intelligence;
        uint8 resilience;
        uint8 quantum;
        OriginClass origin;
        uint256 level;
    }

    mapping(uint256 => Attributes) public characterStats;
    uint256 private _nextTokenId;

    constructor() ERC721("Aurexia Identity", "AXID") Ownable(msg.sender) {}

    [span_4](start_span)// Mint a new character with specialized attributes based on class[span_4](end_span)
    function mintCharacter(OriginClass _origin) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        [span_5](start_span)// Standard starting attributes based on Aurexia lore[span_5](end_span)
        if (_origin == OriginClass.VoidWalker) {
            characterStats[tokenId] = Attributes(60, 92, 76, 40, 88, _origin, 1);
        } else if (_origin == OriginClass.StarForger) {
            characterStats[tokenId] = Attributes(50, 45, 95, 80, 70, _origin, 1);
        } else if (_origin == OriginClass.NebulaSage) {
            characterStats[tokenId] = Attributes(40, 60, 98, 50, 95, _origin, 1);
        } else { // Quantum Blade
            characterStats[tokenId] = Attributes(95, 85, 40, 75, 60, _origin, 1);
        }

        return tokenId;
    }

    function getAttributes(uint256 tokenId) public view returns (Attributes memory) {
        require(_exists(tokenId), "Character does not exist");
        return characterStats[tokenId];
    }
}
