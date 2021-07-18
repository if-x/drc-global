import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IDigitalReserveWithdrawalABI from "../../../../contracts/IDigitalReserveWithdrawalABI.json";
import { getWithdrawalContractAddress } from "../../../../data/dr/dr-contract-addresses";
import { getUnixTimeAfterMins } from "../../../timestamp";
import { getEthPrice } from "../../../uniswap-graph/eth-price";
import { getGasPrice } from "../../gas-price";

interface WithdrawPercentageGasInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  percentage: number;
  minAmountOut: number;
  chainId: number;
}

export const estimateWithdrawPercentageGas = async ({
  web3,
  userAccount,
  contractAddress,
  percentage,
  minAmountOut,
  chainId,
}: WithdrawPercentageGasInput) => {
  if (percentage === 0) {
    return 0;
  }

  const withdrawalContractAddr = getWithdrawalContractAddress(chainId);

  const withdrawalContract = new web3.eth.Contract(
    IDigitalReserveWithdrawalABI as AbiItem[],
    withdrawalContractAddr
  );

  try {
    const gasPrice = await getGasPrice(web3);
    if (gasPrice) {
      const gasLimit = await withdrawalContract.methods
        .withdrawPercentage(
          contractAddress,
          percentage,
          minAmountOut,
          getUnixTimeAfterMins(10)
        )
        .estimateGas({ from: userAccount, gasPrice });

      const ethAmount =
        (Number(web3.utils.fromWei(gasPrice, "gwei")) *
          Math.round(gasLimit * 1.1)) /
        10 ** 9;
      const ethPrice = (await getEthPrice()) || 0;

      return ethAmount * ethPrice;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

interface WithdrawPercentageInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  percentage: number;
  minAmountOut: number;
  chainId: number;
  onTxHash?: (transactionHash: string) => void;
}

export const drVaultWithdrawPercentage = async ({
  web3,
  userAccount,
  contractAddress,
  percentage,
  minAmountOut,
  chainId,
  onTxHash,
}: WithdrawPercentageInput) => {
  try {
    const withdrawalContractAddr = getWithdrawalContractAddress(chainId);

    const withdrawalContract = new web3.eth.Contract(
      IDigitalReserveWithdrawalABI as AbiItem[],
      withdrawalContractAddr
    );

    const gasPrice = await getGasPrice(web3);
    let gasLimit: number | undefined = undefined;
    try {
      gasLimit = await withdrawalContract.methods
        .withdrawPercentage(
          contractAddress,
          percentage,
          minAmountOut,
          getUnixTimeAfterMins(10)
        )
        .estimateGas({ from: userAccount, gasPrice });
    } catch (err) {
      console.log("Can't estimate gas", err);
    }

    await withdrawalContract.methods
      .withdrawPercentage(
        contractAddress,
        percentage,
        minAmountOut,
        getUnixTimeAfterMins(10)
      )
      .send({
        from: userAccount,
        gasPrice,
        gas: gasLimit ? Math.round(gasLimit * 1.1) : undefined,
      })
      .on("transactionHash", onTxHash);

    return { success: true };
  } catch (err) {
    console.error("Withdraw percentage failed", err);
    return { success: false };
  }
};
