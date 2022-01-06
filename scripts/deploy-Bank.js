const { ethers, artifacts } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying Bank contract with account:', deployer.address)

  const Bank = await ethers.getContractFactory('Bank')
  const bank = await Bank.deploy()

  console.log('Contract Bank deployed at address: ', bank.address)

  saveArtifacts(bank)
}

const saveArtifacts = (bank) => {
  const fs = require('fs')
  const contractDir = __dirname + '/../frontend/src/artifacts'

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir)
  }

  const bankArtifact = artifacts.readArtifactSync('Bank')

  const artifact = {
    address: bank.address,
    abi: bankArtifact.abi,
  }

  console.log('Saving artifacts to:', contractDir)

  fs.writeFileSync(contractDir + '/bank.json', JSON.stringify(artifact))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(0)
  })
