import * as React from "react";
import DrLogo from "../../../../images/dr-platform-logo-standalone-white.svg";
import Image from "../../image/image";
import styles from "./slide-out-header.styles";

interface SlideOutHeaderProps {
  heading: string;
  onClose: () => void;
}

const SlideOutHeader: React.FC<SlideOutHeaderProps> = ({
  heading,
  onClose,
}) => {
  return (
    <div css={styles.root}>
      <div css={styles.logo}>
        <Image src={DrLogo} alt="DR Logo" />
      </div>

      <div css={styles.heading}>{heading}</div>

      <div css={styles.closeButton} onClick={onClose}>
        Close
      </div>
    </div>
  );
};

export default SlideOutHeader;
