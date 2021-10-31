const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const { abi } = require('../contracts/Bank.json')
const { address } = require('../contracts/bank-contract-address.json')

export const depositEth = async (amount) => {
  console.log(amount)
  if (parseInt(amount) <= 0) {
    return {
      success: false,
      status: 'Input valid amount',
    }
  }

  window.contract = await new web3.eth.Contract(abi, address)

  const WeiAmount = parseInt(web3.utils.toWei(amount, 'ether'))

  const pay = web3.utils.toHex(WeiAmount)

  console.log(WeiAmount)

  const txParameters = {
    to: address,
    from: window.ethereum.selectedAddress,
    value: pay,
    data: window.contract.methods.deposit().encodeABI(),
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParameters],
    })
    return {
      success: true,
      status: 'Amount Deposited' + txHash,
    }
  } catch (err) {
    return {
      success: false,
      status: 'Something went wrong ' + err.message,
    }
  }
}

export const withdrawETH = async (amount) => {
  window.contract = await new web3.eth.Contract(abi, address)

  const Wei = web3.utils.toWei(amount)

  const txParameters = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods
      .withdraw(Wei, window.ethereum.selectedAddress)
      .encodeABI(),
  }

  try {
    const res = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParameters],
    })
    return {
      success: true,
      status: 'Withdraw Successfull',
    }
  } catch (err) {
    return {
      success: false,
      status: 'Something went wrong: ' + err.message,
    }
  }
}

export const checkBalance = async () => {
  window.contract = await new web3.eth.Contract(abi, address)

  const txParameters = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods
      .getBalance(window.ethereum.selectedAddress)
      .encodeABI(),
  }

  try {
    const response = await window.ethereum.request({
      method: 'eth_call',
      params: [txParameters],
    })
    console.log(parseInt(response, 16))
    return web3.utils.fromWei(parseInt(response, 16).toString(), 'ether')
  } catch (err) {
    return err.message
  }
}

export const checkPool = async () => {
  window.contract = await new web3.eth.Contract(abi, address)

  const txParameters = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.getCashPool().encodeABI(),
  }

  try {
    const response = await window.ethereum.request({
      method: 'eth_call',
      params: [txParameters],
    })
    return web3.utils.fromWei(parseInt(response, 16).toString(), 'ether')
  } catch (err) {
    return err.message
  }
}
