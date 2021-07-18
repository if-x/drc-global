import * as React from "react";
import { DrContext } from "../../../../site-context/dr-context/dr-context";
import { getAddressUrl } from "../../../../utils/etherscan";
import Container from "../../../ui-library/container/container";
import { grid } from "../../../ui-library/design-tokens/grid";
import LinkOut from "../../../ui-library/link-out/link-out";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Heading from "../../../ui-library/text/heading";
import ManageYourDr from "./manage-your-dr/manage-your-dr";
import UserVaultOverview from "./user-vault-overview/user-vault-overview";
import UserVaultSnapshot from "./user-vault-snapshot/user-vault-snapshot";

const VaultConnected: React.FC = () => {
  const { chainId, contractAddress } = React.useContext(DrContext);

  return (
    <div>
      <MarginBox margin={{ bottom: grid(4) }}>
        <UserVaultOverview />
      </MarginBox>

      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <Container>
          <UserVaultSnapshot />
        </Container>
      </MarginBox>

      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <ManageYourDr />
      </MarginBox>

      <Heading textAlign="center" margin={{ bottom: grid(2) }}>
        DR Smart Contract Address
      </Heading>

      <LinkOut url={getAddressUrl(contractAddress, chainId)} isCenter={true}>
        <span css={{ wordBreak: "break-word" }}>{contractAddress}</span>
      </LinkOut>
    </div>
  );
};

export default VaultConnected;
