import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IDRCVault from "../../../../contracts/IDRCVault.json";
import { getEthPrice } from "../../../uniswap-graph/eth-price";
import { getGasPrice } from "../../gas-price";

interface DepositGasInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  amount: number;
}

export const estimateDepositGas = async ({
  web3,
  userAccount,
  contractAddress,
  amount,
}: DepositGasInput) => {
  if (amount === 0) {
    return 0;
  }

  const contract = new web3.eth.Contract(
    IDRCVault.abi as AbiItem[],
    contractAddress
  );

  try {
    const gasPrice = await getGasPrice(web3);
    const gasLimit = await contract.methods
      .deposit(userAccount, amount)
      .estimateGas({ from: userAccount, gasPrice });

    if (gasPrice) {
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

interface VaultDepositInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  amount: number;
  onTxHash?: (transactionHash: string) => void;
}

export const drcVaultDeposit = async ({
  web3,
  userAccount,
  contractAddress,
  amount,
  onTxHash,
}: VaultDepositInput) => {
  try {
    const contract = new web3.eth.Contract(
      IDRCVault.abi as AbiItem[],
      contractAddress
    );

    const gasPrice = await getGasPrice(web3);
    let gasLimit: number | undefined = undefined;
    try {
      gasLimit = await contract.methods
        .deposit(userAccount, amount)
        .estimateGas({ from: userAccount, gasPrice });
    } catch (err) {
      console.log("Can't estimate gas", err);
    }

    await contract.methods
      .deposit(userAccount, amount)
      .send({
        from: userAccount,
        gasPrice,
        gas: gasLimit ? Math.round(gasLimit * 1.1) : undefined,
      })
      .on("transactionHash", onTxHash);

    return { success: true };
  } catch (err) {
    console.error("Deposit failed", err);
    return { success: false };
  }
};
