const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const { abi, address } = require('../artifacts/bank.json')

export const depositEth = async (amount) => {
  if (parseFloat(amount) <= 0) {
    return {
      status: 'Please enter a valid amount',
    }
  }

  window.contract = await new web3.eth.Contract(abi, address)

  const WeiAmount = web3.utils.toHex(web3.utils.toWei(amount, 'ether'))

  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    value: WeiAmount,
    data: window.contract.methods.deposit().encodeABI(),
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

export const withdrawEth = async (amount) => {
  window.contract = await new web3.eth.Contract(abi, address)

  const WeiAmount = web3.utils.toWei(amount, 'ether')

  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.withdraw(WeiAmount).encodeABI(),
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

export const transferEth = async (amount, toAddress) => {
  window.contract = await new web3.eth.Contract(abi, address)

  const WeiAmount = web3.utils.toWei(amount, 'ether')

  if (web3.utils.isAddress(toAddress)) {
    const txParams = {
      to: address,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods.transfer(toAddress, WeiAmount).encodeABI(),
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
  } else {
    return {
      status: 'Please enter a valid address',
    }
  }
}

export const getBalance = async () => {
  window.contract = await new web3.eth.Contract(abi, address)

  const reqParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.getBalance().encodeABI(),
  }

  try {
    const response = await window.ethereum.request({
      method: 'eth_call',
      params: [reqParams, 'latest'],
    })
    const exhRate = await exchangeRate()
    const balance = web3.utils.fromWei(response, 'ether')
    return {
      inr: balance * exhRate,
      eth: balance,
      exhRate: exhRate,
    }
  } catch (error) {
    return {
      status: 'Check Failed ' + error.message,
    }
  }
}

export const exchangeRate = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr',
  )
  const data = await response.json()
  return data.ethereum.inr
}


export const approveInterest = async () => {
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
      to: address,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods.interest().encodeABI(),
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

//loan functions

export const applyBankLoan = async (nftContractAdrress, id, amount, duration, repayAmount, inrAmount, emi) => {
    if (parseFloat(amount) <= 0) {
        return {
          status: 'Please enter a valid amount',
        }
    }
    window.contract = await new web3.eth.Contract(abi, address);
    const d = new Date();
    const endTimeStamp = d.setMonth(d.getMonth() + duration).valueOf();
    const WeiAmount = web3.utils.toWei(amount, 'ether')
    const WeiRepayAmount = web3.utils.toWei(repayAmount, 'ether')
    
    const txParams = {
        to: address,
        from: window.ethereum.selectedAddress,
        data: window.contract.methods.ApplyLoan(nftContractAdrress, id, WeiAmount, duration, WeiRepayAmount, inrAmount, emi, endTimeStamp).encodeABI(),
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


export const repayLoanAmount = async (amount) => {
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
      data: window.contract.methods.RepayLoan(WeiAmount).encodeABI(),
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


export const repayLoanAmountFromAccount = async (amount) => {
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
      data: window.contract.methods.RepayLoan(WeiAmount).encodeABI(),
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


export const loanEMI = async (emiAmount) => {
  if (parseFloat(emiAmount) <= 0) {
    return {
      status: 'Please enter a valid amount',
    }
  }
  const WeiEMIAmount = web3.utils.toHex(web3.utils.toWei(emiAmount, 'ether'))
  window.contract = await new web3.eth.Contract(abi, address)
  const txParams = {
      to: address,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods.LoanEMIPayment(WeiEMIAmount).encodeABI(),
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


export const loanEMIAccount = async (amount) => {
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
      data: window.contract.methods.LoanEMIPaymentFromAccount(WeiAmount).encodeABI(),
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

