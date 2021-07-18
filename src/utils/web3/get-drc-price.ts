import LRU from "lru-cache";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IUniswapV2Router02 from "../../contracts/IUniswapV2Router02.json";
import { getContractAddress } from "../../data/dr/contract-by-network";
import { getEthPrice } from "../uniswap-graph/eth-price";

const cache = new LRU<string, number>({
  max: 50000,
  maxAge: 1000 * 60,
});

interface DrcPriceInput {
  web3: Web3;
  amount: number;
  chainId: number;
}

export const getDrcPrice = async ({ web3, amount, chainId }: DrcPriceInput) => {
  const cachedData: number | undefined = cache.get("drcPrice");

  if (cachedData) {
    return cachedData;
  }

  try {
    const uniswapRouter = new web3.eth.Contract(
      IUniswapV2Router02.abi as AbiItem[],
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    );

    const ethAmount = (
      await uniswapRouter.methods
        .getAmountsOut(amount, [
          getContractAddress("drc", chainId),
          getContractAddress("weth", chainId),
        ])
        .call()
    )[1];

    const ethAmountNum = (Number(web3.utils.fromWei(ethAmount)) / 997) * 1000;

    const price = (await getEthPrice()) || 0;

    cache.set("drcPrice", ethAmountNum * price);

    return ethAmountNum * price;
  } catch (err) {
    return null;
  }
};
