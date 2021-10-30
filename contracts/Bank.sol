// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint256) public balance;
    uint256 cashPool;
    
    function deposit() public payable {
        require(msg.value > 0);
        
        if (balance[msg.sender] > 0) {
            balance[msg.sender] = balance[msg.sender] + msg.value;
        }else{
            balance[msg.sender] = msg.value;
        }
    }
    
    function withdraw(uint256 amount, address payable client) public payable {
        require(balance[msg.sender] >= amount);
        client.transfer(amount);
        balance[msg.sender] = balance[msg.sender] - amount;
    }
    
    function getCashPool() public view returns(uint256){
        return address(this).balance;
    }
}