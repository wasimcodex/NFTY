import React, { useEffect, useState } from 'react'
import ConnetBtn from './ConnectBtn'
import NftCards from './NftCards'

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require('../contracts/NFTY.json')
const { nftAddress } = require('../contracts/nft-contract-address.json')

const getCollections = async () => {
  window.contract = await new web3.eth.Contract(contractABI, nftAddress)
  const transactionParameters = {
    to: nftAddress,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.getCount().encodeABI(),
  }

  try {
    const res = await window.ethereum.request({
      method: 'eth_call',
      params: [transactionParameters],
    })

    const count = parseInt(res, 16)
    console.log('count : ' + count)

    const urls = []
    for (let i = 1; i <= count; i++) {
      const txParameters = {
        to: nftAddress,
        from: window.ethereum.selectedAddress,
        data: window.contract.methods.tokenURI(i).encodeABI(),
      }

      const response = await window.ethereum.request({
        method: 'eth_call',
        params: [txParameters],
      })
      let url = web3.utils.hexToAscii(response)
      urls.push(url.trim().substring(64, 144))
    }
    console.log(urls)

    const data = []
    for (let i = 0; i < urls.length; i++) {
      const res = await fetch(urls[i])
        .then((response) => response.json())
        .then((res) => {
          data.push(res)
        })
    }
    console.log(data)

    return data
  } catch (err) {
    return {
      success: false,
      status: 'somethig went wrong ' + err.message,
    }
  }
}

export default function Collections() {
  const [NFTs, setNFTs] = useState([])
  useEffect(() => {
    async function getNfts() {
      const NFTArray = await getCollections()
      setNFTs(NFTArray)
      console.log(NFTs)
    }
    getNfts()
  }, [])

  const [Status, setStatus] = useState('')
  return (
    <div>
      <ConnetBtn setStatus={setStatus} />
      <NftCards NFTArray={NFTs} />
    </div>
  )
}
