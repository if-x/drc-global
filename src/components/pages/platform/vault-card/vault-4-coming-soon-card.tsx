import * as React from "react";
import Button from "../../../ui-library/button/button";
import { Fonts } from "../../../ui-library/design-tokens/fonts";
import { grid } from "../../../ui-library/design-tokens/grid";
import DrCard from "../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Separator from "../../../ui-library/separator/separator";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import VaultAssetStackedComingSoon from "../../../ui-library/vault-components/vault-asset-stacked/vault-asset-stacked-coming-soon";
import { communityLinks } from "../../../../data/resource-links";
import styles from "./vault-card.styles";

const Vault4ComingSoonCard: React.FC = () => {
  return (
    <DrCard>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(1.5) }}>
        DR Vault s4
      </Heading>

      <MarginBox margin={{ bottom: grid(3.5) }}>
        <div css={styles.text}>Still in proposal stage</div>
      </MarginBox>

      <Text
        component="div"
        weight={Fonts.Weight.Bold}
        margin={{ bottom: grid(2) }}
      >
        Portfolio Allocation
      </Text>

      <VaultAssetStackedComingSoon hasBorder={true} />
      <VaultAssetStackedComingSoon hasBorder={true} />
      <VaultAssetStackedComingSoon hasBorder={true} />

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
        <a href={communityLinks.discord.url} target="_blank" rel="noreferrer">
          <Text type="secondary" css={{ textDecoration: "underline" }}>
            Submit your portfolio allocation proposal for DR Vault s4 in Discord
          </Text>
        </a>
      </MarginBox>

      <Button css={styles.button}>COMING SOON</Button>
    </DrCard>
  );
};

export default Vault4ComingSoonCard;
