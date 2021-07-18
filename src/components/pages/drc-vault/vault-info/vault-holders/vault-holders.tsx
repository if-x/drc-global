import * as React from "react";
import { CurrencySymbol } from "../../../../../../types/currency";
import { DrcVaultHolderInfo } from "../../../../../../types/dr-vault";
import { useCoinPrice } from "../../../../../hooks/query-hooks/use-coin-price";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../utils/format-number";
import {
  formatAddressForDisplay,
  isSameAddress,
} from "../../../../../utils/web3/address-helper";
import { WalletContext } from "../../../../../site-context/dr-context/wallet-context";
import Button from "../../../../ui-library/button/button";
import { getAddressUrl } from "../../../../../utils/etherscan";
import Text from "../../../../ui-library/text/text";
import { grid } from "../../../../ui-library/design-tokens/grid";
import styles from "./vault-holders.styles";

interface VaultHoldersProps {
  holders: DrcVaultHolderInfo[];
}

const VaultHolders: React.FC<VaultHoldersProps> = ({ holders }) => {
  const [isShowAll, setShowAll] = React.useState<boolean>(false);

  const context = React.useContext(WalletContext);

  const { data: drcPrice } = useCoinPrice({
    id: "digital-reserve-currency",
  });

  const price = drcPrice?.usd;
  const chainId = context.isConnected ? context.chainId : 1;
  const userAccount = context.isConnected ? context.userAccount : undefined;

  if (holders.length === 0 || !price) {
    return null;
  }

  const showingCount = 20;
  const displayingHolders = !isShowAll
    ? holders.slice(0, showingCount)
    : holders;

  return (
    <>
      <div css={styles.tableContainer}>
        <table css={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>Quantity</th>
              <th>Percentage</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {displayingHolders.map(
              ({ holding, address, percentage, gen00, gen01 }, index) => (
                <tr
                  key={address}
                  css={isSameAddress(userAccount, address) && styles.yourDrc}
                >
                  <td>
                    <div css={styles.indexCell}>
                      {index + 1}
                      {gen00 && (
                        <Text css={styles.gen00} margin={{ left: 7 }} />
                      )}
                      {gen01 && (
                        <Text css={styles.gen01} margin={{ left: 6 }} />
                      )}
                    </div>
                  </td>
                  <td>
                    <a
                      href={getAddressUrl(address, chainId)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isSameAddress(userAccount, address)
                        ? "Your DRC"
                        : formatAddressForDisplay(address)}
                    </a>
                  </td>
                  <td>{formatNumber({ value: holding })}</td>
                  <td>
                    <div>
                      {formatNumber({ value: percentage * 100, round: 2 })}%
                    </div>
                    <div css={styles.progressBar}>
                      <div style={{ width: `${percentage * 100}%` }} />
                    </div>
                  </td>
                  <td>
                    {formatCurrency({
                      value: holding * price,
                      currency: CurrencySymbol.USD,
                      round: 2,
                    })}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {holders.length > showingCount && (
        <div css={styles.toggleButton}>
          <Button
            type="primary"
            css={styles.button}
            onClick={() => setShowAll(!isShowAll)}
          >
            {isShowAll ? "SHOW LESS" : "SHOW ALL"}
          </Button>
        </div>
      )}

      <div css={styles.legendContainer}>
        <Text type="secondary" textSize={14} margin={{ right: grid(3) }}>
          <Text margin={{ right: grid(1) }} css={styles.gen00} />
          GEN00 NFT
        </Text>
        <Text type="secondary" textSize={14}>
          <Text margin={{ right: grid(1) }} css={styles.gen01} />
          GEN01 NFT
        </Text>
      </div>
    </>
  );
};

export default VaultHolders;
