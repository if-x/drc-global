import LRU from "lru-cache";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IERC1155ABI from "../../contracts/IERC1155ABI.json";
import { dataWeb3 } from "./data-web3";

type NftGen = "gen00" | "gen01";

const NFTContractAddress = "0xe57b446d45432A1827210240ef18a21059Bfe945";
// const ownerAddress = "0x9295f09591ED988507Af8d17A2219089E8fe6255";
const NFTIds: Record<NftGen, number> = {
  gen00: 3,
  gen01: 16,
};

const cache = new LRU<string, number>({
  max: 50000,
  maxAge: 1000 * 60 * 5, // 5 mins
});

interface NftBalanceInput {
  web3?: Web3;
  userAccount: string;
  nftGen: NftGen;
}

export const getNFTBalance = async ({
  web3,
  userAccount,
  nftGen,
}: NftBalanceInput) => {
  const cacheKey = `userNftBalance_${nftGen}_${userAccount}`;
  const cachedData: number | undefined = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const web3ToUse = web3 || dataWeb3;

  const contract = new web3ToUse.eth.Contract(
    IERC1155ABI as AbiItem[],
    NFTContractAddress
  );

  try {
    // Call balanceOf function
    const nftBalance = Number(
      await contract.methods.balanceOf(userAccount, NFTIds[nftGen]).call()
    );

    if (nftBalance) {
      cache.set(cacheKey, nftBalance);
    }

    return nftBalance;
  } catch (err) {
    console.error("Failed to get user NFT holding", nftGen, userAccount, err);
    return null;
  }
};
