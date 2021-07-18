import Web3 from "web3";
import { AbiItem } from "web3-utils";
import IERC20 from "../../contracts/IERC20.json";
import { getContractAddress } from "../../data/dr/contract-by-network";

// This is a test file

interface EventInput {
  web3: Web3;
  userAccount: string;
  chainId: number;
}

export const approvalEvent = async ({
  web3,
  userAccount,
  chainId,
}: EventInput) => {
  const drcToken = new web3.eth.Contract(
    IERC20.abi as AbiItem[],
    getContractAddress("drc", chainId)
  );

  const blockNumber = await web3.eth.getBlockNumber();

  return drcToken.events
    .Approval({
      filter: { owner: userAccount },
      fromBlock: blockNumber,
    })
    .on("connected", (subscriptionId: any) => {
      console.log("connected", subscriptionId);
    })
    .on("data", function (event: any) {
      console.log("data", event); // same results as the optional callback above
    })
    .on("changed", function (event: any) {
      // remove event from local database
      console.log("changed", event); // same results as the optional callback above
    })
    .on("error", function (error: any, receipt: any) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log("error", error, receipt); // same results as the optional callback above
    });
};
