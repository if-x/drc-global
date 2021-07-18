import * as React from "react";
import DRCSeal from "../../../images/drc-seal.svg";
import Image from "../../ui-library/image/image";
import styles from "./seal.styles";

const Seal: React.FC = () => {
  return (
    <div css={styles.root}>
      <div css={styles.separator} />
      <div css={styles.imageContainer}>
        <Image src={DRCSeal} alt="DRC Seal" css={styles.image} />
      </div>
      <div css={styles.separator} />
    </div>
  );
};

export default Seal;
