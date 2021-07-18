import * as React from "react";
import { CurrencySymbol } from "../../../../../types/currency";
import { AssetAllocation } from "../../../../../types/dr-vault";
import { useTokenLiquidity } from "../../../../hooks/query-hooks/use-token-liquidity";
import { SiteContext } from "../../../../site-context/site-context";
import { formatCurrency } from "../../../../utils/format-number";
import { Fonts } from "../../design-tokens/fonts";
import { grid } from "../../design-tokens/grid";
import Image from "../../image/image";
import Text from "../../text/text";
import styles from "./vault-asset-item.styles";

interface VaultAssetItemProps extends AssetAllocation {
  showLiquidity?: boolean;
}

const VaultAssetItem: React.FC<VaultAssetItemProps> = ({
  name,
  tokenName,
  symbol,
  percentage,
  image,
  address,
  showLiquidity,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);

  const { data } = useTokenLiquidity(address.mainnet);

  return (
    <div css={styles.root}>
      <div css={styles.imageContainer}>
        <Image src={isDarkMode ? image.white : image.black} alt={name} />
      </div>

      <Text component="div" weight={Fonts.Weight.Bold} margin={{ bottom: 3 }}>
        {symbol}
      </Text>

      <Text
        component="div"
        type="secondary"
        textSize={12}
        margin={{ bottom: grid(1.5) }}
      >
        {tokenName}
      </Text>

      <Text
        component="div"
        textSize={22}
        weight={Fonts.Weight.Bold}
        margin={{ bottom: grid(0.5) }}
      >
        {percentage}%
      </Text>

      {showLiquidity && (
        <>
          <hr css={styles.separator} />

          <Text
            component="div"
            type="secondary"
            textSize={12}
            margin={{ bottom: grid(0.5) }}
          >
            Uniswap V2 Liquidity
          </Text>

          <Text
            component="div"
            textSize={14}
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(0.5) }}
          >
            {data
              ? formatCurrency({
                  value: data,
                  currency: CurrencySymbol.USD,
                  round: 0,
                })
              : "$-"}
          </Text>
        </>
      )}
    </div>
  );
};

export default VaultAssetItem;
