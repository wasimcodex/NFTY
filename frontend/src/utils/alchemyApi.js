import { createAlchemyWeb3 } from '@alch/alchemy-web3'
const { address } = require('../artifacts/nft-contract.json')
const apiKey = 'demo'
const web3 = createAlchemyWeb3(`https://eth-rinkeby.alchemyapi.io/v2/${apiKey}`)

export const getNfts = async (owner) => {
  const nfts = await web3.alchemy.getNfts({
    owner: owner,
    contractAddresses: [address],
    withMetadata: true,
  })
  return nfts
}

export const getNftMetdata = async (tokenId) => {
  const metadata = await web3.alchemy.getNftMetadata({
    contractAddress: address,
    tokenId: tokenId,
  })
  return metadata
}

//Beta
export const getOwnersForToken = async (tokenId) => {
  const owner = await web3.alchemy.getOwnersForToken({
    contractAddress: address,
    tokenId: tokenId,
  })
  return owner
}
