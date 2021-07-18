import Web3 from "web3";

let updateTime = Date.now();

export const subscribeToBlockUpdate = (
  web3: Web3,
  callback: (blockNumber: number) => void
) => {
  web3.eth.subscribe("newBlockHeaders").on("data", function (blockHeader) {
    const blockNumber = blockHeader.number;

    const now = Date.now();

    if (now - updateTime >= 1000 * 60) {
      callback(blockNumber);
      updateTime = now;
    }
  });
};
