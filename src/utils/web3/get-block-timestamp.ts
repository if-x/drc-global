import Web3 from "web3";
import localForage from "localforage";

export const getBlockTimestamp = async (web3: Web3, blockNumber: number) => {
  const blockTimestamp = await localForage.getItem<number>(
    `blockTimestamp_${blockNumber}`
  );

  if (blockTimestamp) {
    return blockTimestamp;
  }

  const blockInfo = await web3.eth.getBlock(blockNumber);
  const timestamp = Number(blockInfo.timestamp);

  localForage.setItem<number>(`blockTimestamp_${blockNumber}`, timestamp);

  return timestamp;
};
