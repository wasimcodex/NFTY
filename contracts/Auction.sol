//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Bank.sol";

contract NFTAuction {

    address bankContractAddress;
    Bank bankContract;

    mapping(address => mapping(uint256 => Auction)) public nftContractAuctions;

    struct Auction{
        uint256 minPrice;
        uint256 buyNowPrice;
        address seller;
        mapping(address => uint256) bids;
        address[] bidders;
        uint256 auctionEndTimestamp;
        address highestBidder;
        uint256 highestBid;
        address bankApplicant;
        bool isBank;
    }

    event AuctionCreated(address auctionContract, uint256 auctionId, uint256 minPrice, uint256 buyNowPrice, uint256 auctionEndTimestamp);
    event AuctionEnded(address auctionContract, uint256 auctionId, address highestBidder, uint256 highestBid);
    event AuctionCancelled(address auctionContract, uint256 auctionId);
    event AuctionBid(address auctionContract, uint256 auctionId, address bidder, uint256 bid);
    event AuctionUnsuccessful(address auctionContract, uint256 auctionId);
    event BidWithdrawn(address auctionContract, uint256 auctionId, address bidder, uint256 bid);

    modifier isOwner(address nftContractAddress, uint256 tokenId){
        require(IERC721(nftContractAddress).ownerOf(tokenId) == msg.sender, "Sender doesn't own NFT");
        _;
    }

    function createNFTAuction(address nftContractAddress, uint256 tokenId, uint256 _minPrice, uint256 _buyNowPrice, uint256 _auctionEndTimestamp, bool isBank)
    isOwner(nftContractAddress, tokenId)
    public
    {
        nftContractAuctions[nftContractAddress][tokenId].minPrice = _minPrice;
        nftContractAuctions[nftContractAddress][tokenId].seller = msg.sender;
        nftContractAuctions[nftContractAddress][tokenId].buyNowPrice = _buyNowPrice;
        nftContractAuctions[nftContractAddress][tokenId].auctionEndTimestamp = block.timestamp + _auctionEndTimestamp;
        nftContractAuctions[nftContractAddress][tokenId].isBank = isBank;
        emit AuctionCreated(nftContractAddress, tokenId, _minPrice, _buyNowPrice, _auctionEndTimestamp);
    }

    function bid(address nftContractAddress, uint256 tokenId) public payable{
        require(msg.value >= nftContractAuctions[nftContractAddress][tokenId].minPrice, "Bid amount is too low");
        require(block.timestamp < nftContractAuctions[nftContractAddress][tokenId].auctionEndTimestamp, "Auction has ended");
        require(nftContractAuctions[nftContractAddress][tokenId].seller != msg.sender, "Seller can't bid on his own auction");
        nftContractAuctions[nftContractAddress][tokenId].bids[msg.sender] = msg.value;
        nftContractAuctions[nftContractAddress][tokenId].bidders.push(msg.sender);
        emit AuctionBid(nftContractAddress, tokenId, msg.sender, msg.value);
        if(msg.value > nftContractAuctions[nftContractAddress][tokenId].highestBid){
            nftContractAuctions[nftContractAddress][tokenId].highestBid = msg.value;
            nftContractAuctions[nftContractAddress][tokenId].highestBidder = msg.sender;
        }
        if(nftContractAuctions[nftContractAddress][tokenId].buyNowPrice > 0 && msg.value >= nftContractAuctions[nftContractAddress][tokenId].buyNowPrice){
            endAuction(nftContractAddress, tokenId);
        }
    }

    function withdrawBid(address nftContractAddress, uint256 tokenId) public {
        require(nftContractAuctions[nftContractAddress][tokenId].bids[msg.sender] > 0, "No bids made yet");
        payable(msg.sender).transfer(nftContractAuctions[nftContractAddress][tokenId].bids[msg.sender]);
        emit BidWithdrawn(nftContractAddress, tokenId, msg.sender, nftContractAuctions[nftContractAddress][tokenId].bids[msg.sender]);
        nftContractAuctions[nftContractAddress][tokenId].bids[msg.sender] = 0;
        if (nftContractAuctions[nftContractAddress][tokenId].highestBidder == msg.sender){
            updateHighestBid(nftContractAddress, tokenId);
        }
    }

    function updateHighestBid(address nftContractAddress, uint256 tokenId) internal {
        uint256 n = nftContractAuctions[nftContractAddress][tokenId].bidders.length;
        for (uint256 i = 0; i < n; i++){
            address bidderAddress = nftContractAuctions[nftContractAddress][tokenId].bidders[i];
            if (nftContractAuctions[nftContractAddress][tokenId].bids[bidderAddress] > nftContractAuctions[nftContractAddress][tokenId].highestBid){
                nftContractAuctions[nftContractAddress][tokenId].highestBid = nftContractAuctions[nftContractAddress][tokenId].bids[bidderAddress];
                nftContractAuctions[nftContractAddress][tokenId].highestBidder = bidderAddress;
            }
        }
    }


//Functions for Bank
function setBankContractAddress(address _bankContractAddress) public {
        bankContractAddress = _bankContractAddress;
        bankContract = Bank(_bankContractAddress);
    }

function setApplicant(address applicant, address nftContractAddress, uint256 tokenId) public{
    nftContractAuctions[nftContractAddress][tokenId].bankApplicant = applicant;
}

//Bank functions end

    function endAuction(address nftContractAddress, uint256 tokenId) internal {
        if(nftContractAuctions[nftContractAddress][tokenId].highestBidder != address(0)){
            if(nftContractAuctions[nftContractAddress][tokenId].isBank == false){
             payable(nftContractAuctions[nftContractAddress][tokenId].seller).transfer(nftContractAuctions[nftContractAddress][tokenId].highestBid);    
            }
            IERC721(nftContractAddress).transferFrom(
                nftContractAuctions[nftContractAddress][tokenId].seller,
                nftContractAuctions[nftContractAddress][tokenId].highestBidder,
                tokenId
            );
            if(nftContractAuctions[nftContractAddress][tokenId].isBank == true){
                bankContract.returnPartialPayment{value: nftContractAuctions[nftContractAddress][tokenId].highestBid}(nftContractAuctions[nftContractAddress][tokenId].bankApplicant, nftContractAuctions[nftContractAddress][tokenId].minPrice, nftContractAuctions[nftContractAddress][tokenId].highestBid);
            }
            address buyer = nftContractAuctions[nftContractAddress][tokenId].highestBidder;
            nftContractAuctions[nftContractAddress][tokenId].bids[buyer] = 0;
            payOutRest(nftContractAddress, tokenId);
            resetAuction(nftContractAddress, tokenId);
            emit AuctionEnded(nftContractAddress, tokenId, buyer, nftContractAuctions[nftContractAddress][tokenId].highestBid);
        }else{
            emit AuctionUnsuccessful(nftContractAddress, tokenId);
        }
    }

    function cancelAuction(address nftContractAddress, uint256 tokenId) public {
        require(nftContractAuctions[nftContractAddress][tokenId].seller == msg.sender, "Only seller can cancel auction");
        payOutRest(nftContractAddress, tokenId);
        resetAuction(nftContractAddress, tokenId);
        emit AuctionCancelled(nftContractAddress, tokenId);
    }

    function payOutRest(address nftContractAddress, uint256 tokenId) internal {
        uint256 n = nftContractAuctions[nftContractAddress][tokenId].bidders.length;
        for (uint256 i = 0; i < n; i++){
            address bidderAddress = nftContractAuctions[nftContractAddress][tokenId].bidders[i];
            if (nftContractAuctions[nftContractAddress][tokenId].bids[bidderAddress] > 0){
                payable(bidderAddress).transfer(nftContractAuctions[nftContractAddress][tokenId].bids[bidderAddress]);
            }
            nftContractAuctions[nftContractAddress][tokenId].bids[bidderAddress] = 0;
        }
    }

    function takeHighestBid(address nftContractAddress, uint tokenId)
     isOwner(nftContractAddress, tokenId)
     public {
        require(nftContractAuctions[nftContractAddress][tokenId].highestBid > 0, "No bids yet");
        endAuction(nftContractAddress, tokenId);
    }

    function resetAuction(address nftContractAddress, uint tokenId) internal {
        nftContractAuctions[nftContractAddress][tokenId].minPrice = 0;
        nftContractAuctions[nftContractAddress][tokenId].buyNowPrice = 0;
        nftContractAuctions[nftContractAddress][tokenId].seller = address(0);
        delete nftContractAuctions[nftContractAddress][tokenId].bidders;
        nftContractAuctions[nftContractAddress][tokenId].highestBidder = address(0);
        nftContractAuctions[nftContractAddress][tokenId].highestBid = 0;
        nftContractAuctions[nftContractAddress][tokenId].auctionEndTimestamp = 0;
    }

    function timestamp() view public returns (uint256){
        return block.timestamp;
    }
}