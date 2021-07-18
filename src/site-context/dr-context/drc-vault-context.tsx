import * as React from "react";
import Web3 from "web3";
import {
  DrcVaultTransactionInfo,
  DrVaultUserAction,
} from "../../../types/dr-vault";
import { drcVaultAddress } from "../../data/dr/dr-contract-addresses";

export interface VaultState<T> {
  loading: boolean;
  data?: T;
}

export interface DrcVaultContextState {
  chainId: number;
  contractAddress: string;
  userAccount: string;
  web3: Web3;
  appState: {
    activeAction: DrVaultUserAction;
    setActiveDrAction: (actionType: DrVaultUserAction) => void;
  };
  disconnectWallet: () => void;
  drcBalance: VaultState<number>;
  drcPrice: VaultState<number>;
  userVaultHolding: VaultState<number>;
  totalVaultHolding: VaultState<number>;
  userTransactions: VaultState<DrcVaultTransactionInfo[]>;
  updateVaultData: () => Promise<void>;
}

export const defaultContextValue: DrcVaultContextState = {
  chainId: 1,
  contractAddress: drcVaultAddress.mainnet,
  userAccount: "0x0",
  web3: new Web3(),
  appState: {
    activeAction: "deposit",
    setActiveDrAction: () => undefined,
  },
  disconnectWallet: () => undefined,
  drcBalance: {
    loading: true,
  },
  drcPrice: {
    loading: true,
  },
  userVaultHolding: {
    loading: true,
  },
  totalVaultHolding: {
    loading: true,
  },
  userTransactions: {
    loading: true,
  },
  updateVaultData: async () => undefined,
};

export const DrcVaultContext =
  React.createContext<DrcVaultContextState>(defaultContextValue);
