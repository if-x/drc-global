import Web3 from "web3";
import { AbiItem } from "web3-utils";
import DRContract from "../../../contracts/IDigitalReserve.json";
import { getTokenPrice } from "../../uniswap-graph/token-price";

interface UserVaultInfoInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
}

export const getUserPastDrEvents = async ({
  web3,
  userAccount,
  contractAddress,
}: UserVaultInfoInput) => {
  try {
    const contract = new web3.eth.Contract(
      DRContract.abi as AbiItem[],
      contractAddress
    );

    const pastDeposits = await contract.getPastEvents("Deposit", {
      filter: { user: userAccount },
      fromBlock: 1,
    });

    const detailedDeposits: any[] = [];
    for (const deposit of pastDeposits) {
      const blockNumber = deposit.blockNumber;
      const drcPrice = await getTokenPrice("drc", blockNumber);
      const usdWorth = drcPrice
        ? Number(deposit.returnValues.amount) * drcPrice
        : null;
      detailedDeposits.push({ ...deposit.returnValues, drcPrice, usdWorth });
    }

    const pastWithdrawals = await contract.getPastEvents("Withdraw", {
      filter: { user: userAccount },
      fromBlock: 1,
    });

    const detailedWithdrawals: any[] = [];
    for (const withdrawal of pastWithdrawals) {
      const blockNumber = withdrawal.blockNumber;
      const drcPrice = await getTokenPrice("drc", blockNumber);
      const usdWorth = drcPrice
        ? Number(withdrawal.returnValues.amount) * drcPrice
        : null;
      detailedWithdrawals.push({
        ...withdrawal.returnValues,
        drcPrice,
        usdWorth,
      });
    }

    const lastDeposit = detailedDeposits[detailedDeposits.length - 1];
    const lastDepositedAmount = lastDeposit ? Number(lastDeposit.amount) : 0;
    const lastDepositedUsdWorth = lastDeposit
      ? Number(lastDeposit.usdWorth)
      : 0;

    const totalDepositAmount = detailedDeposits.reduce(
      (total: number, deposit: any) => {
        return (total += Number(deposit.amount));
      },
      0
    );

    const totalDepositUsdWorth = detailedDeposits.reduce(
      (total: number, deposit: any) => {
        return (total += Number(deposit.usdWorth));
      },
      0
    );

    const totalWidthdrawAmount = detailedWithdrawals.reduce(
      (total: number, withdraw: any) => {
        return (total += Number(withdraw.amount));
      },
      0
    );

    const totalWidthdrawUsdWorth = detailedWithdrawals.reduce(
      (total: number, withdraw: any) => {
        return (total += Number(withdraw.usdWorth));
      },
      0
    );

    return {
      lastDepositedAmount,
      lastDepositedUsdWorth,
      totalDepositAmount,
      totalDepositUsdWorth,
      totalWidthdrawAmount,
      totalWidthdrawUsdWorth,
    };
  } catch (err) {
    console.error("Failed to get past deposit withdrawal", err);
    return null;
  }
};
