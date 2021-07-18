import * as React from "react";
import { DrContext } from "../../../../../site-context/dr-context/dr-context";
import { SiteContext } from "../../../../../site-context/site-context";
import { grid } from "../../../../ui-library/design-tokens/grid";
import InfoBox from "../../../../ui-library/info-box/info-box";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import Heading from "../../../../ui-library/text/heading";
import UserAssetsInVault from "./user-assets-in-vault/user-assets-in-vault";
import styles from "./vault-action.styles";
import WithdrawToWallet from "./deposit-withdraw-action/withdraw-to-wallet";

const VaultActionWithdraw: React.FC = () => {
  const { isMobile } = React.useContext(SiteContext);
  const {
    setId,
    userVaultInfo: { data },
  } = React.useContext(DrContext);

  const withdrawalInfo = (
    <InfoBox>
      <strong>Withdrawal fees:</strong> Uniswap LP ~0.6% | DRC Foundation:{" "}
      {data?.feePercentage || 1}%
    </InfoBox>
  );

  return (
    <div>
      {!isMobile && (
        <>
          <div css={styles.deaktopHeadings}>
            <Heading textAlign="center">Assets in DR Vault {setId}</Heading>
            <Heading textAlign="center">Withdraw DRC to Wallet</Heading>
          </div>

          <div css={styles.desktopContainer}>
            <UserAssetsInVault />
            <WithdrawToWallet />
          </div>
          {withdrawalInfo}
        </>
      )}

      {isMobile && (
        <>
          <Heading textAlign="center" margin={{ bottom: grid(2.5) }}>
            Withdraw DRC to Wallet
          </Heading>
          <div css={styles.mobileContainer}>
            <WithdrawToWallet />
          </div>
          <MarginBox margin={{ bottom: grid(3) }}>{withdrawalInfo}</MarginBox>

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

export default VaultActionWithdraw;
