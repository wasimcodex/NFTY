const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const { abi, address } = require('../artifacts/auction.json')

export const createAuction = async (
  nftAddress,
  id,
  minPrice,
  buyNowPrice,
  date,
) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const duration = new Date(date).valueOf() - Date.now()
  const WeiMinPrice = web3.utils.toWei(minPrice, 'ether')
  const WeiBuyNow = web3.utils.toWei(buyNowPrice, 'ether')
  console.log(duration, WeiMinPrice, WeiBuyNow)
  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods
      .createNFTAuction(nftAddress, id, WeiMinPrice, WeiBuyNow, duration, false)
      .encodeABI(),
  }

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams, 'latest'],
    })
    return {
      status: 'Transaction Successful. Refresh in a moment',
    }
  } catch (error) {
    return {
      status: 'Transaction Failed' + error.message,
    }
  }
}

export const getAuction = async (contractAddress, id) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const auction = await window.contract.methods
    .nftContractAuctions(contractAddress, id)
    .call()

  return auction
}

export const bidAuction = async (nftAddress, id, amount) => {
  if (parseFloat(amount) <= 0) {
    return {
      status: 'Please enter a valid amount',
    }
  }
  const WeiAmount = web3.utils.toHex(web3.utils.toWei(amount, 'ether'))
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    value: WeiAmount,
    data: window.contract.methods.bid(nftAddress, id).encodeABI(),
  }

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams, 'latest'],
    })
    return {
      status: 'Transaction Successful. Refresh in a moment',
    }
  } catch (error) {
    return {
      status: 'Transaction Failed' + error.message,
    }
  }
}

export const withdrawAuctionBid = async (nftAddress, id) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.withdrawBid(nftAddress, id).encodeABI(),
  }
  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams, 'latest'],
    })
    return {
      status: 'Transaction Successful. Refresh in a moment',
    }
  } catch (error) {
    return {
      status: 'Transaction Failed' + error.message,
    }
  }
}

export const setBankContract = async (bankAddress) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods
      .setBankContractAddress(bankAddress)
      .encodeABI(),
  }

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams, 'latest'],
    })
    return {
      status: 'Transaction Successful. Refresh in a moment',
    }
  } catch (error) {
    return {
      status: 'Transaction Failed' + error.message,
    }
  }
}

export const auctionCancel = async (nftAddress, id) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.cancelAuction(nftAddress, id).encodeABI(),
  }

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams, 'latest'],
    })
    return {
      status: 'Transaction Successful. Refresh in a moment',
    }
  } catch (error) {
    return {
      status: 'Transaction Failed' + error.message,
    }
  }
}

export const takeHighestBid = async (nftAddress, id) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.takeHighestBid(nftAddress, id).encodeABI(),
  }

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams, 'latest'],
    })
    return {
      status: 'Transaction Successful. Refresh in a moment',
    }
  } catch (error) {
    return {
      status: 'Transaction Failed' + error.message,
    }
  }
}

export const getAuctionBids = async () => {
  window.contract = await new web3.eth.Contract(abi, address)
  const allBids = await window.contract.getPastEvents("AuctionBid", {
    fromBlock: 0,
    toBlock: "latest",
  });
  console.log(allBids)
  // console.log(window.ethereum.selectedAddress)
  return allBids
}
