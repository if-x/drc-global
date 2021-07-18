import * as React from "react";
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

  const depositInfo = (
    <InfoBox>
      <strong>Deposit fees:</strong> 0%
    </InfoBox>
  );

  return (
    <div>
      {!isMobile && (
        <>
          <div css={styles.deaktopHeadings}>
            <Heading textAlign="center">DRC in Wallet</Heading>
            <Heading textAlign="center">DRC in DRC Vault</Heading>
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
            DRC in DRC Vault
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
