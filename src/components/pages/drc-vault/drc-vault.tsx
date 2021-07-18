import * as React from "react";
import DrcVaultProvider from "../../../site-context/dr-context/drc-vault-provider";
import { WalletContext } from "../../../site-context/dr-context/wallet-context";
import PageHeading from "../../modules/page-heading/page-heading";
import Container from "../../ui-library/container/container";
import { grid } from "../../ui-library/design-tokens/grid";
import Loader from "../../ui-library/loader/loader";
import MarginBox from "../../ui-library/margin-box/margin-box";
import VaultConnected from "./vault-connected/vault-connected";
import VaultLanding from "./vault-landing/vault-landing";

const DrcVault: React.FC = () => {
  const context = React.useContext(WalletContext);

  const isViewingVault =
    context.isConnected && context.isViewingVault && context.isAllowedUser;

  const showVaultLanding = !context.loading && !isViewingVault;

  return (
    <>
      <Container>
        <MarginBox
          margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
        >
          <PageHeading
            heading="DRC VAULT"
            subHeading="DIGITAL RESERVE CURRENCY VAULT"
          />
        </MarginBox>
      </Container>

      {context.loading && (
        <Container>
          <Loader height={160} />
        </Container>
      )}

      {showVaultLanding && (
        <Container>
          <VaultLanding />
        </Container>
      )}

      {context.isConnected && isViewingVault && (
        <Container fullWidthOnMobile={true}>
          <DrcVaultProvider {...context}>
            <VaultConnected />
          </DrcVaultProvider>
        </Container>
      )}
    </>
  );
};

export default DrcVault;
