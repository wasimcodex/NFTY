const { artifacts } = require('hardhat')

async function main() {
  const NFTY = await ethers.getContractFactory('NFTY')

  // Start deployment, returning a promise that resolves to a contract object
  const nfty = await NFTY.deploy()
  console.log('Contract deployed to address:', nfty.address)

  saveArtifacts(nfty)
}

const saveArtifacts = (token) => {
  const fs = require('fs')
  const contractDir = __dirname + '/../frontend/src/artifacts'

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir)
  }

  const TokenArtifact = artifacts.readArtifactSync('NFTY')

  const artifact = {
    address: token.address,
    abi: TokenArtifact.abi,
  }

  console.log('Saving artifacts to:', contractDir)

  fs.writeFileSync(
    contractDir + '/nft-contract.json',
    JSON.stringify(artifact, undefined, 2),
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
