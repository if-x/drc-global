import * as React from "react";
import { DrcVaultContext } from "../../../../site-context/dr-context/drc-vault-context";
import { getAddressUrl } from "../../../../utils/etherscan";
import Container from "../../../ui-library/container/container";
import { grid } from "../../../ui-library/design-tokens/grid";
import LinkOut from "../../../ui-library/link-out/link-out";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Separator from "../../../ui-library/separator/separator";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import VaultInfo from "../vault-info/vault-info";
import ManageYourDr from "./manage-your-vault/manage-your-vault";
import UserVaultOverview from "./user-vault-overview/user-vault-overview";

const VaultConnected: React.FC = () => {
  const { chainId, contractAddress } = React.useContext(DrcVaultContext);

  return (
    <div>
      <MarginBox margin={{ bottom: grid(4) }}>
        <UserVaultOverview />
      </MarginBox>

      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <ManageYourDr />
      </MarginBox>

      <Container>
        <MarginBox
          margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(4) } }}
        >
          <VaultInfo />
        </MarginBox>

        <Separator
          margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(4) } }}
        />

        <Heading textAlign="center" margin={{ bottom: grid(2) }}>
          DRC Vault Smart Contract Address
        </Heading>

        <LinkOut url={getAddressUrl(contractAddress, chainId)} isCenter={true}>
          <span css={{ wordBreak: "break-word" }}>{contractAddress}</span>
        </LinkOut>

        <Text
          component="div"
          textSize={12}
          textAlign="center"
          margin={{ top: grid(2) }}
        >
          <strong>IMPORTANT</strong>: DO NOT DIRECTLY SEND DRC TO THIS SMART
          CONTRACT ADDRESS.
          <br />
          YOU MUST APPROVE DEPOSITS AND INTERACT WITHIN THE DRC VAULT APP.
        </Text>
      </Container>
    </div>
  );
};

export default VaultConnected;
