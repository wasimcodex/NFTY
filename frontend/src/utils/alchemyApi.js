import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const { address } = require("../artifacts/nft-contract.json");

const web3 = createAlchemyWeb3(
  "https://eth-rinkeby.alchemyapi.io/v2/demo",
);

export const getNfts = async () => {
    const nfts = await web3.alchemy.getNfts({owner: window.ethereum.selectedAddress, contractAddresses: [address], withMetadata: true});
    return nfts;
}