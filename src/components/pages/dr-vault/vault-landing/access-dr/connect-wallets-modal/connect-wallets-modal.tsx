import * as React from "react";
import { isIOS, isMobile } from "react-device-detect";
import MetaMaskLogo from "../../../../../../images/metamask.svg";
import WalletConnectLogo from "../../../../../../images/walletconnect-black.svg";
import CoinbaseWalletLogo from "../../../../../../images/coinbasewallet-black.svg";
import TrustWalletLogo from "../../../../../../images/trustwallet-black.svg";
import CopyIcon from "../../../../../../images/copy-black.svg";
import { WalletContext } from "../../../../../../site-context/dr-context/wallet-context";
import { Colors } from "../../../../../ui-library/design-tokens/colors";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import Modal from "../../../../../ui-library/modal/modal";
import Heading from "../../../../../ui-library/text/heading";
import Image from "../../../../../ui-library/image/image";
import Text from "../../../../../ui-library/text/text";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import { SetId } from "../../../../../../../types/dr-vault";
import { copyToClipboard } from "../../../../../../utils/dom/copy-to-clipboard";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import TransactionStatusToast from "../../../../../ui-library/transaction-status-toast/transaction-status-toast";
import styles from "./connect-wallets-modal.styles";

const URLS = {
  s1: "https://drcglobal.org/platform/dr-vault-s1/",
  s2: "https://drcglobal.org/platform/dr-vault-s2/",
  s3: "https://drcglobal.org/platform/dr-vault-s3/",
};

const METAMASK_WALLET_LINKS = {
  s1: "https://metamask.app.link/dapp/drcglobal.org/platform/dr-vault-s1/",
  s2: "https://metamask.app.link/dapp/drcglobal.org/platform/dr-vault-s2/",
  s3: "https://metamask.app.link/dapp/drcglobal.org/platform/dr-vault-s3/",
};

const TRUST_WALLET_LINKS = {
  s1: "https://link.trustwallet.com/open_url?coin_id=60&url=https://drcglobal.org/platform/dr-vault-s1/",
  s2: "https://link.trustwallet.com/open_url?coin_id=60&url=https://drcglobal.org/platform/dr-vault-s2/",
  s3: "https://link.trustwallet.com/open_url?coin_id=60&url=https://drcglobal.org/platform/dr-vault-s3/",
};

const COINBASE_WALLET_LINKS = {
  s1: "https://go.cb-w.com/i0Qa5Gzpbeb",
  s2: "https://go.cb-w.com/a5VHspBpbeb",
  s3: "https://go.cb-w.com/cCWgbY9Y3eb",
};

interface WalletInfoModalProps {
  setId: SetId;
  isOpen: boolean;
  onClose: () => void;
}

const WalletInfoModal: React.FC<WalletInfoModalProps> = ({
  setId,
  isOpen,
  onClose,
}) => {
  const [isCopied, setCopied] = React.useState<boolean>(false);

  const context = React.useContext(WalletContext);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCopied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  if (context.isConnected || context.loading) {
    return null;
  }

  const handleCopy = () => {
    copyToClipboard(URLS[setId]);
    setCopied(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Heading
          textAlign="center"
          css={{ color: Colors.Black }}
          margin={{ bottom: isMobile ? grid(2) : grid(4) }}
        >
          Connect Wallet
        </Heading>

        {isMobile && (
          <Text
            component="div"
            type="secondary"
            textAlign="center"
            margin={{ bottom: grid(4) }}
          >
            Please utilise your wallet’s built-in browser
          </Text>
        )}

        <div css={styles.container}>
          <a
            css={styles.item}
            href={
              isMobile
                ? METAMASK_WALLET_LINKS[setId]
                : "https://metamask.io/download.html"
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image src={MetaMaskLogo} alt="MetaMask" />
            <Text weight={Fonts.Weight.Bold}>MetaMask</Text>
          </a>

          {!isMobile && (
            <div
              css={styles.item}
              onClick={() => context.connectWalletConnect(onClose)}
            >
              <Image src={WalletConnectLogo} alt="WalletConnect" />
              <Text weight={Fonts.Weight.Bold}>WalletConnect</Text>
            </div>
          )}

          {isMobile && (
            <a
              css={styles.item}
              href={COINBASE_WALLET_LINKS[setId]}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={CoinbaseWalletLogo} alt="Coinbase" />
              <Text weight={Fonts.Weight.Bold}>Coinbase Wallet</Text>
            </a>
          )}

          {isMobile && (
            <a
              css={styles.item}
              href={TRUST_WALLET_LINKS[setId]}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={TrustWalletLogo} alt="Trust Wallet" />
              <Text weight={Fonts.Weight.Bold}>Trust Wallet</Text>
            </a>
          )}

          {isMobile && (
            <div css={styles.item} onClick={handleCopy}>
              <Image src={CopyIcon} alt="Copy" />
              <Text weight={Fonts.Weight.Bold}>Copy URL</Text>
            </div>
          )}
        </div>

        {isMobile && isIOS && (
          <MarginBox margin={{ top: grid(4) }}>
            <a
              href="https://link.trustwallet.com/browser_enable"
              target="_blank"
              rel="noreferrer"
            >
              <Text
                component="div"
                type="secondary"
                textSize={14}
                textAlign="center"
                css={{ textDecoration: "underline" }}
              >
                Tap to activate Trust Wallet’s App Browser
              </Text>
            </a>
          </MarginBox>
        )}
      </Modal>

      <TransactionStatusToast
        status={isCopied ? "success" : "none"}
        name="Copy"
        titleOverwrite="URL Copied!"
        message="Open your wallet’s built-in browser and paste"
        timeOut={2000}
      />
    </>
  );
};

export default WalletInfoModal;
