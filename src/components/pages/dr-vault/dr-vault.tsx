import * as React from "react";
import { SetId } from "../../../../types/dr-vault";
import { DR_VAULTS } from "../../../data/dr/dr-vaults";
import DrProvider from "../../../site-context/dr-context/dr-provider";
import { WalletContext } from "../../../site-context/dr-context/wallet-context";
import PageHeading from "../../modules/page-heading/page-heading";
import Container from "../../ui-library/container/container";
import { grid } from "../../ui-library/design-tokens/grid";
import Loader from "../../ui-library/loader/loader";
import MarginBox from "../../ui-library/margin-box/margin-box";
import VaultConnected from "./vault-connected/vault-connected";
import VaultLanding from "./vault-landing/vault-landing";

interface DrVaultProps {
  setId: SetId;
}

const DrVault: React.FC<DrVaultProps> = ({ setId }) => {
  const context = React.useContext(WalletContext);

  const isViewingVault =
    context.isConnected && context.isViewingVault && context.isAllowedUser;

  const showVaultLanding = !context.loading && !isViewingVault;
  const { isArchived } = DR_VAULTS[setId];

  return (
    <>
      <Container>
        <MarginBox
          margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
        >
          <PageHeading
            heading={`DR VAULT ${setId.toUpperCase()}`}
            subHeading={
              !isArchived ? "DEPOSIT DRC TOKENS INTO DR VAULTS" : "WITHDRAW DRC"
            }
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
          <VaultLanding setId={setId} />
        </Container>
      )}

      {context.isConnected && isViewingVault && (
        <Container fullWidthOnMobile={true}>
          <DrProvider setId={setId} {...context}>
            <VaultConnected />
          </DrProvider>
        </Container>
      )}
    </>
  );
};

export default DrVault;
