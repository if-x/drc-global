import LRU from "lru-cache";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IDRCVault from "../../../contracts/IDRCVault.json";
import { dataWeb3 } from "../data-web3";

const cache = new LRU<string, string[]>({
  max: 50000,
  maxAge: 1000 * 60 * 5, // 5 mins
});

interface VaultTotalInput {
  web3?: Web3;
  contractAddress: string;
  force?: boolean;
}

export const getDrcVaultHolders = async ({
  web3,
  contractAddress,
  force,
}: VaultTotalInput) => {
  const cacheKey = `drcVaultHolders`;
  const cachedData: string[] | undefined = cache.get(cacheKey);

  if (cachedData && !force) {
    return cachedData;
  }

  const web3ToUse = web3 || dataWeb3;

  try {
    const contract = new web3ToUse.eth.Contract(
      IDRCVault.abi as AbiItem[],
      contractAddress
    );

    const holders: string[] = await contract.methods.holders().call();

    if (holders) {
      cache.set(cacheKey, holders);
    }

    return holders;
  } catch (err) {
    console.error("Failed to get DRC vault holders", err);
    return null;
  }
};
