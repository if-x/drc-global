import * as React from "react";
import {
  DrcVaultTransactionInfo,
  DrVaultUserAction,
} from "../../../types/dr-vault";
import { drcVaultAddress } from "../../data/dr/dr-contract-addresses";
import { useCoinPrice } from "../../hooks/query-hooks/use-coin-price";
import { subscribeToBlockUpdate } from "../../utils/web3/block-subscription";
import { getDrcBalance } from "../../utils/web3/drc-balance";
import { getDrcVaultTotal } from "../../utils/web3/drc-vault/drc-vault-total";
import { getUserDrcVaultHolding } from "../../utils/web3/drc-vault/user-drc-vault-holding";
import { getUserDrcVaultTransactions } from "../../utils/web3/drc-vault/user-drc-vault-transactions";
import {
  defaultContextValue,
  DrcVaultContext,
  DrcVaultContextState,
  VaultState,
} from "./drc-vault-context";
import { WalletConnected } from "./wallet-context";

const DrcVaultProvider: React.FC<WalletConnected> = ({
  children,
  ...walletInfo
}) => {
  const [activeAction, setActiveDrAction] =
    React.useState<DrVaultUserAction>("deposit");

  const [drcBalance, setDrcBalance] = React.useState<VaultState<number>>(
    defaultContextValue.drcBalance
  );
  const [userVaultHolding, setUserVaultHolding] = React.useState<
    VaultState<number>
  >(defaultContextValue.userVaultHolding);
  const [totalVaultHolding, setTotalVaultHolding] = React.useState<
    VaultState<number>
  >(defaultContextValue.totalVaultHolding);
  const [userTransactions, setUserTransactions] = React.useState<
    VaultState<DrcVaultTransactionInfo[]>
  >(defaultContextValue.userTransactions);

  const { web3, userAccount, chainId } = walletInfo;
  const networkKey = chainId === 3 ? "ropsten" : "mainnet";
  const contractAddress = drcVaultAddress[networkKey];

  const drcPriceData = useCoinPrice({
    id: "digital-reserve-currency",
  });
  const drcPrice: VaultState<number> = {
    loading: drcPriceData.loading,
    data: drcPriceData.data?.usd,
  };

  const updateDrcVaultData = async () => {
    getDrcBalance({ web3, userAccount, chainId }).then((balance) => {
      setDrcBalance({
        loading: false,
        data: balance !== null ? balance : drcBalance.data || 0,
      });
    });

    getUserDrcVaultHolding({
      web3,
      userAccount,
      contractAddress,
      force: true,
    }).then((holding) => {
      setUserVaultHolding({
        loading: false,
        data: holding !== null ? holding : userVaultHolding.data,
      });
    });

    getDrcVaultTotal({
      web3,
      contractAddress,
      force: true,
    }).then((holding) => {
      setTotalVaultHolding({
        loading: false,
        data: holding !== null ? holding : totalVaultHolding.data,
      });
    });

    getUserDrcVaultTransactions({
      web3,
      userAccount,
      contractAddress,
    }).then((data) => {
      setUserTransactions({
        loading: false,
        data: data || userTransactions.data,
      });
    });
  };

  React.useEffect(() => {
    updateDrcVaultData();
    subscribeToBlockUpdate(web3, updateDrcVaultData);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        web3.eth.clearSubscriptions(() => {});
      } else {
        updateDrcVaultData();
        subscribeToBlockUpdate(web3, updateDrcVaultData);
      }
    });

    return () => {
      web3.eth.clearSubscriptions(() => {});
    };
  }, [userAccount, chainId]);

  const store: DrcVaultContextState = {
    contractAddress,
    appState: {
      activeAction,
      setActiveDrAction,
    },
    drcBalance,
    drcPrice,
    userVaultHolding,
    totalVaultHolding,
    userTransactions,
    updateVaultData: updateDrcVaultData,
    ...walletInfo,
  };

  return (
    <DrcVaultContext.Provider value={store}>
      {children}
    </DrcVaultContext.Provider>
  );
};

export default DrcVaultProvider;
