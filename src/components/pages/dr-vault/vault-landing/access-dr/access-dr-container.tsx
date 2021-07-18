import * as React from "react";
import { SetId } from "../../../../../../types/dr-vault";
import { WalletContext } from "../../../../../site-context/dr-context/wallet-context";
import { ChainNames } from "../../../../../constants/chain-id";
import Back from "../../../../ui-library/breadcrumb/back";
import { grid } from "../../../../ui-library/design-tokens/grid";
import DrCard from "../../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import Heading from "../../../../ui-library/text/heading";
import Badge from "../../../../ui-library/badge/badge";
import { DR_VAULTS } from "../../../../../data/dr/dr-vaults";
import styles from "./access-dr.styles";

const urlMapping: Record<SetId, string> = {
  s1: "/platform/",
  s2: "/platform/",
  s3: "/platform/?drVaultType=alternate",
};

interface AccessDrContainerProps {
  setId: SetId;
}

const AccessDrContainer: React.FC<AccessDrContainerProps> = ({
  setId,
  children,
}) => {
  const context = React.useContext(WalletContext);

  if (context.loading) {
    return null;
  }

  const { chainId } = context;
  const { isArchived } = DR_VAULTS[setId];

  return (
    <div css={styles.root}>
      <div css={styles.back}>
        <Back url={urlMapping[setId]} label="DR Vaults" />
      </div>

      <DrCard>
        <Heading component="h2" textAlign="center" margin={{ bottom: grid(2) }}>
          Access Your DR Vault {setId} Dashboard
        </Heading>

        <div css={styles.badge}>
          {(chainId === 1 || chainId === 3) && (
            <Badge>{ChainNames[chainId]}</Badge>
          )}
        </div>

        <MarginBox margin={{ bottom: grid(3) }}>
          <div css={styles.text}>
            {!isArchived ? "Deposit and Withdraw DRC" : "Please withdraw DRC"}
          </div>
        </MarginBox>

        {children}
      </DrCard>
    </div>
  );
};

export default AccessDrContainer;
