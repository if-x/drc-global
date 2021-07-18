import * as React from "react";
import { CurrencySymbol } from "../../../../../types/currency";
import { SiteContext } from "../../../../site-context/site-context";
import { formatCurrency } from "../../../../utils/format-number";
import { Fonts } from "../../design-tokens/fonts";
import Image from "../../image/image";
import Text from "../../text/text";
import styles from "./vault-asset-stacked.styles";

interface VaultAssetStackedProps {
  name: string;
  tokenName: string;
  symbol: string;
  usdValue?: number;
  percentage: number;
  image?: {
    black: string;
    white: string;
  };
  hasBorder?: boolean;
}

const VaultAssetStacked: React.FC<VaultAssetStackedProps> = ({
  name,
  tokenName,
  symbol,
  percentage,
  usdValue,
  image,
  hasBorder,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);

  return (
    <div css={(theme) => [styles.root, hasBorder && styles.rootBorder(theme)]}>
      <div css={styles.imageContainer}>
        {image && (
          <Image src={isDarkMode ? image.white : image.black} alt={name} />
        )}
      </div>

      <div css={styles.content}>
        <Text component="div" weight={Fonts.Weight.Bold} margin={{ bottom: 3 }}>
          {symbol}
        </Text>
        <Text component="div" type="secondary" textSize={12}>
          {tokenName}
        </Text>
      </div>

      <div css={styles.valueContainer}>
        <Text component="div" weight={Fonts.Weight.Bold} textSize={22}>
          {percentage}%
        </Text>

        {!!usdValue && (
          <Text component="div" type="secondary" textSize={12}>
            {formatCurrency({
              value: usdValue,
              currency: CurrencySymbol.USD,
            })}
          </Text>
        )}
      </div>
    </div>
  );
};

export default VaultAssetStacked;
