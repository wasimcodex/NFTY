import axios from 'axios'

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const etherscanApi = process.env.REACT_APP_ETHERSCAN_KEY

const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const { abi, address } = require('../artifacts/nft-contract.json')

// get nft transaction history
export const getNftTransactionHistory = async (address, tokenId) => {
  console.log(alchemyKey, etherscanApi)
  const url = `https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${address}&sort=desc&apikey=${etherscanApi}`
  console.log(url)
  const data = await axios.get(
    `https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${address}&sort=desc&apikey=${etherscanApi}`,
  )
  const txs = data.data.result.filter((tx) => {
    return tx.tokenID === tokenId
  })
  return txs
}

export const transferNft = async (recipient, id) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
      to: address,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods.transferFrom(window.ethereum.selectedAddress, recipient, id).encodeABI(),
    }
    try {
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams, 'latest'],
      })
      return {
        status: 'Transaction Successful. Refresh in a moment.',
      }
    } catch (error) {
      return {
        status: 'Transaction Failed' + error.message,
      }
    }
}