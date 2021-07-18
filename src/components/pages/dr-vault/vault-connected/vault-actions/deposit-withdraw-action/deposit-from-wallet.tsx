import * as React from "react";
import LogoBlack from "../../../../../../images/logo-round-black.svg";
import LogoWhite from "../../../../../../images/logo-round-white.svg";
import { SiteContext } from "../../../../../../site-context/site-context";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import Dragger from "../../../../../ui-library/dragger/dragger";
import Image from "../../../../../ui-library/image/image";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import DrcNumberInput from "../../../../../ui-library/drc-number-input/drc-number-input";
import PercentagePicker from "../../../../../ui-library/percentage-picker/percentage-picker";
import Text from "../../../../../ui-library/text/text";
import { DrContext } from "../../../../../../site-context/dr-context/dr-context";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../../../types/currency";
import Heading from "../../../../../ui-library/text/heading";
import styles from "./deposit-withdraw-action.styles";
import DepositButton from "./deposit-button";
import ViewTransactionHistory from "./view-transaction-history";

const DepositFromWallet: React.FC = () => {
  const [percentage, setPercentage] = React.useState<number>(0);
  const [value, setValue] = React.useState<number>(0);

  const {
    drcBalance: { data: drcBalance = 0 },
    drcPrice: { data: price = 0 },
  } = React.useContext(DrContext);
  const { isDarkMode } = React.useContext(SiteContext);

  const logo = isDarkMode ? LogoWhite : LogoBlack;

  const handleSelectPercentage = (newPercentage: number) => {
    setPercentage(newPercentage);
    const newValue = Math.floor((drcBalance * newPercentage) / 100);
    setValue(newValue);
  };

  const handleInputDrc = (amount: number) => {
    setValue(amount);
    if (drcBalance === 0) {
      setPercentage(0);
    } else {
      const newPercentage = Math.round((amount / drcBalance) * 100);
      setPercentage(newPercentage);
    }
  };

  const handleDepositFinish = () => {
    setPercentage(0);
    setValue(0);
  };

  return (
    <div>
      <div css={styles.header}>
        <div css={styles.imageContainer}>
          <Image src={logo} alt="Logo" />
        </div>

        <div>
          <Text
            component="div"
            weight={Fonts.Weight.Bold}
            margin={{ bottom: 3 }}
          >
            Digital Reserve Currency
          </Text>
          <div css={styles.symbol}>DRC</div>
        </div>
      </div>

      <div css={styles.content}>
        <div css={styles.headingContainer}>
          <div css={styles.heading}>Your wallet balance</div>
          <div css={styles.headingContent}>
            <MarginBox margin={{ bottom: grid(0.5) }}>
              <div css={styles.heading}>
                {formatNumber({ value: drcBalance })}
              </div>
            </MarginBox>
            <Text component="div" type="secondary" textSize={14}>
              {formatCurrency({
                value: drcBalance * price,
                currency: CurrencySymbol.USD,
              })}
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

        <Heading margin={{ bottom: grid(2.5) }}>Amount to Deposit</Heading>

        <MarginBox margin={{ bottom: grid(2.5) }}>
          <DrcNumberInput
            value={value}
            onValueSet={handleInputDrc}
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

          {/* <Button css={{ width: "100%" }} type="primary" isDisabled={true}>
            FURTHER DEPOSITS PAUSED
          </Button> */}
        </MarginBox>

        <ViewTransactionHistory />
      </div>
    </div>
  );
};

export default DepositFromWallet;
