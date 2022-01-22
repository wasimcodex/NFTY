import { pinFILEtoIPFS, pinJSONtoIPFS } from './pinata'
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const { address, abi } = require('../artifacts/nft-contract.json')

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

    console.log('File URI: ' + fileUri)

    const metadata = {}

    const pinataContent = {}
    pinataContent.name = name
    pinataContent.image = fileUri
    pinataContent.description = description

    const pinataMetadata = {}
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

    window.contract = await new web3.eth.Contract(abi, address)

    const transactionParameters = {
      to: address,
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
      return (
        <>
          <p>
            {'check out you transaction on Etherscan: '}
            <a
              href={'https://rinkeby.etherscan.io/tx/' + txHash}
              target={'_blank'}
            >
              {' '}
              Here{' '}
            </a>
          </p>
        </>
      )
    } catch (err) {
      return (
        <>
          <p>{'Something went wrong : ' + err.message}</p>
        </>
      )
    }
  }
}
