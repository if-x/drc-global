import * as React from "react";
import styles from "./info-card.styles";

interface InfoCardProps {
  isNoPadding?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ isNoPadding, children }) => {
  return (
    <div
      css={(theme) => [styles.card(theme), !isNoPadding && styles.cardPadding]}
    >
      {children}
    </div>
  );
};

export default InfoCard;
