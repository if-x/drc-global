import * as React from "react";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import Dragger from "../../../../../ui-library/dragger/dragger";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import DrcNumberInput from "../../../../../ui-library/drc-number-input/drc-number-input";
import PercentagePicker from "../../../../../ui-library/percentage-picker/percentage-picker";
import Text from "../../../../../ui-library/text/text";
import { DrContext } from "../../../../../../site-context/dr-context/dr-context";
import Heading from "../../../../../ui-library/text/heading";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../../../types/currency";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import Separator from "../../../../../ui-library/separator/separator";
import styles from "./deposit-withdraw-action.styles";
import WithdrawButton from "./withdraw-button";
import ViewTransactionHistory from "./view-transaction-history";

const WithdrawToWallet: React.FC = () => {
  const [percentage, setPercentage] = React.useState<number>(0);
  const [value, setValue] = React.useState<number>(0);

  const {
    setId,
    userVaultInfo: { data },
  } = React.useContext(DrContext);

  const totalWorth = data?.totalWorthInDrc || 0;
  const feePercentage = data?.feePercentage || 1;

  const uniswapFee = Math.floor(value * 0.006);
  const withdrawalFee = Math.floor(
    (value - uniswapFee) * (feePercentage / 100)
  );
  const realWithdrawAmount = Math.round(
    (value - uniswapFee) * (1 - feePercentage / 100)
  );

  const handleSelectPercentage = (newPercentage: number) => {
    setPercentage(newPercentage);
    const newValue = Math.floor((totalWorth * newPercentage) / 100);
    setValue(newValue);
  };

  const handleInputDrc = (amount: number) => {
    setValue(amount);
    if (totalWorth === 0) {
      setPercentage(0);
    } else {
      const newPercentage = Math.ceil((amount / totalWorth) * 100);
      setPercentage(newPercentage);
    }
  };

  const handleDepositFinish = () => {
    setPercentage(0);
    setValue(0);
  };

  return (
    <div>
      <div css={styles.content}>
        <div css={styles.headingContainer}>
          <div css={styles.heading}>Your DR Vault {setId} balance</div>
          <div css={styles.headingContent}>
            <MarginBox margin={{ bottom: grid(0.5) }}>
              <div css={styles.heading}>
                {formatCurrency({
                  value: data?.userHoldingUsd,
                  currency: CurrencySymbol.USD,
                }) || "$-"}
              </div>
            </MarginBox>
            <Text component="div" type="secondary" textSize={14}>
              {formatNumber({
                value: totalWorth,
              })}{" "}
              DRC
            </Text>
          </div>
        </div>

        <div css={styles.percentage}>{percentage}%</div>

        <MarginBox margin={{ bottom: grid(2.5) }}>
          <Dragger percentage={percentage} onDragged={handleSelectPercentage} />
        </MarginBox>

        <MarginBox margin={{ bottom: grid(4) }}>
          <PercentagePicker
            percentage={percentage}
            onSelect={handleSelectPercentage}
          />
        </MarginBox>

        <Heading margin={{ bottom: grid(2.5) }}>Amount to Withdraw</Heading>

        <MarginBox margin={{ bottom: grid(3) }}>
          <DrcNumberInput
            value={value}
            onValueSet={handleInputDrc}
            max={totalWorth}
          />
        </MarginBox>

        <MarginBox margin={{ bottom: grid(3) }}>
          <WithdrawButton
            amountExpected={realWithdrawAmount}
            percentage={percentage}
            onSuccess={handleDepositFinish}
          />
        </MarginBox>

        <Text
          component="div"
          textSize={14}
          weight={Fonts.Weight.Bold}
          css={styles.inlineContainer}
          margin={{ bottom: grid(1) }}
        >
          <span>Estimated to receive</span>
          <span>
            {formatNumber({
              value: realWithdrawAmount,
            })}{" "}
            DRC
          </span>
        </Text>
        <Text
          component="div"
          textSize={14}
          css={styles.inlineContainer}
          margin={{ bottom: grid(2) }}
        >
          <span>Minimum to receive</span>
          <span>
            {formatNumber({
              value: Math.floor(realWithdrawAmount * 0.985),
            })}{" "}
            DRC
          </span>
        </Text>

        <Separator margin={{ bottom: grid(2) }} />

        <Text
          component="div"
          textSize={12}
          type="secondary"
          css={styles.inlineContainer}
          margin={{ bottom: grid(1.5) }}
        >
          <span>Uniswap LP</span>
          <span>
            ~0.6% (~
            {formatNumber({
              value: uniswapFee,
            })}{" "}
            DRC)
          </span>
        </Text>

        <Text
          component="div"
          textSize={12}
          type="secondary"
          css={styles.inlineContainer}
          margin={{ bottom: grid(3) }}
        >
          <span>Withdrawal fee</span>
          <span>
            1% (~
            {formatNumber({
              value: withdrawalFee,
            })}{" "}
            DRC)
          </span>
        </Text>

        <ViewTransactionHistory />
      </div>
    </div>
  );
};

export default WithdrawToWallet;
