import { pinFILEtoIPFS, pinJSONtoIPFS } from './pinata'
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require('../contracts/NFTY.json')
const { nftAddress } = require('../contracts/nft-contract-address.json')

export const mintNFT = async (imgFile, name, description) => {
  if (imgFile === '' || name.trim() === '' || description.trim() === '') {
    return {
      success: false,
      status: 'Please make sure all fiels are filled properly.',
    }
  }
  const pinFileResponse = await pinFILEtoIPFS(imgFile)
  if (!pinFileResponse.success) {
    return {
      success: false,
      status: 'something went wrong while uploading file',
    }
  } else {
    const fileUri = pinFileResponse.pinataUrl

    const metadata = new Object()

    const pinataContent = {}
    pinataContent.name = name
    pinataContent.image = fileUri
    pinataContent.description = description

    const pinataMetadata = new Object()
    pinataMetadata.name = name + '.json'

    metadata.pinataMetadata = pinataMetadata
    metadata.pinataContent = pinataContent

    console.log(metadata)
    const pinataResponse = await pinJSONtoIPFS(metadata)
    if (!pinataResponse.success) {
      return {
        success: false,
        status: 'Something went wrong while uploading Uri',
      }
    }
    const JsonUri = pinataResponse.pinataUrl

    console.log(JsonUri)

    window.contract = await new web3.eth.Contract(contractABI, nftAddress)

    const transactionParameters = {
      to: nftAddress,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods
        .mintNFT(window.ethereum.selectedAddress, JsonUri)
        .encodeABI(),
    }

    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })
      return {
        success: true,
        status:
          'check out you transaction on Etherscan: https://ropsten.etherscan.io/tx/' +
          txHash,
      }
    } catch (err) {
      return {
        success: false,
        status: 'Something went wrong: ' + err.message,
      }
    }
  }
}
