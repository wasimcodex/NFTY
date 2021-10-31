const { ethers, artifacts } = require('hardhat')

async function main() {
  const Bank = await ethers.getContractFactory('Bank')

  const bank = await Bank.deploy()
  console.log('Contract Bank deployed at address: ', bank.address)

  saveFrontendFiles(bank)
}

saveFrontendFiles = (token) => {
  const fs = require('fs')
  const contractDir = __dirname + '/../frontend/src/contracts'

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir)
  }

  fs.writeFileSync(
    contractDir + '/bank-contract-address.json',
    JSON.stringify({ address: token.address }, undefined, 2),
  )

  const BankArtifact = artifacts.readArtifactSync('Bank')

  fs.writeFileSync(
    contractDir + '/Bank.json',
    JSON.stringify(BankArtifact, null, 2),
  )
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(0)
  })
