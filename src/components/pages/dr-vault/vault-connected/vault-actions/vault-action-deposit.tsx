import * as React from "react";
import { DrContext } from "../../../../../site-context/dr-context/dr-context";
import { SiteContext } from "../../../../../site-context/site-context";
import { grid } from "../../../../ui-library/design-tokens/grid";
import InfoBox from "../../../../ui-library/info-box/info-box";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import Heading from "../../../../ui-library/text/heading";
import UserAssetsInVault from "./user-assets-in-vault/user-assets-in-vault";
import DepositFromWallet from "./deposit-withdraw-action/deposit-from-wallet";
import styles from "./vault-action.styles";

const VaultActionDeposit: React.FC = () => {
  const { isMobile } = React.useContext(SiteContext);
  const { setId } = React.useContext(DrContext);

  const depositInfo = (
    <InfoBox>
      <strong>Deposit fees:</strong> Uniswap LP ~0.6% | DRC Foundation: 0%
    </InfoBox>
  );

  return (
    <div>
      {!isMobile && (
        <>
          <div css={styles.deaktopHeadings}>
            <Heading textAlign="center">DRC in Wallet</Heading>
            <Heading textAlign="center">Assets in DR Vault {setId}</Heading>
          </div>

          <div css={styles.desktopContainer}>
            <DepositFromWallet />
            <UserAssetsInVault />
          </div>
          {depositInfo}
        </>
      )}

      {isMobile && (
        <>
          <Heading textAlign="center" margin={{ bottom: grid(2.5) }}>
            DRC in Wallet
          </Heading>
          <div css={styles.mobileContainer}>
            <DepositFromWallet />
          </div>
          <MarginBox margin={{ bottom: grid(3) }}>{depositInfo}</MarginBox>

          <Heading textAlign="center" margin={{ bottom: grid(2.5) }}>
            Assets in DR Vault {setId}
          </Heading>
          <div css={styles.mobileContainer}>
            <UserAssetsInVault />
          </div>
        </>
      )}
    </div>
  );
};

export default VaultActionDeposit;
