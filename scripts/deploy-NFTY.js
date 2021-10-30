const { artifacts } = require('hardhat')

async function main() {
  const NFTY = await ethers.getContractFactory('NFTY')

  // Start deployment, returning a promise that resolves to a contract object
  const nfty = await NFTY.deploy()
  console.log('Contract deployed to address:', nfty.address)

  saveFrontendFiles(nfty)
}

saveFrontendFiles = (token) => {
  const fs = require('fs')
  const contractDir = __dirname + '/../frontend/src/contracts'

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir)
  }

  fs.writeFileSync(
    contractDir + '/nft-contract-address.json',
    JSON.stringify({ nftAddress: token.address }, undefined, 2),
  )

  const TokenArtifact = artifacts.readArtifactSync('NFTY')

  fs.writeFileSync(
    contractDir + '/NFTY.json',
    JSON.stringify(TokenArtifact, null, 2),
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
