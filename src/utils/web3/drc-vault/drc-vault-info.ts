import Web3 from "web3";
import { DrcVaultHolderInfo, DrcVaultInfo } from "../../../../types/dr-vault";
import { dataWeb3 } from "../data-web3";
import { getNFTBalance } from "../nft-balance";
import { getDrcVaultHolders } from "./drc-vault-holders";
import { getDrcVaultTotal } from "./drc-vault-total";
import { getUserDrcVaultHolding } from "./user-drc-vault-holding";

interface VaultInfoInput {
  web3?: Web3;
  contractAddress: string;
}

export const getDrcVaultInfo = async ({
  web3,
  contractAddress,
}: VaultInfoInput): Promise<DrcVaultInfo | null> => {
  const web3ToUse = web3 || dataWeb3;

  try {
    const holders =
      (await getDrcVaultHolders({
        web3: web3ToUse,
        contractAddress,
      })) || [];
    const total = await getDrcVaultTotal({ web3: web3ToUse, contractAddress });
    const holdingPromises = [];

    for (const holder of holders) {
      const getHolding = async (): Promise<DrcVaultHolderInfo | undefined> => {
        const holding = await getUserDrcVaultHolding({
          web3: web3ToUse,
          contractAddress,
          userAccount: holder,
        });

        const gen00 = await getNFTBalance({
          web3: web3ToUse,
          userAccount: holder,
          nftGen: "gen00",
        });
        const gen01 = await getNFTBalance({
          web3: web3ToUse,
          userAccount: holder,
          nftGen: "gen01",
        });

        if (holding && total) {
          return {
            address: holder,
            holding,
            percentage: holding / total,
            gen00: Boolean(gen00),
            gen01: Boolean(gen01),
          };
        }
      };
      holdingPromises.push(getHolding());
    }

    const holderHoldings = await Promise.all(holdingPromises);

    return {
      total,
      holders: (holderHoldings.filter(Boolean) as DrcVaultHolderInfo[]).sort(
        (a, b) => b.holding - a.holding
      ),
    };
  } catch (err) {
    console.error("Failed get DRC vault info", err);
    return null;
  }
};
