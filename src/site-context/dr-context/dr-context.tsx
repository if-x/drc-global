import * as React from "react";
import Web3 from "web3";
import {
  AssetAllocation,
  DrTransactionInfo,
  DrVaultUserAction,
  SetId,
} from "../../../types/dr-vault";
import { drContractAddresses } from "../../data/dr/dr-contract-addresses";
import { DR_VAULTS } from "../../data/dr/dr-vaults";

export interface VaultState<T> {
  loading: boolean;
  data?: T;
}

export interface UserVaultInfo {
  drPodBalance: number;
  drPodBalanceInWei: string;
  userHoldingUsd: number;
  totalWorthInDrc: number;
  totalDrcCanWithdraw: number;
  withdrawalFee: number;
  feePercentage: number;
}

export interface UserPastInteraction {
  lastDepositedAmount: number;
  lastDepositedUsdWorth: number;
  totalDepositAmount: number;
  totalDepositUsdWorth: number;
  totalWidthdrawAmount: number;
  totalWidthdrawUsdWorth: number;
}

export interface DrContextState {
  setId: SetId;
  isArchived?: boolean;
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
  vaultTokens: AssetAllocation[];
  userVaultInfo: VaultState<UserVaultInfo>;
  userPastInteraction: VaultState<UserPastInteraction>;
  userTransactions: VaultState<DrTransactionInfo[]>;
  updateDrData: () => Promise<void>;
}

export const defaultContextValue: DrContextState = {
  setId: "s1",
  chainId: 1,
  contractAddress: drContractAddresses.mainnet.s1,
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
  userVaultInfo: {
    loading: true,
  },
  userPastInteraction: {
    loading: true,
  },
  userTransactions: {
    loading: true,
  },
  vaultTokens: DR_VAULTS.s1.allocations,
  updateDrData: async () => undefined,
};

export const DrContext =
  React.createContext<DrContextState>(defaultContextValue);
