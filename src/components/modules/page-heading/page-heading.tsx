import * as React from "react";
import styles from "./page-heading.styles";

interface PageHeadingProps {
  heading?: string;
  subHeading?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ heading, subHeading }) => {
  return (
    <div>
      <h1 css={styles.heading}>{heading || "DIGITAL RESERVE CURRENCY"}</h1>
      <div css={styles.subHeading}>
        {subHeading || "DECENTRALIZED STORE OF VALUE"}
      </div>
    </div>
  );
};

export default PageHeading;
