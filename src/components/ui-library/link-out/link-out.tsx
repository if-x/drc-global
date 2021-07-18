import * as React from "react";
import LinkIconBlack from "../../../images/icons/link-icon-black.svg";
import LinkIconWhite from "../../../images/icons/link-icon-white.svg";
import { SiteContext } from "../../../site-context/site-context";
import Image from "../image/image";
import styles from "./link-out.styles";

interface LinkOutProps {
  url: string;
  isCenter?: boolean;
  underline?: boolean;
}

const LinkOut: React.FC<LinkOutProps> = ({
  url,
  isCenter,
  underline,
  children,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);

  const linkIcon = isDarkMode ? LinkIconWhite : LinkIconBlack;

  return (
    <a
      css={(theme) => [styles.root(theme), isCenter && styles.center]}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <span css={underline && { textDecoration: "underline" }}>{children}</span>
      <Image src={linkIcon} alt="Link" />
    </a>
  );
};

export default LinkOut;
