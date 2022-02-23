// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Auction.sol";

contract Bank {
    //Mapping of user address to balance
    mapping(address => uint256) public balance;
    address[] public customers;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event Deposit(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 balance,
        uint256 timestamp
    );
    event Withdraw(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 balance,
        uint256 timestamp
    );
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 balance,
        uint256 timestamp
    );

    // get the balance of a user
    function getBalance() public view returns (uint256) {
        return (balance[msg.sender]);
    }

    function deposit() public payable {
        require(msg.value > 0);
        if (balance[msg.sender] > 0) {
            balance[msg.sender] = balance[msg.sender] + msg.value;
        } else {
            balance[msg.sender] = msg.value;
            customers.push(msg.sender);
        }
        emit Deposit(
            msg.sender,
            address(0),
            msg.value,
            balance[msg.sender],
            block.timestamp
        );
    }

    function deleteCustomer(address customer) internal {
        bool isCustomer = false;
        uint256 customerIndex = 0;
        for (uint256 i = 0; i < customers.length; i++) {
            if (customers[i] == customer) {
                customerIndex = i;
                break;
            }
        }
        if (isCustomer) {
            customers[customerIndex] = customers[customers.length - 1];
            customers.pop();
        }
    }

    function withdraw(uint256 amount) public payable {
        address payable client = payable(msg.sender);
        require(balance[msg.sender] >= amount);
        client.transfer(amount);
        balance[msg.sender] = balance[msg.sender] - amount;
        if (balance[msg.sender] == 0) {
            deleteCustomer(msg.sender);
        }
        emit Withdraw(
            msg.sender,
            address(0),
            amount,
            balance[msg.sender],
            block.timestamp
        );
    }

    function transfer(address payable beneficiary, uint256 amount) public {
        require(balance[msg.sender] >= amount);
        balance[msg.sender] = balance[msg.sender] - amount;
        if (balance[beneficiary] > 0) {
            balance[beneficiary] = balance[beneficiary] + amount;
        } else {
            balance[beneficiary] = amount;
        }
        emit Transfer(
            msg.sender,
            beneficiary,
            amount,
            balance[msg.sender],
            block.timestamp
        );
    }

    //--------------------------Loan code Starts Here------------------------------//

    mapping(address => Application) public Loan;

    address auctionContractAddress;
    NFTAuction auctionContract;

    //Loan Application
    struct Application {
        bool exists;
        uint256 amount;
        uint256 repay_amount;
        uint256 inr_amount;
        uint256 due;
        address nftContractAddress;
        uint256 tokenId;
        uint256 emi;
        uint256 balance_amount;
        uint256 endTime;
    }

    event LoanApplied(
        address applicant,
        address nftContractAddress,
        uint256 tokenId,
        uint256 amount,
        uint256 _due,
        uint256 repay_amount,
        uint256 inr_amount,
        uint256 emi
    );
    event LoanRepaid(
        address applicant,
        address nftContractAddress,
        uint256 tokenId,
        uint256 amount,
        uint256 _due,
        uint256 LoanRepaidTimestamp
    );
    event LoanDefaulted(
        address applicant,
        address nftContractAddress,
        uint256 tokenId,
        uint256 amount
    );
    event NFTAuctionedtoMarket(
        address nftContractAddress,
        uint256 tokenId,
        uint256 amounts
    );
    event partialPaymentReturned(
        address applicant,
        uint256 credit,
        uint256 defaultedAmount,
        uint256 timestamp
    );

    event EMIpayed(address applicant, uint256 emi, uint256 LoanRepaidTimestamp);

    modifier isOwner(address nftContractAddress, uint256 tokenId) {
        require(
            IERC721(nftContractAddress).ownerOf(tokenId) == msg.sender,
            "Sender doesn't own NFT!"
        );
        _;
    }

    modifier previousLoanOngoing(address applicant) {
        require(
            Loan[applicant].exists == false,
            "You are not eligible for Loan Application!"
        );
        _;
    }

    modifier bankFunds(uint256 fund) {
        require(
            address(this).balance > 2 * fund,
            "Insufficient Funds in Bank!"
        );
        _;
    }

    modifier loanBalance(uint256 amount) {
        require(
            Loan[msg.sender].balance_amount == amount,
            "Amount not equal to pending loan amount!"
        );
        _;
    }

    modifier emiEqualsAmount(uint256 emi) {
        require(Loan[msg.sender].emi == emi, "EMI not equal to amount!");
        _;
    }

    modifier timeElapsed(uint256 timePassed) {
        require(timePassed > block.timestamp, "Loan ended!");
        _;
    }

    modifier hasFundsInAccount(address applicant, uint256 amount) {
        require(
            balance[applicant] >= amount,
            "Insufficient funds in your Account!"
        );
        _;
    }

    //Functions to Apply Loan
    function ApplyLoan(
        address nftContractAddress,
        uint256 tokenId,
        uint256 amount,
        uint256 _due,
        uint256 repay_amount,
        uint256 inr_amount,
        uint256 emi,
        uint256 endTimestamp
    )
        public
        isOwner(nftContractAddress, tokenId)
        previousLoanOngoing(msg.sender)
        bankFunds(amount)
    {
        Loan[msg.sender].nftContractAddress = nftContractAddress;
        Loan[msg.sender].tokenId = tokenId;
        Loan[msg.sender].amount = amount;
        Loan[msg.sender].repay_amount = repay_amount;
        Loan[msg.sender].inr_amount = inr_amount;
        Loan[msg.sender].due = _due;
        Loan[msg.sender].emi = emi;
        Loan[msg.sender].balance_amount = inr_amount;
        Loan[msg.sender].endTime = endTimestamp;
        IERC721(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );
        //payable(msg.sender).transfer(amount);
        if (balance[msg.sender] > 0) {
            balance[msg.sender] = balance[msg.sender] + amount;
        } else {
            balance[msg.sender] = amount;
            customers.push(msg.sender);
        }
        Loan[msg.sender].exists = true;
        emit LoanApplied(
            msg.sender,
            nftContractAddress,
            tokenId,
            amount,
            _due,
            repay_amount,
            inr_amount,
            emi
        );
    }

    //Functions for Loan is repaid
    function RepayLoan(uint256 amount)
        public
        payable
        timeElapsed(Loan[msg.sender].endTime)
        loanBalance(amount)
    {
        Loan[msg.sender].balance_amount = 0;
        LoanClose(msg.sender);
    }

    function RepayLoanFromAccount(uint256 amount)
        public
        timeElapsed(Loan[msg.sender].endTime)
        hasFundsInAccount(msg.sender, amount)
        loanBalance(amount)
    {
        Loan[msg.sender].balance_amount = 0;
        balance[msg.sender] = balance[msg.sender] - amount;
        LoanClose(msg.sender);
    }

    //Function for loan emi payment
    function LoanEMIPayment(uint256 amount)
        public
        payable
        emiEqualsAmount(amount)
        timeElapsed(Loan[msg.sender].endTime)
    {
        require(Loan[msg.sender].balance_amount > 0, "No Loan to be paid");
        require(
            Loan[msg.sender].balance_amount >= amount,
            "Insufficient Loan Balance"
        );
        Loan[msg.sender].balance_amount =
            Loan[msg.sender].balance_amount -
            amount;

        emit EMIpayed(msg.sender, amount, block.timestamp);

        if (Loan[msg.sender].balance_amount == 0) {
            LoanClose(msg.sender);
        }
    }

    function LoanEMIPaymentFromAccount(uint256 amount)
        public
        emiEqualsAmount(amount)
        timeElapsed(Loan[msg.sender].endTime)
        hasFundsInAccount(msg.sender, amount)
    {
        require(Loan[msg.sender].balance_amount > 0, "No Loan to be paid");
        require(
            Loan[msg.sender].balance_amount >= amount,
            "Insufficient Loan Balance"
        );
        Loan[msg.sender].balance_amount =
            Loan[msg.sender].balance_amount -
            amount;
        balance[msg.sender] = balance[msg.sender] - amount;
        emit EMIpayed(msg.sender, amount, block.timestamp);

        if (Loan[msg.sender].balance_amount == 0) {
            LoanClose(msg.sender);
        }
    }

    //Function to close loan
    function LoanClose(address applicant) internal {
        require(Loan[applicant].exists = true, "No Loan to be closed");
        emit LoanRepaid(
            msg.sender,
            Loan[msg.sender].nftContractAddress,
            Loan[msg.sender].tokenId,
            Loan[msg.sender].amount,
            Loan[msg.sender].due,
            block.timestamp
        );
        Loan[applicant].exists = false;
        IERC721(Loan[applicant].nftContractAddress).transferFrom(
            address(this),
            applicant,
            Loan[applicant].tokenId
        );
        Loan[applicant].nftContractAddress = address(0);
        Loan[applicant].tokenId = uint256(0);
    }

    //Functions interacting with Auction.sol
    function setAuctionContractAddress(address _auctionContractAddress) public {
        auctionContractAddress = _auctionContractAddress;
        auctionContract = NFTAuction(_auctionContractAddress);
    }

    function auctionNFT(
        address applicant,
        uint256 lastBid,
        uint256 balanceAmount
    ) public {
        require(block.timestamp > Loan[applicant].endTime, "Loan is not due");
        IERC721(Loan[applicant].nftContractAddress).approve(
            auctionContractAddress,
            Loan[applicant].tokenId
        );
        auctionContract.createNFTAuction(
            Loan[applicant].nftContractAddress,
            Loan[applicant].tokenId,
            balanceAmount,
            lastBid,
            604800,
            true
        );
        auctionContract.setApplicant(
            applicant,
            Loan[applicant].nftContractAddress,
            Loan[applicant].tokenId
        );
    }

    function interest() public {
        require(owner == msg.sender, "Only owner can call this function");
        for (uint256 i = 0; i < customers.length; i++) {
            if (balance[customers[i]] > 0) {
                balance[customers[i]] =
                    balance[customers[i]] +
                    ((balance[customers[i]] * 5) / 100);
            }
        }
    }

    function returnPartialPayment(
        address applicant,
        uint256 balanceAmount,
        uint256 sellingPrice
    ) public payable {
        uint256 credit = sellingPrice - balanceAmount;
        payable(applicant).transfer(credit);
        emit partialPaymentReturned(
            applicant,
            credit,
            balanceAmount,
            block.timestamp
        );
    }
}
//--------------------------Loan code Ends Here------------------------------//
