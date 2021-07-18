import LRU from "lru-cache";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IDRCVault from "../../../contracts/IDRCVault.json";
import { dataWeb3 } from "../data-web3";

const cache = new LRU<string, number>({
  max: 50000,
  maxAge: 1000 * 60 * 5, // 5 mins
});

interface VaultTotalInput {
  web3?: Web3;
  contractAddress: string;
  force?: boolean;
}

export const getDrcVaultTotal = async ({
  web3,
  contractAddress,
  force,
}: VaultTotalInput) => {
  const cacheKey = `drcVaultTotalHolding`;
  const cachedData: number | undefined = cache.get(cacheKey);

  if (cachedData && !force) {
    return cachedData;
  }

  const web3ToUse = web3 || dataWeb3;

  try {
    const contract = new web3ToUse.eth.Contract(
      IDRCVault.abi as AbiItem[],
      contractAddress
    );

    const total = await contract.methods.totalAmountLocked().call();

    if (total) {
      cache.set(cacheKey, total);
    }

    return Number(total);
  } catch (err) {
    console.error("Failed to get DRC vault total holding", err);
    return null;
  }
};
