// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */

contract Coin {
    bytes32 public id;
    uint public rarity;
    constructor(bytes32 _id, uint _rarity) {
        id = _id;
        rarity = _rarity;
    }
}

contract NotCoin {
    bytes32 public notId;
    uint public notRarity;
    constructor(bytes32 _id, uint _rarity) {
    notId = _id;
    notRarity = _rarity;
    }
}

interface ICoinCollector {
    function isCollected(address coin) external returns (bool);
    function collectCoin(address coin) external;
}

contract CoinCollector is ICoinCollector{
    
    mapping(address => bool) public collectedCoin;
    event ErrorNotHandled(bytes reason);
    
     function isCollected(address coin) override external view returns (bool){
         
         return collectedCoin[coin];

     }
     
     function collectCoin(address coin) override external{
         Coin c = Coin(coin);
         try c.id(){
            collectedCoin[coin] = true;
         }
         catch(bytes memory reason){
            emit ErrorNotHandled(reason);
         }

     }
    
}


