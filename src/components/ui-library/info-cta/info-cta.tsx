import * as React from "react";
import InfoIcon from "../../../images/icons/info-icon.svg";
import Image from "../image/image";
import Text from "../text/text";

import styles from "./info-cta.styles";

interface InfoCtaProps {
  size?: "medium" | "small";
  onClick: () => void;
}

const InfoCta: React.FC<InfoCtaProps> = ({ size, onClick, children }) => {
  return (
    <div
      role="button"
      aria-label="Open info"
      css={styles.shortDescription}
      onClick={onClick}
    >
      <Text
        component="div"
        textSize={size === "small" ? 14 : 16}
        type="secondary"
      >
        {children}
      </Text>
      <div css={styles.infoIcon}>
        <Image src={InfoIcon} alt="Info" />
      </div>
    </div>
  );
};

export default InfoCta;
