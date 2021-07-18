import * as React from "react";
import { drcVaultAddress } from "../../../../data/dr/dr-contract-addresses";
import { WalletContext } from "../../../../site-context/dr-context/wallet-context";
import { getAddressUrl } from "../../../../utils/etherscan";
import { grid } from "../../../ui-library/design-tokens/grid";
import LinkOut from "../../../ui-library/link-out/link-out";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Separator from "../../../ui-library/separator/separator";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import DrcVaultPerformanceGraph from "../drc-vault-performance-graph/drc-vault-performance-graph";
import VaultInfo from "../vault-info/vault-info";
import AccessDrcVault from "./access-dr/access-drc-vault";
import ConnectWallet from "./access-dr/connect-wallet";

const VaultLanding: React.FC = () => {
  const context = React.useContext(WalletContext);

  const chainId = !context.loading ? context.chainId : 1;
  const networkKey = chainId === 3 ? "ropsten" : "mainnet";
  const contractAddress = drcVaultAddress[networkKey];

  return (
    <div>
      <MarginBox margin={{ bottom: grid(4) }}>
        {!context.isConnected && <ConnectWallet />}
        {context.isConnected && <AccessDrcVault />}
      </MarginBox>

      <MarginBox margin={{ bottom: grid(6) }}>
        <VaultInfo />
      </MarginBox>

      <MarginBox
        margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(6) } }}
      >
        <DrcVaultPerformanceGraph contractAddress={contractAddress} />
      </MarginBox>

      <Heading textAlign="center" margin={{ bottom: grid(3) }}>
        What is the DRC Vault?
      </Heading>

      <Text component="div" type="secondary" margin={{ bottom: grid(2) }}>
        DRC Vault is a secure non-custodial and 100% decentralized application
        created specifically for DRC holders. DRC tokens held in the DRC Vault
        remain completely under the user’s control and ownership, with nobody
        else able to access the funds.
      </Text>
      <Text
        component="div"
        type="secondary"
        margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(4) } }}
      >
        The DRC Vault features an intuitive interface allowing easy deposits and
        withdrawals, a leaderboard and performance statistics. Additional
        benefits may be available to the DRC Vault users in the future.
      </Text>

      <Separator
        margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(4) } }}
      />

      <Heading textAlign="center" margin={{ bottom: grid(2) }}>
        DRC Vault Smart Contract Address
      </Heading>

      <LinkOut
        url={getAddressUrl(
          contractAddress,
          (!context.loading ? context.chainId : 1) || 1
        )}
        isCenter={true}
      >
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
    </div>
  );
};

export default VaultLanding;
