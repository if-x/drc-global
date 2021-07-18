import Web3 from "web3";
import { AbiItem } from "web3-utils";
import DRContract from "../../../contracts/IDigitalReserve.json";
import IERC20 from "../../../contracts/IERC20.json";
import { getEthPrice } from "../../uniswap-graph/eth-price";

interface UserVaultInfoInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
}

export const getUserVaultInfo = async ({
  web3,
  userAccount,
  contractAddress,
}: UserVaultInfoInput) => {
  try {
    const contract = new web3.eth.Contract(
      [...DRContract.abi, ...IERC20.abi] as AbiItem[],
      contractAddress
    );

    const drPodBalance = await contract.methods.balanceOf(userAccount).call();
    const podUnitprice = await contract.methods.getProofOfDepositPrice().call(); // TODO: as Vault grow bigger, this might become less accurate
    const totalHoldingInDrc = await contract.methods
      .getUserVaultInDrc(userAccount, 100)
      .call();

    const price = (await getEthPrice()) || 0;

    const drPodBalanceNum = Number(web3.utils.fromWei(drPodBalance));
    const podUnitpriceNum = Number(web3.utils.fromWei(podUnitprice));

    const userHoldingWorth = drPodBalanceNum * podUnitpriceNum * price;

    const totalWorthInDrc = Number(totalHoldingInDrc[0]);
    const totalDrcCanWithdraw = Number(totalHoldingInDrc[1]);
    const withdrawalFee =
      Number(web3.utils.fromWei(totalHoldingInDrc[2])) * price;

    const withdrawalFeePercentage = await contract.methods
      .withdrawalFee()
      .call();
    const feeFraction = Number(withdrawalFeePercentage[0]);
    const feeBase = Number(withdrawalFeePercentage[1]);
    const feePercentage = Math.round((feeFraction / feeBase) * 10000) / 100;

    return {
      drPodBalance: drPodBalanceNum,
      drPodBalanceInWei: drPodBalance,
      userHoldingUsd: userHoldingWorth,
      totalWorthInDrc,
      totalDrcCanWithdraw,
      withdrawalFee,
      feePercentage,
    };
  } catch (err) {
    console.error("Failed to get balance", err);
    return null;
  }
};
