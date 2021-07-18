import * as React from "react";
import Heading from "../text/heading";
import ChevronBlackIcon from "../../../images/icons/chevron-icon-black.svg";
import ChevronWhiteIcon from "../../../images/icons/chevron-icon-white.svg";
import Image from "../image/image";
import { SiteContext } from "../../../site-context/site-context";
import styles from "./accordion-heading.styles";

interface AccordionHeadingProps {
  isOpen: boolean;
  onClick: () => void;
}

const AccordionHeading: React.FC<AccordionHeadingProps> = ({
  isOpen,
  onClick,
  children,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);
  const chevronIcon = isDarkMode ? ChevronWhiteIcon : ChevronBlackIcon;

  return (
    <div role="button" css={styles.root} onClick={onClick}>
      <Heading size="small">{children}</Heading>

      <div
        css={[
          styles.chevron,
          {
            transform: `rotateX(${isOpen ? 0 : 180}deg)`,
          },
        ]}
      >
        <Image src={chevronIcon} alt="Chevron icon" />
      </div>
    </div>
  );
};

export default AccordionHeading;
