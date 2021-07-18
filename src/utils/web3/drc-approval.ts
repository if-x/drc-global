import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IERC20 from "../../contracts/IERC20.json";
import { getContractAddress } from "../../data/dr/contract-by-network";
import { getEthPrice } from "../uniswap-graph/eth-price";
import { getGasPrice } from "./gas-price";

interface AllowanceInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  chainId: number;
}

export const getDrcAllowance = async ({
  web3,
  userAccount,
  contractAddress,
  chainId,
}: AllowanceInput) => {
  try {
    const drcToken = new web3.eth.Contract(
      IERC20.abi as AbiItem[],
      getContractAddress("drc", chainId)
    );

    const allowance = Number(
      await drcToken.methods.allowance(userAccount, contractAddress).call()
    );

    return allowance;
  } catch (err) {
    return null;
  }
};

interface ApproveSpendingGasInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  amount: number;
  chainId: number;
}

export const estimateDrcApproveSpendingGas = async ({
  web3,
  userAccount,
  contractAddress,
  amount,
  chainId,
}: ApproveSpendingGasInput) => {
  if (amount === 0) {
    return 0;
  }

  const drcToken = new web3.eth.Contract(
    IERC20.abi as AbiItem[],
    getContractAddress("drc", chainId)
  );

  try {
    const gasPrice = await getGasPrice(web3);
    if (gasPrice) {
      const gasLimit = await drcToken.methods
        .approve(contractAddress, amount)
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
  amount: number;
  onTxHash?: (transactionHash: string) => void;
  chainId: number;
}

export const approveDrcSpending = async ({
  web3,
  userAccount,
  contractAddress,
  amount,
  onTxHash,
  chainId,
}: ApproveSpendingInput) => {
  const allowance = await getDrcAllowance({
    web3,
    userAccount,
    contractAddress,
    chainId,
  });

  if (allowance && allowance >= amount) {
    return { success: true };
  }

  try {
    const drcToken = new web3.eth.Contract(
      IERC20.abi as AbiItem[],
      getContractAddress("drc", chainId)
    );

    const gasPrice = await getGasPrice(web3);
    let gasLimit: number | undefined = undefined;
    try {
      gasLimit = await drcToken.methods
        .approve(contractAddress, amount)
        .estimateGas({ from: userAccount, gasPrice });
    } catch (err) {
      console.log("Can't estimate gas", err);
    }

    await drcToken.methods
      .approve(contractAddress, amount)
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
