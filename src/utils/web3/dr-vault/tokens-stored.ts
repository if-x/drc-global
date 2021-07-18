import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { AssetAllocation } from "../../../../types/dr-vault";
import DRContract from "../../../contracts/IDigitalReserve.json";
import IUniswapV2Router02 from "../../../contracts/IUniswapV2Router02.json";
import { getContractAddress } from "../../../data/dr/contract-by-network";

interface UserVaultInfoInput {
  web3: Web3;
  contractAddress: string;
  assets: AssetAllocation[];
  chainId: number;
}

export const getTokensStoredPercentage = async ({
  web3,
  contractAddress,
  assets,
  chainId,
}: UserVaultInfoInput): Promise<AssetAllocation[]> => {
  try {
    const contract = new web3.eth.Contract(
      DRContract.abi as AbiItem[],
      contractAddress
    );

    const uniswapRouter = new web3.eth.Contract(
      IUniswapV2Router02.abi as AbiItem[],
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    );

    const networkKey = chainId === 3 ? "ropsten" : "mainnet";
    const totalTokenStored = await contract.methods.totalTokenStored().call();
    const tokenUsdValues: number[] = [];
    let totalUsdValue = 0;

    for (let i = 0; i < assets.length; i++) {
      const tokenStored = totalTokenStored[i];
      let ethAmountNum = 0;

      if (Number(web3.utils.fromWei(tokenStored)) > 0) {
        if (assets[i].id !== "ethereum") {
          const ethAmount = (
            await uniswapRouter.methods
              .getAmountsOut(tokenStored, [
                assets[i].address[networkKey],
                getContractAddress("weth", chainId),
              ])
              .call()
          )[1];
          ethAmountNum = (Number(web3.utils.fromWei(ethAmount)) / 997) * 1000;
        } else {
          ethAmountNum = Number(web3.utils.fromWei(tokenStored));
        }
      }

      tokenUsdValues.push(ethAmountNum);
      totalUsdValue += ethAmountNum;
    }

    const assetPercentage = assets.map((asset, i) => ({
      ...asset,
      percentage:
        totalUsdValue > 0
          ? Math.round((tokenUsdValues[i] / totalUsdValue) * 100)
          : 0,
    }));

    return assetPercentage;
  } catch (err) {
    console.error("Failed to fetch tokens stored percentage", err);
    return assets;
  }
};
