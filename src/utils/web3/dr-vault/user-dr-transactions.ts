import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { DrTransactionInfo } from "../../../../types/dr-vault";
import DRContract from "../../../contracts/IDigitalReserve.json";
import IERC20 from "../../../contracts/IERC20.json";
import {
  ADDRESS_0,
  getContractAddress,
} from "../../../data/dr/contract-by-network";
import { getWithdrawalContractAddress } from "../../../data/dr/dr-contract-addresses";
import { formatTimestamp } from "../../timestamp";
import { isSameAddress } from "../address-helper";
import { getBlockTimestamp } from "../get-block-timestamp";

interface UserTransactionsInput {
  web3: Web3;
  userAccount: string;
  contractAddress: string;
  chainId: number;
}

export const getUserDrTransactions = async ({
  web3,
  userAccount,
  contractAddress,
  chainId,
}: UserTransactionsInput) => {
  try {
    const contract = new web3.eth.Contract(
      [...DRContract.abi, ...IERC20.abi] as AbiItem[],
      contractAddress
    );

    const drcToken = new web3.eth.Contract(
      IERC20.abi as AbiItem[],
      getContractAddress("drc", chainId)
    );

    const withdrawalContractAddr = getWithdrawalContractAddress(chainId);

    const depositEvents = await contract.getPastEvents("Deposit", {
      filter: { user: userAccount },
      fromBlock: 1,
    });

    const withdrawEvents = await contract.getPastEvents("Withdraw", {
      filter: { user: userAccount },
      fromBlock: 1,
    });

    const withdrawEventsExt = await drcToken.getPastEvents("Transfer", {
      filter: { from: withdrawalContractAddr, to: userAccount },
      fromBlock: 1,
    });

    const receiveEvents = await contract.getPastEvents("Transfer", {
      filter: { to: userAccount },
      fromBlock: 1,
    });

    // isSameAddress
    const receiveOnlyEvents = receiveEvents.filter(
      (tx) =>
        !isSameAddress(tx.returnValues.from, ADDRESS_0) &&
        !isSameAddress(tx.returnValues.from, withdrawalContractAddr)
    );

    const sendEvents = await contract.getPastEvents("Transfer", {
      filter: { from: userAccount },
      fromBlock: 1,
    });

    const sendOnlyEvents = sendEvents.filter(
      (tx) =>
        !isSameAddress(tx.returnValues.to, ADDRESS_0) &&
        !isSameAddress(tx.returnValues.to, withdrawalContractAddr)
    );

    const allTransactions = [
      ...depositEvents,
      ...withdrawEvents,
      ...withdrawEventsExt,
      ...receiveOnlyEvents,
      ...sendOnlyEvents,
    ].sort((a, b) => {
      return b.blockNumber - a.blockNumber;
    });

    const allTxFormated: DrTransactionInfo[] = [];

    for (const tx of allTransactions) {
      const blockNumber = tx.blockNumber;
      const timestamp = await getBlockTimestamp(web3, blockNumber);
      if (isSameAddress(tx.returnValues.from, withdrawalContractAddr)) {
        const drcAmount = tx.returnValues.value
          ? Number(tx.returnValues.value)
          : undefined;
        allTxFormated.push({
          id: `${tx.transactionHash}${tx.logIndex}`,
          eventName: "Withdraw",
          transactionHash: tx.transactionHash,
          timestamp,
          timeFormated: formatTimestamp(timestamp),
          drcAmount,
        });
      } else {
        let eventName = tx.event;
        if (tx.returnValues.to === userAccount) {
          eventName = "Receive";
        } else if (tx.returnValues.from === userAccount) {
          eventName = "Send";
        }

        const drcAmount = tx.returnValues.amount
          ? Number(tx.returnValues.amount)
          : undefined;
        const podAmount = tx.returnValues.value
          ? Number(web3.utils.toWei(tx.returnValues.value))
          : undefined;

        allTxFormated.push({
          id: `${tx.transactionHash}${tx.logIndex}`,
          eventName,
          transactionHash: tx.transactionHash,
          timestamp,
          timeFormated: formatTimestamp(timestamp),
          drcAmount,
          podAmount,
        });
      }
    }

    return allTxFormated;
  } catch (err) {
    console.error("Failed to get past transactions", err);
    return null;
  }
};
