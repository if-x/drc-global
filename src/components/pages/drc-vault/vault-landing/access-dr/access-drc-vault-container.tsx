import * as React from "react";
import { WalletContext } from "../../../../../site-context/dr-context/wallet-context";
import { ChainNames } from "../../../../../constants/chain-id";
import Back from "../../../../ui-library/breadcrumb/back";
import { grid } from "../../../../ui-library/design-tokens/grid";
import DrCard from "../../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import Heading from "../../../../ui-library/text/heading";
import Badge from "../../../../ui-library/badge/badge";
import styles from "./access-drc-vault.styles";

const AccessDrcVaultContainer: React.FC = ({ children }) => {
  const context = React.useContext(WalletContext);

  if (context.loading) {
    return null;
  }

  const { chainId } = context;

  return (
    <div css={styles.root}>
      <div css={styles.back}>
        <Back url="/platform/" label="DR Vaults" />
      </div>

      <DrCard>
        <Heading component="h2" textAlign="center" margin={{ bottom: grid(2) }}>
          Access Your DRC Vault Dashboard
        </Heading>

        <div css={styles.badge}>
          {(chainId === 1 || chainId === 3) && (
            <Badge>{ChainNames[chainId]}</Badge>
          )}
        </div>

        <MarginBox margin={{ bottom: grid(3) }}>
          <div css={styles.text}>Deposit and Withdraw DRC</div>
        </MarginBox>

        {children}
      </DrCard>
    </div>
  );
};

export default AccessDrcVaultContainer;
