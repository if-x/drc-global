import * as React from "react";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import DrcNumberInput from "../../../../../ui-library/drc-number-input/drc-number-input";
import Text from "../../../../../ui-library/text/text";
import Heading from "../../../../../ui-library/text/heading";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../../../types/currency";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import Separator from "../../../../../ui-library/separator/separator";
import { DrcVaultContext } from "../../../../../../site-context/dr-context/drc-vault-context";
import styles from "./deposit-withdraw-action.styles";
import WithdrawButton from "./withdraw-button";
import ViewTransactionHistory from "./view-transaction-history";

const WithdrawToWallet: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);

  const {
    userVaultHolding: { data: holding },
    drcPrice: { data: drcPrice },
  } = React.useContext(DrcVaultContext);

  const usdValue =
    holding !== undefined && drcPrice ? holding * drcPrice : undefined;

  const handleWithdrawFinish = () => {
    setValue(0);
  };

  return (
    <div>
      <div css={styles.content}>
        <div css={styles.headingContainer}>
          <div css={styles.heading}>Your DRC Vault balance</div>
          <div css={styles.headingContent}>
            <MarginBox margin={{ bottom: grid(0.5) }}>
              <div css={styles.heading}>
                {formatNumber({
                  value: holding,
                })}{" "}
                DRC
              </div>
            </MarginBox>
            <Text component="div" type="secondary" textSize={14}>
              {formatCurrency({
                value: usdValue,
                currency: CurrencySymbol.USD,
              }) || "$-"}{" "}
              USD
            </Text>
          </div>
        </div>

        <Heading margin={{ bottom: grid(2.5) }}>Amount to Withdraw</Heading>

        <MarginBox margin={{ bottom: grid(3) }}>
          <DrcNumberInput
            value={value}
            onValueSet={setValue}
            max={holding || 0}
          />
        </MarginBox>

        <MarginBox margin={{ bottom: grid(3) }}>
          <WithdrawButton amount={value} onSuccess={handleWithdrawFinish} />
        </MarginBox>

        <Text
          component="div"
          textSize={14}
          weight={Fonts.Weight.Bold}
          css={styles.inlineContainer}
          margin={{ bottom: grid(2) }}
        >
          <span>Amount to receive</span>
          <span>
            {formatNumber({
              value,
            })}{" "}
            DRC
          </span>
        </Text>

        <Separator margin={{ bottom: grid(2) }} />

        <ViewTransactionHistory />
      </div>
    </div>
  );
};

export default WithdrawToWallet;
