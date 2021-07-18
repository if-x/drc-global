import LRU from "lru-cache";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IDRCVault from "../../../contracts/IDRCVault.json";

const cache = new LRU<string, number>({
  max: 50000,
  maxAge: 1000 * 60 * 5, // 5 mins
});

interface UserHoldingInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  force?: boolean;
}

export const getUserDrcVaultHolding = async ({
  web3,
  userAccount,
  contractAddress,
  force,
}: UserHoldingInput) => {
  const cacheKey = `drcVaultHolding_${userAccount}`;
  const cachedData: number | undefined = cache.get(cacheKey);

  if (cachedData && !force) {
    return cachedData;
  }

  try {
    const contract = new web3.eth.Contract(
      IDRCVault.abi as AbiItem[],
      contractAddress
    );

    const balanceOf = await contract.methods.balanceOf(userAccount).call();

    if (balanceOf) {
      cache.set(cacheKey, balanceOf);
    }

    return Number(balanceOf);
  } catch (err) {
    console.error("Failed to get user DRC vault holding", userAccount, err);
    return null;
  }
};
