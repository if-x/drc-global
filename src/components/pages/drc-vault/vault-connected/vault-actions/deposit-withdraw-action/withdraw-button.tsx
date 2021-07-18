import * as React from "react";
import Button from "../../../../../ui-library/button/button";
import { getTransactionUrl } from "../../../../../../utils/etherscan";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import { DR_OVERVIEW } from "../../../../../../constants/elements";
import { anchorToElement } from "../../../../../../utils/dom/anchor-to-hash";
import TransactionStatusToast from "../../../../../ui-library/transaction-status-toast/transaction-status-toast";
import Text from "../../../../../ui-library/text/text";
import { CurrencySymbol } from "../../../../../../../types/currency";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import { TransactionStatus } from "../../../../../../../types/dr-vault";
import { DrcVaultContext } from "../../../../../../site-context/dr-context/drc-vault-context";
import {
  drcVaultWithdraw,
  estimateWithdrawGas,
} from "../../../../../../utils/web3/drc-vault/vault-actions/vault-withdraw-actions";
import styles from "./deposit-withdraw-action.styles";

interface WithdrawButtonProps {
  amount: number;
  onSuccess: () => void;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({
  amount,
  onSuccess,
}) => {
  const [withdrawalStatus, setWithdrawalStatus] =
    React.useState<TransactionStatus>("none");
  const [withdrawalTxHash, setWithdrawalTxHash] = React.useState<
    string | undefined
  >();

  const [gasEstimation, setGasEstimation] = React.useState<number>(0);

  const {
    chainId,
    contractAddress,
    web3,
    userAccount,
    userVaultHolding: { data: holding },
    updateVaultData,
  } = React.useContext(DrcVaultContext);

  React.useEffect(() => {
    if (amount > 0) {
      estimateWithdrawGas({
        web3,
        userAccount,
        contractAddress,
        amount,
      }).then((data) => setGasEstimation(data || 0));
    }
  }, [amount]);

  const handleWithdraw = async () => {
    if (amount > 0) {
      setWithdrawalStatus("pending");

      const data = await drcVaultWithdraw({
        web3,
        userAccount,
        contractAddress,
        amount,
        onTxHash: setWithdrawalTxHash,
      });
      if (data.success) {
        updateVaultData();
        onSuccess();
        setWithdrawalStatus("success");

        setTimeout(() => {
          anchorToElement(DR_OVERVIEW);
        }, 2000);
      } else {
        setWithdrawalStatus("failed");
      }
    }
  };

  const formattedAmount = formatNumber({ value: amount });

  const withdrawMessageMapping: Record<TransactionStatus, string> = {
    none: `Withdraw ${formattedAmount} DRC`,
    pending:
      "Please wait a moment, or check on Etherscan if this hangs for too long",
    success: "DRC successfully withdrawn",
    failed: "Please try withdrawing again",
  };

  if (!holding) {
    return (
      <Button css={styles.button} type="primary">
        NO DRC TO WITHDRAW
      </Button>
    );
  }

  return (
    <>
      <div css={{ display: "flex", alignItems: "center" }}>
        <Button
          css={styles.button}
          type="primary"
          isDisabled={withdrawalStatus === "pending" || amount > holding}
          onClick={handleWithdraw}
          isLoading={withdrawalStatus === "pending"}
        >
          {withdrawalStatus === "pending" ? "PENDING WITHDRAWAL" : "WITHDRAW"}
        </Button>
      </div>

      {gasEstimation > 0 && (
        <Text
          component="div"
          type="secondary"
          textSize={12}
          textAlign="center"
          margin={{ top: grid(1.5) }}
        >
          Estimated transaction gas fee:{" "}
          {formatCurrency({
            value: gasEstimation,
            currency: CurrencySymbol.USD,
          })}
        </Text>
      )}

      <TransactionStatusToast
        status={withdrawalStatus}
        name="Withdrawal"
        message={withdrawMessageMapping[withdrawalStatus]}
        url={
          withdrawalTxHash
            ? getTransactionUrl(withdrawalTxHash, chainId)
            : undefined
        }
      />
    </>
  );
};

export default WithdrawButton;
