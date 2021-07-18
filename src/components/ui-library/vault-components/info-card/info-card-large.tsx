import * as React from "react";
import { grid } from "../../design-tokens/grid";
import MarginBox from "../../margin-box/margin-box";
import styles from "./info-card.styles";

interface InfoCardProps {
  label: string;
  value: string;
  secondaryLabel: string;
  secondaryValue: string;
}

const InfoCardLarge: React.FC<InfoCardProps> = ({
  label,
  value,
  secondaryLabel,
  secondaryValue,
}) => {
  return (
    <div css={(theme) => [styles.card(theme), styles.cardPadding]}>
      <MarginBox margin={{ bottom: grid(2) }}>
        <div css={styles.heading}>{label}</div>
        <div css={styles.value}>{value}</div>
      </MarginBox>

      <div css={styles.secondaryHeading}>{secondaryLabel}</div>
      <div css={styles.secondaryValue}>{secondaryValue}</div>
    </div>
  );
};

export default InfoCardLarge;
