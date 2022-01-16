// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    //Mapping of user address to balance
    mapping(address => uint256) public balance;
    
    // get the balance of a user
    function getBalance() public view returns(uint256){
        return (balance[msg.sender]);
    }

    function deposit() public payable {
        require(msg.value > 0);
        
        if (balance[msg.sender] > 0) {
            balance[msg.sender] = balance[msg.sender] + msg.value;
        }else{
            balance[msg.sender] = msg.value;
        }
    }
    
    function withdraw(uint256 amount) public payable {
        address payable client = payable(msg.sender);
        require(balance[msg.sender] >= amount);
        client.transfer(amount);
        balance[msg.sender] = balance[msg.sender] - amount;
    }

    function transfer(address payable beneficiary, uint256 amount) public {
        require(balance[msg.sender] >= amount);
        balance[msg.sender] = balance[msg.sender] - amount;
        if (balance[beneficiary] > 0){
            balance[beneficiary] = balance[beneficiary] + amount;
        }else{
            balance[beneficiary] = amount;
        }
    }
}