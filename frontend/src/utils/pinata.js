require('dotenv').config()
const key = process.env.REACT_APP_PINATA_PUBLIC_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require('axios')

export const pinFILEtoIPFS = async (JSONBody) => {
  const url = 'https://api.pinata.cloud/pinning/pinFILEtoIPFS'

  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then((response) => {
      return {
        success: true,
        pinataUrl:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      }
    })
    .catch((err) => {
      console.error(err)
      return {
        success: false,
        message: err.message,
      }
    })
}

export const pinJSONtoIPFS = async (JSONBody) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONtoIPFS'
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then((respose) => {
      return {
        success: true,
        pinataUrl: 'https://gateway.pinata.cloud/ipfs/' + respose.data.IpfsHash,
      }
    })
    .catch((err) => {
      console.log(err)
      return {
        success: false,
        message: err.message,
      }
    })
}
