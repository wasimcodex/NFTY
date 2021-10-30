const { ethers } = require("hardhat");

async function main() {
    const Bank = await ethers.getContractFactory("Bank")

    const bank = await Bank.deploy()
    console.log("Contract Bank deployed at address: ", bank.address)
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.error(err);
    process.exit(0);
})