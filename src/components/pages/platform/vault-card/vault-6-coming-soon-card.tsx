import * as React from "react";
import Button from "../../../ui-library/button/button";
import { Fonts } from "../../../ui-library/design-tokens/fonts";
import { grid } from "../../../ui-library/design-tokens/grid";
import DrCard from "../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Separator from "../../../ui-library/separator/separator";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import styles from "./vault-card.styles";

const Vault6ComingSoonCard: React.FC = () => {
  return (
    <DrCard>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(1.5) }}>
        DR Vault s6
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

      <Separator margin={{ bottom: grid(6.5) }} />

      <Text component="div" type="secondary" margin={{ bottom: 67 }}>
        Interest bearing asset yet to be confirmed and is under community
        discussion.
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

export default Vault6ComingSoonCard;
