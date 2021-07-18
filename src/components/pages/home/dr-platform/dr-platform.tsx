import * as React from "react";
import Button from "../../../ui-library/button/button";
import { grid } from "../../../ui-library/design-tokens/grid";
import DrCard from "../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Heading from "../../../ui-library/text/heading";
import styles from "./dr-platform.styles";

const DrPlatform: React.FC = () => {
  return (
    <DrCard>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(2) }}>
        Digital Reserve Platform
      </Heading>

      <MarginBox margin={{ bottom: grid(3) }}>
        <div css={styles.text}>
          Hedge the markets by depositing DRC into Vaults
        </div>
      </MarginBox>

      <Button css={styles.button} to="/platform/">
        VIEW VAULTS
      </Button>
    </DrCard>
  );
};

export default DrPlatform;
