import * as React from "react";
import {
  AssetAllocation,
  DrTransactionInfo,
  DrVaultUserAction,
  SetId,
} from "../../../types/dr-vault";
import { DR_VAULTS } from "../../data/dr/dr-vaults";
import { subscribeToBlockUpdate } from "../../utils/web3/block-subscription";
import { getDrcBalance } from "../../utils/web3/drc-balance";
import { getDrcPrice } from "../../utils/web3/get-drc-price";
import { getTokensStoredPercentage } from "../../utils/web3/dr-vault/tokens-stored";
import { getUserDrTransactions } from "../../utils/web3/dr-vault/user-dr-transactions";
import { getUserPastDrEvents } from "../../utils/web3/dr-vault/user-past-dr-interactions";
import { getUserVaultInfo } from "../../utils/web3/dr-vault/user-vault-info";
import {
  defaultContextValue,
  DrContext,
  DrContextState,
  UserPastInteraction,
  UserVaultInfo,
  VaultState,
} from "./dr-context";
import { WalletConnected } from "./wallet-context";

interface DrProviderProps extends WalletConnected {
  setId: SetId;
}

const DrProvider: React.FC<DrProviderProps> = ({
  setId,
  children,
  ...walletInfo
}) => {
  const isArchived = DR_VAULTS[setId].isArchived;

  const [activeAction, setActiveDrAction] = React.useState<DrVaultUserAction>(
    isArchived ? "withdraw" : "deposit"
  );
  const [drcPrice, setDrcPrice] = React.useState<VaultState<number>>(
    defaultContextValue.drcPrice
  );
  const [drcBalance, setDrcBalance] = React.useState<VaultState<number>>(
    defaultContextValue.drcBalance
  );
  const [userVaultInfo, setUserVaultInfo] = React.useState<
    VaultState<UserVaultInfo>
  >(defaultContextValue.userVaultInfo);
  const [userPastInteraction, setUserPastInteraction] = React.useState<
    VaultState<UserPastInteraction>
  >(defaultContextValue.userPastInteraction);
  const [userTransactions, setUserTransactions] = React.useState<
    VaultState<DrTransactionInfo[]>
  >(defaultContextValue.userTransactions);
  const [vaultTokens, setVaultTokens] = React.useState<AssetAllocation[]>(
    defaultContextValue.vaultTokens
  );

  const { web3, userAccount, chainId } = walletInfo;
  const networkKey = chainId === 3 ? "ropsten" : "mainnet";
  const contractAddress = DR_VAULTS[setId].address[networkKey];

  const updateDrData = async () => {
    getDrcPrice({ web3, amount: 1, chainId }).then((price) => {
      setDrcPrice({
        loading: false,
        data: price !== null ? price : drcPrice.data || 0,
      });
    });

    getDrcBalance({ web3, userAccount, chainId }).then((balance) => {
      setDrcBalance({
        loading: false,
        data: balance !== null ? balance : drcBalance.data || 0,
      });
    });

    getUserVaultInfo({
      web3,
      userAccount,
      contractAddress,
    }).then((data) => {
      setUserVaultInfo({
        loading: false,
        data: data || userVaultInfo.data || undefined,
      });
    });

    getTokensStoredPercentage({
      web3,
      contractAddress,
      assets: DR_VAULTS[setId].allocations,
      chainId,
    }).then((data) => {
      setVaultTokens(data);
    });

    getUserPastDrEvents({
      web3,
      userAccount,
      contractAddress,
    }).then((data) => {
      setUserPastInteraction({
        loading: false,
        data: data || userPastInteraction.data || undefined,
      });
    });

    getUserDrTransactions({
      web3,
      userAccount,
      contractAddress,
      chainId,
    }).then((data) => {
      setUserTransactions({
        loading: false,
        data: data || userTransactions.data,
      });
    });
  };

  React.useEffect(() => {
    updateDrData();
    subscribeToBlockUpdate(web3, updateDrData);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        web3.eth.clearSubscriptions(() => {});
      } else {
        updateDrData();
        subscribeToBlockUpdate(web3, updateDrData);
      }
    });

    return () => {
      web3.eth.clearSubscriptions(() => {});
    };
  }, [userAccount, chainId]);

  const store: DrContextState = {
    setId,
    isArchived,
    contractAddress,
    appState: {
      activeAction,
      setActiveDrAction,
    },
    drcBalance,
    drcPrice,
    userVaultInfo,
    userPastInteraction,
    userTransactions,
    vaultTokens,
    updateDrData,
    ...walletInfo,
  };

  return <DrContext.Provider value={store}>{children}</DrContext.Provider>;
};

export default DrProvider;
