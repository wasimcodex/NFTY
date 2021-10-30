export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const obj = {
        address: addressArray[0],
        status: '',
      }
      return obj
    } catch (err) {
      return {
        address: '',
        status: err.message,
      }
    }
  } else {
    return {
      address: '',
      status: 'You must install Metamask, in your browser.',
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '',
        }
      } else {
        return {
          address: '',
          status: 'Click on the connect button to connet to metamask wallet.',
        }
      }
    } catch (err) {
      return {
        address: '',
        status: err.message,
      }
    }
  } else {
    return {
      address: '',
      status: 'You must install Metamask, in your browser.',
    }
  }
}

export const walletListener = () => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        return {
          address: accounts[0],
          status: '',
        }
      } else {
        return {
          address: '',
          status: 'Click on the connect button to connect to metamask wallet.',
        }
      }
    })
  } else {
    return {
      address: '',
      status: 'You must install Metamask, in your browser.',
    }
  }
}
