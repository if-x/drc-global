import * as React from "react";
import { WalletContext } from "../../../../../site-context/dr-context/wallet-context";
import Button from "../../../../ui-library/button/button";
import { grid } from "../../../../ui-library/design-tokens/grid";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import LinkOut from "../../../../ui-library/link-out/link-out";
import { getAddressUrl } from "../../../../../utils/etherscan";
import AccessDrcVaultContainer from "./access-drc-vault-container";
import styles from "./access-drc-vault.styles";

const AccessDrcVault: React.FC = () => {
  const context = React.useContext(WalletContext);

  if (!context.isConnected || context.loading) {
    return null;
  }

  const { chainId, userAccount, setViewingVault, isAllowedUser } = context;

  return (
    <AccessDrcVaultContainer>
      {isAllowedUser ? (
        <>
          <Button
            css={styles.button}
            type="primary"
            onClick={() => setViewingVault(true)}
          >
            ACCESS YOUR DRC VAULT
          </Button>

          <MarginBox margin={{ top: grid(3) }}>
            <LinkOut url={getAddressUrl(userAccount, chainId)} isCenter={true}>
              {userAccount.slice(0, 10)}...{userAccount.slice(-8)}
            </LinkOut>
          </MarginBox>
        </>
      ) : (
        <>
          <Button css={styles.button} type="primary">
            PRIVATE BETA ACCESS ONLY
          </Button>

          <MarginBox margin={{ top: grid(3) }}>
            <LinkOut url="https://drc.foundation/fund/#nft" isCenter={true}>
              Only GEN00 NFT holders currently have access
            </LinkOut>
          </MarginBox>
        </>
      )}
    </AccessDrcVaultContainer>
  );
};

export default AccessDrcVault;
