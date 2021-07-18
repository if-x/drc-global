import * as React from "react";
import Web3 from "web3";
import { ConnectionErrorType } from "../../../types/wallet";

export interface WalletLoading {
  loading: true;
  isConnected: false;
}

export interface WalletNotConnected {
  loading: false;
  isConnected: false;
  chainId?: number;
  web3?: Web3;
  connectionErrorType: ConnectionErrorType;
  connectWallet: () => void;
  connectWalletConnect: (callback?: () => void) => void;
}

export interface WalletConnected {
  loading: false;
  isConnected: true;
  chainId: number;
  userAccount: string;
  isAllowedUser: boolean;
  web3: Web3;
  disconnectWallet: () => void;
  isViewingVault: boolean;
  setViewingVault: (isViewingVault: boolean) => void;
}

export type WalletContext =
  | WalletLoading
  | WalletNotConnected
  | WalletConnected;

export const defaultContextValue: WalletContext = {
  loading: true,
  isConnected: false,
};

export const WalletContext =
  React.createContext<WalletContext>(defaultContextValue);
