import * as React from "react";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import DrcNumberInput from "../../../../../ui-library/drc-number-input/drc-number-input";
import Text from "../../../../../ui-library/text/text";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../../../types/currency";
import Heading from "../../../../../ui-library/text/heading";
import { DrcVaultContext } from "../../../../../../site-context/dr-context/drc-vault-context";
import styles from "./deposit-withdraw-action.styles";
import DepositButton from "./deposit-button";
import ViewTransactionHistory from "./view-transaction-history";

const DepositFromWallet: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);

  const {
    drcBalance: { data: drcBalance = 0 },
    drcPrice: { data: price = 0 },
  } = React.useContext(DrcVaultContext);

  const handleDepositFinish = () => {
    setValue(0);
  };

  return (
    <div>
      <div css={styles.content}>
        <div css={styles.headingContainer}>
          <div css={styles.heading}>Your wallet balance</div>
          <div css={styles.headingContent}>
            <MarginBox margin={{ bottom: grid(0.5) }}>
              <div css={styles.heading}>
                {formatNumber({ value: drcBalance })} DRC
              </div>
            </MarginBox>
            <Text component="div" type="secondary" textSize={14}>
              {formatCurrency({
                value: drcBalance * price,
                currency: CurrencySymbol.USD,
              })}{" "}
              USD
            </Text>
          </div>
        </div>

        <Heading margin={{ bottom: grid(2.5) }}>Amount to Deposit</Heading>

        <MarginBox margin={{ bottom: grid(2.5) }}>
          <DrcNumberInput
            value={value}
            onValueSet={setValue}
            max={drcBalance}
          />
        </MarginBox>

        <Text
          component="div"
          type="secondary"
          textSize={14}
          textAlign="center"
          margin={{ bottom: grid(0.5) }}
        >
          Equivalent USD Value
        </Text>

        <Text
          component="div"
          textAlign="center"
          weight={Fonts.Weight.Bold}
          margin={{ bottom: grid(3) }}
        >
          {formatCurrency({
            value: value * price,
            currency: CurrencySymbol.USD,
          })}
        </Text>

        <MarginBox margin={{ bottom: grid(2.5) }}>
          <DepositButton
            amount={value}
            approveAmount={drcBalance}
            onSuccess={handleDepositFinish}
          />
        </MarginBox>

        <ViewTransactionHistory />
      </div>
    </div>
  );
};

export default DepositFromWallet;
