import * as React from "react";
import { ConnectionErrorType } from "../../../../../../types/wallet";
import { WalletContext } from "../../../../../site-context/dr-context/wallet-context";
import Button from "../../../../ui-library/button/button";
import styles from "./access-drc-vault.styles";
import AccessDrcVaultContainer from "./access-drc-vault-container";
import WalletInfoModal from "./connect-wallets-modal/connect-wallets-modal";

const buttonTextMapping: Record<ConnectionErrorType, string> = {
  noInjectedProvider: "CONNECT WALLET",
  multipleWallet: "MULTIPLE WALLETS DETECTED",
  noAccount: "CONNECT WALLET",
  chainNotSupported: "NETWORK NOT SUPPORTED",
};

const ConnectWallet: React.FC = () => {
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
    <AccessDrcVaultContainer>
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
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </AccessDrcVaultContainer>
  );
};

export default ConnectWallet;
