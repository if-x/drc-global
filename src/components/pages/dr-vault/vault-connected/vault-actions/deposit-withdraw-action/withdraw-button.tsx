import * as React from "react";
import Button from "../../../../../ui-library/button/button";
import { DrContext } from "../../../../../../site-context/dr-context/dr-context";
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
import {
  estimateWithdrawPercentageGas,
  drVaultWithdrawPercentage,
} from "../../../../../../utils/web3/dr-vault/vault-actions/vault-withdraw-actions";
import {
  approveDrPodSpending,
  estimateDrPodApproveSpendingGas,
  getDrPodAllowance,
} from "../../../../../../utils/web3/dr-vault/vault-actions/dr-pod-withdraw-approval";
import { TransactionStatus } from "../../../../../../../types/dr-vault";
import styles from "./deposit-withdraw-action.styles";

interface WithdrawButtonProps {
  amountExpected: number;
  percentage: number;
  onSuccess: () => void;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({
  amountExpected,
  percentage,
  onSuccess,
}) => {
  const [approvalStatus, setApprovalStatus] =
    React.useState<TransactionStatus>("none");
  const [approvalTxHash, setApprovalTxHash] = React.useState<
    string | undefined
  >();
  const [withdrawalStatus, setWithdrawalStatus] =
    React.useState<TransactionStatus>("none");
  const [withdrawalTxHash, setWithdrawalTxHash] = React.useState<
    string | undefined
  >();

  const [allowance, setAllowance] = React.useState<number>(0);
  const [gasEstimation, setGasEstimation] = React.useState<number>(0);

  const {
    chainId,
    contractAddress,
    web3,
    userAccount,
    userVaultInfo,
    updateDrData,
  } = React.useContext(DrContext);

  const drPodBalance = userVaultInfo.data?.drPodBalance;
  const minAmountOut = Math.floor(amountExpected * 0.985);

  const queryAllowance = async () => {
    const contractAllowance = await getDrPodAllowance({
      web3,
      userAccount,
      contractAddress,
      chainId,
    });
    setAllowance(contractAllowance || 0);
  };

  React.useEffect(() => {
    queryAllowance();
  }, []);

  React.useEffect(() => {
    if (minAmountOut > 0 && percentage > 0 && drPodBalance) {
      if (drPodBalance > allowance) {
        estimateDrPodApproveSpendingGas({
          web3,
          userAccount,
          contractAddress,
          chainId,
        }).then((data) => setGasEstimation(data || 0));
      } else {
        estimateWithdrawPercentageGas({
          web3,
          userAccount,
          contractAddress,
          percentage,
          minAmountOut,
          chainId,
        }).then((data) => setGasEstimation(data || 0));
      }
    } else {
      setGasEstimation(0);
    }
  }, [minAmountOut, percentage, allowance || 0]);

  const handleApproval = async () => {
    if (
      approvalStatus !== "pending" &&
      drPodBalance &&
      drPodBalance > allowance
    ) {
      setWithdrawalStatus("none");
      setWithdrawalTxHash(undefined);
      setApprovalStatus("pending");
      const { success } = await approveDrPodSpending({
        web3,
        userAccount,
        contractAddress,
        onTxHash: setApprovalTxHash,
        chainId,
      });
      if (success) {
        await queryAllowance();
        setApprovalStatus("success");
      } else {
        setApprovalStatus("failed");
      }
    }
  };

  const handleWithdraw = async () => {
    if (amountExpected > 0) {
      setWithdrawalStatus("pending");

      const data = await drVaultWithdrawPercentage({
        web3,
        userAccount,
        contractAddress,
        percentage,
        minAmountOut,
        chainId,
        onTxHash: setWithdrawalTxHash,
      });
      if (data.success) {
        updateDrData();
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

  const formattedAmount = formatNumber({ value: amountExpected });

  const approvalMessageMapping: Record<TransactionStatus, string> = {
    none: `Approve ${formattedAmount} DR-POD`,
    pending:
      "Please wait a moment, or check on Etherscan if this hangs for too long",
    success: "You can now withdraw DRC",
    failed: "Please try approve again",
  };

  const withdrawMessageMapping: Record<TransactionStatus, string> = {
    none: `Withdraw ${formattedAmount} DRC`,
    pending:
      "Please wait a moment, or check on Etherscan if this hangs for too long",
    success: "DRC successfully withdrawn",
    failed: "Please try withdrawing again",
  };

  if (!drPodBalance) {
    return (
      <Button css={styles.button} type="primary">
        NO DR-POD TO WITHDRAW
      </Button>
    );
  }

  return (
    <>
      <div css={{ display: "flex", alignItems: "center" }}>
        {drPodBalance > allowance && (
          <Button
            css={{ width: "calc(50% - 10px)", marginRight: grid(2) }}
            type="primary"
            isDisabled={approvalStatus === "pending"}
            onClick={handleApproval}
            isLoading={approvalStatus === "pending"}
          >
            APPROVE
          </Button>
        )}

        <Button
          css={{
            width: drPodBalance <= allowance ? "100%" : "calc(50% - 10px)",
          }}
          type="primary"
          isDisabled={
            withdrawalStatus === "pending" ||
            drPodBalance > allowance ||
            !drPodBalance
          }
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
        status={approvalStatus}
        name="Approval"
        message={approvalMessageMapping[approvalStatus]}
        url={
          approvalTxHash
            ? getTransactionUrl(approvalTxHash, chainId)
            : undefined
        }
      />

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
