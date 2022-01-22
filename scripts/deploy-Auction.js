const { ethers, artifacts } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying Auction contract with account:', deployer.address)

  const Auction = await ethers.getContractFactory('NFTAuction')
  const auction = await Auction.deploy()

  console.log('Contract Auction deployed at address: ', auction.address)

  saveArtifacts(auction)
}

const saveArtifacts = (auction) => {
  const fs = require('fs')
  const contractDir = __dirname + '/../frontend/src/artifacts'

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir)
  }

  const auctionArtifact = artifacts.readArtifactSync('NFTAuction')

  const artifact = {
    address: auction.address,
    abi: auctionArtifact.abi,
  }

  console.log('Saving artifacts to:', contractDir)

  fs.writeFileSync(contractDir + '/auction.json', JSON.stringify(artifact))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(0)
  })
