import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import localForage from "localforage";
import { ConnectionErrorType } from "../../../types/wallet";
import { LocalStorageKey } from "../../constants/local-storage";

export const getInjectedProvider = async () => {
  const provider: any = await detectEthereumProvider();

  if (!provider) {
    return {
      provider: null,
      errorType: "noInjectedProvider" as ConnectionErrorType,
    };
  }

  if (provider !== window.ethereum) {
    return {
      provider: null,
      errorType: "multipleWallet" as ConnectionErrorType,
    };
  }

  return {
    provider,
  };
};

export const getWeb3 = async () => {
  try {
    const { provider } = await getInjectedProvider();

    if (provider) {
      return new Web3(provider);
    }
  } catch (error) {
    console.error("Failed to connect to web3", error);
  }

  if (window.web3) {
    return window.web3;
  }

  return undefined;
};

const checkConnectionPreference = () => {
  return localForage.getItem<boolean>(LocalStorageKey.isWalletConnected);
};

export const setConnectionPreference = (isConnectPreferred: boolean) =>
  localForage.setItem(LocalStorageKey.isWalletConnected, isConnectPreferred);

const getChainId = async (web3: Web3): Promise<number> => {
  try {
    const chainId = await web3.eth.getChainId();

    return chainId || 1;
  } catch (error) {
    return 1;
  }
};

const getUserAccount = async (web3: Web3): Promise<string | undefined> => {
  try {
    const accounts = await web3.eth.getAccounts();

    if (accounts[0]) {
      return accounts[0];
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const getUserConnectionInfo = async (web3: Web3) => {
  const isConnectPreferred = await checkConnectionPreference();
  const chainId = await getChainId(web3);
  const account = await getUserAccount(web3);

  return {
    chainId,
    account: isConnectPreferred ? account : undefined,
  };
};

interface ConnectionInfoOutput {
  account: string;
  chainId: number;
}

export const connectWallet = async (
  web3?: Web3
): Promise<ConnectionInfoOutput | undefined> => {
  await setConnectionPreference(true);

  if (!web3) {
    return undefined;
  }

  const chainId = await getChainId(web3);
  const account = await getUserAccount(web3);

  if (account && chainId) {
    return {
      chainId,
      account,
    };
  }

  if (!window.ethereum) {
    return undefined;
  }

  const provider: any = window.ethereum;

  try {
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    if (accounts[0]) {
      return {
        chainId,
        account: accounts[0],
      };
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const connectWalletConnect = async () => {
  await setConnectionPreference(true);

  try {
    //  Create WalletConnect Provider
    const provider: any = new WalletConnectProvider({
      infuraId: "5baea93615bc4962a712f9f4af5c7cbb",
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
      pollingInterval: 60000,
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    const web3 = new Web3(provider);
    const { account, chainId } = await getUserConnectionInfo(web3);

    return { provider, web3, account, chainId };
  } catch (error) {
    console.error("Error connect WalletConnect", error);
    return null;
  }
};

type AccountChangeCallback = (account?: string) => void;

export const watchAccountChange = (
  provider: any,
  callback: AccountChangeCallback
) => {
  if (provider) {
    try {
      provider.on("accountsChanged", (accounts: string[]) => {
        callback(accounts[0]);
      });
    } catch (error) {
      console.error("Failed watching account change", error);
    }
  }
};

type ChainChangeCallback = (chainId?: number) => void;

export const watchChainChange = (
  provider: any,
  callback: ChainChangeCallback
) => {
  if (provider) {
    try {
      provider.on("chainChanged", (chainId: string) => {
        callback(Number(chainId));
      });
    } catch (error) {
      console.error("Failed watching chain change", error);
    }
  }
};
