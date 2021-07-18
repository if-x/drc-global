import * as React from "react";
import Web3 from "web3";
import { ConnectionErrorType } from "../../../types/wallet";
import {
  connectWallet,
  getInjectedProvider,
  getWeb3,
  watchAccountChange,
  getUserConnectionInfo,
  watchChainChange,
  setConnectionPreference,
  connectWalletConnect,
} from "../../utils/web3/wallets-helper";
import {
  WalletConnected,
  WalletContext,
  WalletLoading,
  WalletNotConnected,
} from "./wallet-context";

const WalletProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isConnected, setConnected] = React.useState<boolean>(false);
  const [connectionErrorType, setConnectionErrorType] =
    React.useState<ConnectionErrorType>("noInjectedProvider");
  const [chainId, setChainId] = React.useState<number>();
  const [userAccount, setUserAccount] = React.useState<string>();
  const [isAllowedUser] = React.useState<boolean>(true);
  const [isViewingVault, setViewingVault] = React.useState<boolean>(false);
  const [web3, setWeb3] = React.useState<Web3>();
  const [provider, setProvider] = React.useState<any>();

  const handleSetAccount = async (account: string) => {
    setUserAccount(account);
    // const queryParams = getUrlParams();
    // if (isLaunched) {
    //   setAllowedUser(true);
    // } else {
    //   if (queryParams?.enableTest === "true") {
    //     setAllowedUser(true);
    //   } else {
    //     nft holder check here
    //   }
    // }
  };

  const setupState = async () => {
    const { provider: injectedProvider, errorType } =
      await getInjectedProvider();

    if (injectedProvider) {
      setProvider(injectedProvider);
    }

    const injectedWeb3 = await getWeb3();

    if (injectedWeb3) {
      setWeb3(injectedWeb3);
      const connectionInfo = await getUserConnectionInfo(injectedWeb3);

      setLoading(false);
      setChainId(connectionInfo.chainId);

      if (connectionInfo.account) {
        handleSetAccount(connectionInfo.account);

        if (connectionInfo.chainId === 1 || connectionInfo.chainId === 3) {
          setConnected(true);
        } else {
          setConnected(false);
          setConnectionErrorType("chainNotSupported");
        }
      } else {
        setConnected(false);
        setConnectionErrorType("noAccount");
      }
    } else if (errorType) {
      setLoading(false);
      setConnectionErrorType(errorType);
    }
  };

  React.useEffect(() => {
    setupState();
  }, []);

  React.useEffect(() => {
    if (provider) {
      watchAccountChange(provider, (newAccount) => {
        if (newAccount) {
          handleSetAccount(newAccount);
          setConnected(true);
        } else {
          setConnected(false);
          setConnectionErrorType("noAccount");
        }
      });

      watchChainChange(provider, (newChainId) => {
        if (newChainId) {
          setChainId(newChainId);

          if (newChainId === 1 || newChainId === 3) {
            setConnected(true);
          } else {
            setConnected(false);
            setConnectionErrorType("chainNotSupported");
          }
        } else {
          setConnected(false);
          setConnectionErrorType("chainNotSupported");
        }
      });
    }
  }, [provider]);

  const handleConnectWallet = async () => {
    const data = await connectWallet(web3);
    if (data) {
      setViewingVault(true);
      handleSetAccount(data.account);
      setChainId(data.chainId);

      if (data.chainId === 1 || data.chainId === 3) {
        setConnected(true);
      } else {
        setConnected(false);
        setConnectionErrorType("chainNotSupported");
      }
    } else {
      setConnected(false);
      setConnectionErrorType("noAccount");
    }
  };

  const handleConnectWalletConnect = async (callback?: () => void) => {
    const data = await connectWalletConnect();

    if (callback) {
      callback();
    }

    if (data) {
      setProvider(data.provider);
      setWeb3(data.web3);

      if (data.account) {
        handleSetAccount(data.account);
        setChainId(data.chainId);

        if (data.chainId === 1 || data.chainId === 3) {
          setConnected(true);
        } else {
          setConnected(false);
          setConnectionErrorType("chainNotSupported");
        }
      } else {
        setConnected(false);
        setConnectionErrorType("noAccount");
      }
    } else {
      setConnected(false);
      setConnectionErrorType("noInjectedProvider");
    }
  };

  const handleDisconnectWallet = async () => {
    await setConnectionPreference(false);
    setConnected(false);
    setConnectionErrorType("noAccount");
    setViewingVault(false);
    if (provider && provider.disconnect) {
      provider.disconnect();
      setConnectionErrorType("noInjectedProvider");
    }
  };

  const storeLoading: WalletLoading = { loading: true, isConnected: false };

  const storeNotConnected: WalletNotConnected = {
    loading: false,
    isConnected: false,
    chainId,
    web3,
    connectionErrorType,
    connectWallet: handleConnectWallet,
    connectWalletConnect: handleConnectWalletConnect,
  };

  const storeConnected: WalletConnected = {
    loading: false,
    isConnected: true,
    chainId: chainId!,
    userAccount: userAccount!,
    isAllowedUser,
    web3: web3!,
    disconnectWallet: handleDisconnectWallet,
    isViewingVault,
    setViewingVault,
  };

  const store = loading
    ? storeLoading
    : !isConnected
    ? storeNotConnected
    : storeConnected;

  return (
    <WalletContext.Provider value={store}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
