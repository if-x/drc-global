import * as React from "react";
import { SiteContext } from "../../../../site-context/site-context";
import LogoBlack from "../../../../images/logo-round-black.svg";
import LogoWhite from "../../../../images/logo-round-white.svg";
import { grid } from "../../../ui-library/design-tokens/grid";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import DrCard from "../../../ui-library/vault-components/dr-card/dr-card";
import Image from "../../../ui-library/image/image";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Button from "../../../ui-library/button/button";
import styles from "./drc-vault-card.styles";
import DrcVaultSnapshot from "./drc-vault-snapshot/drc-vault-snapshot";

const DrcVaultCard: React.FC = () => {
  const { isDarkMode } = React.useContext(SiteContext);
  const logo = isDarkMode ? LogoWhite : LogoBlack;

  return (
    <DrCard>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(1.5) }}>
        DRC Vault
      </Heading>

      <Text component="div" type="secondary" margin={{ bottom: grid(3) }}>
        Deposit and Withdraw DRC
      </Text>

      <div css={styles.imageContainer}>
        <Image css={styles.image} src={logo} alt="Logo" />
      </div>

      <MarginBox margin={{ bottom: grid(4) }}>
        <DrcVaultSnapshot />
      </MarginBox>

      <div css={styles.buttonContainer}>
        <Button type="primary" to="/platform/drc-vault/" css={styles.button}>
          LAUNCH APP
        </Button>
      </div>
    </DrCard>
  );
};

export default DrcVaultCard;
