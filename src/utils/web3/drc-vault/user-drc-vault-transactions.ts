import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { DrcVaultTransactionInfo } from "../../../../types/dr-vault";
import IDRCVault from "../../../contracts/IDRCVault.json";
import { formatTimestamp } from "../../timestamp";
import { getBlockTimestamp } from "../get-block-timestamp";

interface UserTransactionsInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
}

export const getUserDrcVaultTransactions = async ({
  web3,
  userAccount,
  contractAddress,
}: UserTransactionsInput) => {
  try {
    const contract = new web3.eth.Contract(
      IDRCVault.abi as AbiItem[],
      contractAddress
    );

    const depositEvents = await contract.getPastEvents("Deposit", {
      filter: { user: userAccount },
      fromBlock: 1,
    });

    const withdrawEvents = await contract.getPastEvents("Withdraw", {
      filter: { user: userAccount },
      fromBlock: 1,
    });

    const allTransactions = [...depositEvents, ...withdrawEvents].sort(
      (a, b) => {
        return b.blockNumber - a.blockNumber;
      }
    );

    const allTxFormated: DrcVaultTransactionInfo[] = [];

    for (const tx of allTransactions) {
      const blockNumber = tx.blockNumber;
      const timestamp = await getBlockTimestamp(web3, blockNumber);

      const drcAmount = tx.returnValues.amount
        ? Number(tx.returnValues.amount)
        : undefined;

      allTxFormated.push({
        id: `${tx.transactionHash}${tx.logIndex}`,
        eventName: tx.event,
        transactionHash: tx.transactionHash,
        timestamp,
        timeFormated: formatTimestamp(timestamp),
        drcAmount,
      });
    }

    return allTxFormated;
  } catch (err) {
    console.error(
      "Failed to get past DRC vault transactions",
      userAccount,
      err
    );
    return null;
  }
};
