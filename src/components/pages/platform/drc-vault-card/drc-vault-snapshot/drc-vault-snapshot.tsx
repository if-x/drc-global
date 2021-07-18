import * as React from "react";
import { CurrencySymbol } from "../../../../../../types/currency";
import { drcVaultAddress } from "../../../../../data/dr/dr-contract-addresses";
import { useCoinPrice } from "../../../../../hooks/query-hooks/use-coin-price";
import { WalletContext } from "../../../../../site-context/dr-context/wallet-context";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../utils/format-number";
import { getDrcVaultTotal } from "../../../../../utils/web3/drc-vault/drc-vault-total";
import { Fonts } from "../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../ui-library/design-tokens/grid";
import Text from "../../../../ui-library/text/text";
import styles from "./drc-vault-snapshot.styles";

interface SectionProps {
  heading: string;
  value: string;
}

const Section: React.FC<SectionProps> = ({ heading, value }) => (
  <div css={styles.section}>
    <Text
      component="div"
      type="secondary"
      textSize={14}
      textAlign="center"
      margin={{ bottom: grid(1) }}
    >
      {heading}
    </Text>
    <Text
      component="div"
      textSize={24}
      textAlign="center"
      weight={Fonts.Weight.Bold}
    >
      {value}
    </Text>
  </div>
);

const DrcVaultSnapshot: React.FC = () => {
  const context = React.useContext(WalletContext);

  const [vaultHolding, setVaultHolding] = React.useState<number>();

  const { data: drcPrice } = useCoinPrice({ id: "digital-reserve-currency" });

  const web3 = !context.loading ? context.web3 : undefined;
  const chainId = !context.loading ? context.chainId : 1;
  const networkKey = chainId === 3 ? "ropsten" : "mainnet";
  const contractAddress = drcVaultAddress[networkKey];

  const fetchVaultTotal = async () => {
    const total = await getDrcVaultTotal({
      web3,
      contractAddress,
    });
    if (total !== null) {
      setVaultHolding(total);
    }
  };

  React.useEffect(() => {
    fetchVaultTotal();
    const refetchTimer = setInterval(() => fetchVaultTotal(), 1000 * 60 * 5);

    return () => {
      clearInterval(refetchTimer);
    };
  }, [chainId]);

  const usdValue =
    vaultHolding !== undefined && drcPrice?.usd
      ? vaultHolding * drcPrice.usd
      : undefined;

  return (
    <div css={styles.root}>
      <Section heading="Portfolio allocation" value="100% DRC" />

      <hr css={styles.separator} />

      <Section
        heading="Total DRC Locked"
        value={formatNumber({ value: vaultHolding }) || "0"}
      />

      <hr css={styles.separator} />

      <Section
        heading="Total Value Locked"
        value={
          formatCurrency({
            value: usdValue,
            currency: CurrencySymbol.USD,
            round: 2,
          }) || "$0.00"
        }
      />
    </div>
  );
};

export default DrcVaultSnapshot;
