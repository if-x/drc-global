import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { AssetKey } from "../../../../types/dr-vault";
import DRContract from "../../../contracts/IDigitalReserve.json";
import { contractNameByAddress } from "../../../data/dr/contract-by-network";
import { drAssets } from "../../../data/dr/dr-vaults";
import { bignumberToNumber } from "../bignumber";
import { getBlockTimestamp } from "../get-block-timestamp";

interface TokenStoredTimelineInput {
  web3: Web3;
  contractAddress: string;
}

interface VaultState {
  blockNumber: number;
  timestamp: number;
  totalSupply: number;
  tokens: AssetKey[];
  tokensStored: number[];
}
const firstDRBlock = 11922972;
const dayTimeInSec = 24 * 60 * 60;

export const getTokenStoredTimeline = async ({
  web3,
  contractAddress,
}: TokenStoredTimelineInput) => {
  try {
    const contract = new web3.eth.Contract(
      DRContract.abi as AbiItem[],
      contractAddress
    );

    const changeStrategyEvents = await contract.getPastEvents(
      "StrategyChange",
      {
        fromBlock: firstDRBlock,
      }
    );

    const depositEvents = await contract.getPastEvents("Deposit", {
      fromBlock: firstDRBlock,
    });

    const withdrawEvents = await contract.getPastEvents("Withdraw", {
      fromBlock: firstDRBlock,
    });

    const sortedEvents = [
      ...changeStrategyEvents,
      ...depositEvents,
      ...withdrawEvents,
    ].sort((a, b) => {
      if (a.blockNumber === b.blockNumber) {
        return a.transactionIndex - b.transactionIndex;
      }
      return a.blockNumber - b.blockNumber;
    });

    const vaultState = {
      blockNumber: firstDRBlock,
      timestamp: 0,
      totalSupply: 0,
      tokens: [] as AssetKey[],
      tokensStored: [] as number[],
    };

    let timelineData: VaultState[] = [];

    for (const event of sortedEvents) {
      const timestamp = await getBlockTimestamp(web3, event.blockNumber);
      const bucketTimestamp =
        Math.ceil(timestamp / dayTimeInSec) * dayTimeInSec;
      const lastTimestamp = vaultState.timestamp;

      vaultState.blockNumber = event.blockNumber;
      vaultState.timestamp = bucketTimestamp;

      if (event.event === "StrategyChange") {
        vaultState.tokens = event.returnValues.newTokens.map(
          (addr: string) => contractNameByAddress[addr.toLowerCase()]
        );
      }

      if (event.event === "Withdraw" || event.event === "Deposit") {
        vaultState.totalSupply = Number(
          web3.utils.fromWei(event.returnValues.podTotalSupply)
        );
      }

      vaultState.tokensStored = vaultState.tokens.map((token, i: number) =>
        bignumberToNumber(
          web3,
          event.returnValues.tokensStored[i],
          drAssets[token].decimals
        )
      );

      if (bucketTimestamp !== lastTimestamp) {
        timelineData = [...timelineData, { ...vaultState }];
      } else {
        timelineData[timelineData.length - 1] = { ...vaultState };
      }
    }

    const timelineFilled = timelineData.reduce(
      (filled: VaultState[], step, index) => {
        if (index > 0) {
          const prevStep = timelineData[index - 1];
          const prevTimestamp = prevStep.timestamp;
          const days = Math.round(
            (step.timestamp - prevTimestamp) / dayTimeInSec
          );
          for (let i = 1; i < days; i++) {
            const filledStep = {
              ...prevStep,
              timestamp: prevTimestamp + dayTimeInSec * i,
            };
            filled = [...filled, filledStep];
          }
          if (index === timelineData.length - 1) {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const daysToFill = Math.floor(
              (currentTimestamp - step.timestamp) / dayTimeInSec
            );
            for (let i = 1; i < daysToFill; i++) {
              const filledStep = {
                ...step,
                timestamp: step.timestamp + dayTimeInSec * i,
              };
              filled = [...filled, filledStep];
            }
          } else {
            filled = [...filled, step];
          }
        } else {
          filled = [step];
        }

        return filled;
      },
      []
    );

    return timelineFilled;
  } catch (err) {
    console.log("Failed to get token stored timeline", err);
    return null;
  }
};
