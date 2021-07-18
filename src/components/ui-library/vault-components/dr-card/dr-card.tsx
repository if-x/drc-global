import * as React from "react";
import LogoBlack from "../../../../images/dr-platform-logo-black.svg";
import LogoWhite from "../../../../images/dr-platform-logo-white.svg";
import { SiteContext } from "../../../../site-context/site-context";
import Image from "../../image/image";
import styles from "./dr-card.styles";

interface DrCardProps {
  isNoPadding?: boolean;
  isNoBorderBottom?: boolean;
}

const DrCard: React.FC<DrCardProps> = ({
  isNoPadding,
  isNoBorderBottom,
  children,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);

  return (
    <div css={styles.root}>
      <Image
        css={styles.logo}
        src={isDarkMode ? LogoWhite : LogoBlack}
        alt="DR logo"
      />

      <div
        css={(theme) => [
          styles.card(theme),
          !isNoPadding && styles.cardPadding,
          isNoBorderBottom && styles.noBottomBorder,
        ]}
      >
        {children}
      </div>
    </div>
  );
};

export default DrCard;
