const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const { abi, address } = require("../artifacts/auction.json");

export const setBank = async (bankAddress) => {
  
  window.contract = await new web3.eth.Contract(abi, address);
  const txParams = {
    to: address,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.setBankContractAddress(bankAddress).encodeABI(),
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