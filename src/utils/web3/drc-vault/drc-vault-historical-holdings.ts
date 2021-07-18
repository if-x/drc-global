import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IDRCVault from "../../../contracts/IDRCVault.json";
import { getBlockTimestamp } from "../get-block-timestamp";

interface TransactionsInput {
  web3: Web3;
  contractAddress: string;
}

export const getVaultHistoricalHoldings = async ({
  web3,
  contractAddress,
}: TransactionsInput) => {
  try {
    const contract = new web3.eth.Contract(
      IDRCVault.abi as AbiItem[],
      contractAddress
    );

    const depositEvents = await contract.getPastEvents("Deposit", {
      fromBlock: 1,
    });

    const withdrawEvents = await contract.getPastEvents("Withdraw", {
      fromBlock: 1,
    });

    const allTransactions = [...depositEvents, ...withdrawEvents].sort(
      (a, b) => {
        return a.blockNumber - b.blockNumber;
      }
    );

    const allTxFormated = [];
    let lastHolding = 0;

    for (const tx of allTransactions) {
      const blockNumber = tx.blockNumber;
      const timestamp = await getBlockTimestamp(web3, blockNumber);

      const drcAmount = Number(tx.returnValues.amount);

      lastHolding =
        tx.event === "Deposit"
          ? lastHolding + drcAmount
          : lastHolding - drcAmount;

      allTxFormated.push({
        timestamp,
        holding: lastHolding,
      });
    }

    return allTxFormated;
  } catch (err) {
    console.error("Failed to get past DRC vault transactions", err);
    return null;
  }
};
