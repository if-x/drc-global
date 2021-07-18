import * as React from "react";
import { communityLinks, informationLink } from "../../../data/resource-links";
import { SiteContext } from "../../../site-context/site-context";
import Image from "../../ui-library/image/image";
import styles from "./social-shares.styles";

const links = [
  communityLinks.twitter,
  communityLinks.discord,
  communityLinks.telegram,
  informationLink.medium,
  communityLinks.reddit,
];

const SocialShares: React.FC = () => {
  const { isDarkMode } = React.useContext(SiteContext);

  return (
    <div css={styles.root}>
      {links.map((link) => (
        <a key={link.displayLabel} href={link.url} css={styles.link}>
          <Image
            src={isDarkMode ? link.iconWhite : link.iconBlack}
            alt={link.displayLabel}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialShares;
