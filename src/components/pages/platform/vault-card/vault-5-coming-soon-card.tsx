import * as React from "react";
import Button from "../../../ui-library/button/button";
import { Fonts } from "../../../ui-library/design-tokens/fonts";
import { grid } from "../../../ui-library/design-tokens/grid";
import DrCard from "../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Separator from "../../../ui-library/separator/separator";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import VaultAssetStacked from "../../../ui-library/vault-components/vault-asset-stacked/vault-asset-stacked";
import AUsdcIconBlack from "../../../../images/dr-asset-icons/black/ausdc.svg";
import AUsdcIconWhite from "../../../../images/dr-asset-icons/white/ausdc.svg";
import styles from "./vault-card.styles";

const Vault5ComingSoonCard: React.FC = () => {
  return (
    <DrCard>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(1.5) }}>
        DR Vault s5
      </Heading>

      <MarginBox margin={{ bottom: grid(3.5) }}>
        <div css={styles.text}>Active development and security audit</div>
      </MarginBox>

      <Text
        component="div"
        weight={Fonts.Weight.Bold}
        margin={{ bottom: grid(2) }}
      >
        Portfolio Allocation
      </Text>

      <VaultAssetStacked
        name="AAVE USD Coin"
        tokenName="AAVE USD Coin"
        symbol="aUSDC"
        percentage={100}
        image={{
          black: AUsdcIconBlack,
          white: AUsdcIconWhite,
        }}
        hasBorder={true}
      />

      <Separator margin={{ bottom: grid(2) }} />

      <Text
        component="div"
        type="secondary"
        textSize={14}
        margin={{ bottom: 2 }}
      >
        Total Value Locked
      </Text>

      <Text
        component="div"
        textSize={18}
        weight={Fonts.Weight.Bold}
        margin={{ bottom: grid(2) }}
      >
        $-
      </Text>

      <Separator margin={{ bottom: grid(3) }} />

      <MarginBox margin={{ bottom: grid(3) }}>
        <Text component="div" type="secondary" textAlign="center">
          Capital Appreciation
        </Text>
      </MarginBox>

      <Button css={styles.button}>Coming in Q2</Button>
    </DrCard>
  );
};

export default Vault5ComingSoonCard;
