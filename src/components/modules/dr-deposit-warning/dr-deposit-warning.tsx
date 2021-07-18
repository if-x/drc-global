import * as React from "react";
import { Fonts } from "../../ui-library/design-tokens/fonts";
import { grid } from "../../ui-library/design-tokens/grid";
import Heading from "../../ui-library/text/heading";
import Text from "../../ui-library/text/text";
import styles from "./dr-deposit-warning.styles";

const DrDepositWarning: React.FC = () => {
  return (
    <div css={styles.root}>
      <Heading margin={{ bottom: grid(2) }}>
        Important announcement for s1 and s3 DR Vaults
      </Heading>

      <Text
        component="div"
        weight={Fonts.Weight.Bold}
        margin={{ bottom: grid(2) }}
      >
        Withdrawals can be made anytime, although further deposits are now
        paused.
      </Text>

      <Text component="div" textSize={14} margin={{ bottom: grid(2) }}>
        The assets for s1 and s3 DR Vaults are routed through Uniswap v2
        liquidity and during the period of Uniswap v2 and v3 migration, it’s
        uncertain whether all of the projects will remain on Uniswap v2 or move
        to v3. If they move, then the s1 and s3 DR Vaults may experience
        liquidity issues.
      </Text>

      <Text component="div" textSize={14} margin={{ bottom: grid(2) }}>
        Further, there are unclear regulatory guidelines for DeFi investment
        protocols at present and this may present a challenge for s1 and s3 DR
        Vaults compliance.
      </Text>

      <Text
        component="div"
        textSize={14}
        weight={Fonts.Weight.Bold}
        css={{ fontStyle: "italic" }}
      >
        Please note that the upgraded DR Vault s2 will remain active and
        available to DR users as it contains highly liquid assets and does not
        constitute an investment proposal. DRC Vault will also remain available
        to DR users and allows secure storage of DRC tokens and incentives for
        DRC holders.
      </Text>
    </div>
  );
};

export default DrDepositWarning;
