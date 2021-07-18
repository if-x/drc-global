import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IERC20 from "../../contracts/IERC20.json";
import { getContractAddress } from "../../data/dr/contract-by-network";

interface DrcBalanceInput {
  web3: Web3;
  userAccount: string;
  chainId: number;
}

export const getDrcBalance = async ({
  web3,
  userAccount,
  chainId,
}: DrcBalanceInput) => {
  try {
    const contract = new web3.eth.Contract(
      IERC20.abi as AbiItem[],
      getContractAddress("drc", chainId)
    );

    const drcBalance = Number(
      await contract.methods.balanceOf(userAccount).call()
    );

    return drcBalance;
  } catch (err) {
    return null;
  }
};
