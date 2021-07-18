import * as React from "react";
import { SetId } from "../../../../../../types/dr-vault";
import { ConnectionErrorType } from "../../../../../../types/wallet";
import { WalletContext } from "../../../../../site-context/dr-context/wallet-context";
import Button from "../../../../ui-library/button/button";
import styles from "./access-dr.styles";
import AccessDrContainer from "./access-dr-container";
import WalletInfoModal from "./connect-wallets-modal/connect-wallets-modal";

const buttonTextMapping: Record<ConnectionErrorType, string> = {
  noInjectedProvider: "CONNECT WALLET",
  multipleWallet: "MULTIPLE WALLETS DETECTED",
  noAccount: "CONNECT WALLET",
  chainNotSupported: "NETWORK NOT SUPPORTED",
};

interface ConnectWalletProps {
  setId: SetId;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setId }) => {
  const context = React.useContext(WalletContext);

  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  if (context.isConnected || context.loading) {
    return null;
  }

  const { connectionErrorType } = context;
  const handleClick = () => {
    if (connectionErrorType === "noAccount") {
      context.connectWallet();
    }
    if (connectionErrorType === "noInjectedProvider") {
      // Open modal
      setModalOpen(true);
    }
  };

  return (
    <AccessDrContainer setId={setId}>
      <Button css={styles.button} type="primary" onClick={handleClick}>
        {buttonTextMapping[connectionErrorType]}
      </Button>

      {connectionErrorType === "multipleWallet" && (
        <div css={styles.extraInfo}>
          Multiple wallet instance is detected in your browser
        </div>
      )}

      {connectionErrorType === "chainNotSupported" && (
        <div css={styles.extraInfo}>
          The network set in your wallet is not supported
        </div>
      )}

      <WalletInfoModal
        setId={setId}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </AccessDrContainer>
  );
};

export default ConnectWallet;
