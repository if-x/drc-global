import * as React from "react";
import Image from "../../image/image";
import InfoIcon from "../../../../images/icons/info-icon.svg";
import styles from "./info-card.styles";

interface InfoCardSmallProps {
  label: string;
  value: string;
  info?: {
    onClick: () => void;
  };
}

const InfoCardSmall: React.FC<InfoCardSmallProps> = ({
  label,
  value,
  info,
}) => {
  return (
    <div css={styles.cardSm}>
      <div css={styles.heading}>
        {label}
        {info && (
          <div css={styles.infoIcon} onClick={info.onClick}>
            <Image src={InfoIcon} alt="Info" />
          </div>
        )}
      </div>
      <div css={styles.value}>{value}</div>
    </div>
  );
};

export default InfoCardSmall;
