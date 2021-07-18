import { Link } from "gatsby";
import * as React from "react";
import ChevronBlackIcon from "../../../images/icons/chevron-icon-black.svg";
import ChevronWhiteIcon from "../../../images/icons/chevron-icon-white.svg";
import { SiteContext } from "../../../site-context/site-context";
import Image from "../image/image";
import styles from "./back.styles";

interface BackProps {
  url: string;
  label: string;
}

const Back: React.FC<BackProps> = ({ url, label }) => {
  const { isDarkMode } = React.useContext(SiteContext);
  const chevronIcon = isDarkMode ? ChevronWhiteIcon : ChevronBlackIcon;

  return (
    <Link to={url} css={styles.root}>
      <div css={styles.iconContainer}>
        <Image css={styles.chevron} src={chevronIcon} alt="Chevron icon" />
      </div>
      {label}
    </Link>
  );
};

export default Back;
