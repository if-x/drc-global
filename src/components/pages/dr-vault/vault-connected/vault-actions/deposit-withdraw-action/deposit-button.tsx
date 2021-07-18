import * as React from "react";
import Button from "../../../../../ui-library/button/button";
import { DrContext } from "../../../../../../site-context/dr-context/dr-context";
import {
  approveDrcSpending,
  estimateDrcApproveSpendingGas,
  getDrcAllowance,
} from "../../../../../../utils/web3/drc-approval";
import {
  estimateDepositGas,
  getDepositPriceImpact,
  drVaultDeposit,
} from "../../../../../../utils/web3/dr-vault/vault-actions/vault-deposit-actions";
import { getTransactionUrl } from "../../../../../../utils/etherscan";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import InfoCta from "../../../../../ui-library/info-cta/info-cta";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import TransactionStatusToast from "../../../../../ui-library/transaction-status-toast/transaction-status-toast";
import Text from "../../../../../ui-library/text/text";
import { CurrencySymbol } from "../../../../../../../types/currency";
import { TransactionStatus } from "../../../../../../../types/dr-vault";
import SlideOutPriceImpactInfo from "./price-impact-info/price-impact-info";
import styles from "./deposit-withdraw-action.styles";

interface DepositButtonProps {
  amount: number;
  approveAmount: number;
  onSuccess: () => void;
}

const DepositButton: React.FC<DepositButtonProps> = ({
  amount,
  approveAmount,
  onSuccess,
}) => {
  const [approvalStatus, setApprovalStatus] =
    React.useState<TransactionStatus>("none");
  const [approvalTxHash, setApprovalTxHash] = React.useState<
    string | undefined
  >();
  const [depositStatus, setDepositStatus] =
    React.useState<TransactionStatus>("none");
  const [depositTxHash, setDepositTxHash] = React.useState<
    string | undefined
  >();

  const [allowance, setAllowance] = React.useState<number>(0);
  const [priceImpact, setPriceImpact] = React.useState<number>(0);
  const [gasEstimation, setGasEstimation] = React.useState<number>(0);
  const [isPriceImpactInfoOpen, setPriceImpactInfoOpen] =
    React.useState<boolean>(false);

  const {
    chainId,
    contractAddress,
    web3,
    userAccount,
    drcBalance: { data: drcBalance = 0 },
    updateDrData,
  } = React.useContext(DrContext);

  React.useEffect(() => {
    getDepositPriceImpact({
      web3,
      contractAddress,
      amount,
    }).then((impact = 0) => {
      if (impact) {
        setPriceImpact(impact);
      }
    });
  }, [amount]);

  React.useEffect(() => {
    if (amount > 0) {
      if (amount > allowance) {
        estimateDrcApproveSpendingGas({
          web3,
          userAccount,
          contractAddress,
          amount: approveAmount,
          chainId,
        }).then((data) => setGasEstimation(data || 0));
      } else {
        estimateDepositGas({
          web3,
          userAccount,
          contractAddress,
          amount,
        }).then((data) => setGasEstimation(data || 0));
      }
    } else {
      setGasEstimation(0);
    }
  }, [amount, allowance]);

  const queryAllowance = async () => {
    const contractAllowance = await getDrcAllowance({
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

  const handleApproval = async () => {
    if (approvalStatus !== "pending" && amount > 0 && amount > allowance) {
      setDepositStatus("none");
      setDepositTxHash(undefined);
      setApprovalStatus("pending");
      const { success } = await approveDrcSpending({
        web3,
        userAccount,
        contractAddress,
        amount: approveAmount,
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

  const handleDeposit = async () => {
    if (depositStatus !== "pending" && amount > 0 && allowance >= amount) {
      setApprovalStatus("none");
      setApprovalTxHash(undefined);
      setDepositStatus("pending");
      const { success } = await drVaultDeposit({
        web3,
        userAccount,
        contractAddress,
        amount,
        onTxHash: setDepositTxHash,
      });
      if (success) {
        setDepositStatus("success");
        updateDrData();
        onSuccess();
      } else {
        setDepositStatus("failed");
      }
    }
  };

  const formattedAmount = formatNumber({ value: amount });

  const approvalMessageMapping: Record<TransactionStatus, string> = {
    none: `Approve ${formattedAmount} DRC`,
    pending:
      "Please wait a moment, or check on Etherscan if this hangs for too long",
    success: "You can now deposit DRC",
    failed: "Please try approve again",
  };

  const depositMessageMapping: Record<TransactionStatus, string> = {
    none: `Deposit ${formattedAmount} DRC`,
    pending:
      "Please wait a moment, or check on Etherscan if this hangs for too long",
    success: `DRC successfully deposited`,
    failed: "Please try depositing again",
  };

  if (drcBalance === 0 || amount > drcBalance) {
    return (
      <Button css={styles.button} type="primary">
        INSUFFICIENT DRC
      </Button>
    );
  }

  return (
    <>
      <div css={{ display: "flex", alignItems: "center" }}>
        {amount > allowance && (
          <Button
            css={{ width: "calc(50% - 10px)", marginRight: grid(2) }}
            type="primary"
            isDisabled={
              approvalStatus === "pending" ||
              amount <= allowance ||
              amount === 0
            }
            onClick={handleApproval}
            isLoading={approvalStatus === "pending"}
          >
            APPROVE
          </Button>
        )}

        <Button
          css={{ width: amount <= allowance ? "100%" : "calc(50% - 10px)" }}
          type="primary"
          isDisabled={
            depositStatus === "pending" || amount > allowance || amount === 0
          }
          onClick={handleDeposit}
          isLoading={depositStatus === "pending"}
        >
          {depositStatus === "pending" ? "PENDING DEPOSIT" : "DEPOSIT"}
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

      {priceImpact > 2 && (
        <MarginBox margin={{ top: grid(2.5), bottom: grid(3) }}>
          <InfoCta onClick={() => setPriceImpactInfoOpen(true)}>
            Asset price impact is more than 2%
          </InfoCta>
        </MarginBox>
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
        status={depositStatus}
        name="Deposit"
        message={depositMessageMapping[depositStatus]}
        url={
          depositTxHash ? getTransactionUrl(depositTxHash, chainId) : undefined
        }
      />

      <SlideOutPriceImpactInfo
        isOpen={isPriceImpactInfoOpen}
        onClose={() => setPriceImpactInfoOpen(false)}
      />
    </>
  );
};

export default DepositButton;
