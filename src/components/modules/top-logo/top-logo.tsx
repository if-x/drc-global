import * as React from "react";
import Image from "../../ui-library/image/image";
import LogoWhite from "../../../images/drc-logo-white.svg";
import LogoBlack from "../../../images/drc-logo-black.svg";
import { SiteContext } from "../../../site-context/site-context";
import styles from "./top-logo.styles";

const TopLogo: React.FC = () => {
  const { isDarkMode } = React.useContext(SiteContext);

  const logo = isDarkMode ? LogoWhite : LogoBlack;

  return (
    <div css={styles.logoContainer}>
      <Image
        src={logo}
        css={styles.logo}
        alt="DIGITAL RESERVE CURRENCY"
        turnOffLazyLoading={true}
      />
    </div>
  );
};

export default TopLogo;
