import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IERC20 from "../../../../contracts/IERC20.json";
import { getWithdrawalContractAddress } from "../../../../data/dr/dr-contract-addresses";
import { getEthPrice } from "../../../uniswap-graph/eth-price";
import { getGasPrice } from "../../gas-price";

interface AllowanceInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  chainId: number;
}

export const getDrPodAllowance = async ({
  web3,
  userAccount,
  contractAddress,
  chainId,
}: AllowanceInput) => {
  const drPod = new web3.eth.Contract(IERC20.abi as AbiItem[], contractAddress);

  const withdrawalContract = getWithdrawalContractAddress(chainId);

  try {
    const allowance = await drPod.methods
      .allowance(userAccount, withdrawalContract)
      .call();
    return Number(web3.utils.fromWei(allowance));
  } catch (err) {
    return null;
  }
};

interface ApproveSpendingGasInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  chainId: number;
}

export const estimateDrPodApproveSpendingGas = async ({
  web3,
  userAccount,
  contractAddress,
  chainId,
}: ApproveSpendingGasInput) => {
  const drPod = new web3.eth.Contract(IERC20.abi as AbiItem[], contractAddress);

  const withdrawalContract = getWithdrawalContractAddress(chainId);

  try {
    const balance = await drPod.methods.balanceOf(userAccount).call();
    const gasPrice = await getGasPrice(web3);
    if (gasPrice) {
      const gasLimit = await drPod.methods
        .approve(withdrawalContract, balance)
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

interface ApproveSpendingInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  onTxHash?: (transactionHash: string) => void;
  chainId: number;
}

export const approveDrPodSpending = async ({
  web3,
  userAccount,
  contractAddress,
  onTxHash,
  chainId,
}: ApproveSpendingInput) => {
  const drPod = new web3.eth.Contract(IERC20.abi as AbiItem[], contractAddress);

  const withdrawalContract = getWithdrawalContractAddress(chainId);

  try {
    const balance = await drPod.methods.balanceOf(userAccount).call();
    const gasPrice = await getGasPrice(web3);
    let gasLimit: number | undefined = undefined;
    try {
      gasLimit = await drPod.methods
        .approve(withdrawalContract, balance)
        .estimateGas({ from: userAccount, gasPrice });
    } catch (err) {
      console.log("Can't estimate gas", err);
    }

    await drPod.methods
      .approve(withdrawalContract, balance)
      .send({
        from: userAccount,
        gasPrice,
        gas: gasLimit ? Math.round(gasLimit * 1.1) : undefined,
      })
      .on("transactionHash", onTxHash);

    return { success: true };
  } catch (err) {
    console.error("Approval failed", err);
    return { success: false };
  }
};
