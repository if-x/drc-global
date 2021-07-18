import * as React from "react";
import { SiteContext } from "../../../site-context/site-context";
import Column from "../column-system/column";
import Row from "../column-system/row";
import { grid } from "../design-tokens/grid";
import Image from "../image/image";
import Heading from "../text/heading";
import styles from "./links-section.styles";

interface ResourceLink {
  displayLabel: string;
  url: string;
  iconBlack: string;
  iconWhite: string;
}

interface LinksSectionProps {
  heading: string;
  links: ResourceLink[];
}

const LinksSection: React.FC<LinksSectionProps> = ({ heading, links }) => {
  const { isDarkMode } = React.useContext(SiteContext);

  return (
    <section css={styles.root}>
      <Heading
        component="h2"
        size="small"
        textAlign="center"
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        {heading}
      </Heading>

      <Row>
        {links.map((link) => (
          <Column
            key={link.url}
            spanLg={3}
            spanMd={3}
            spanSm={4}
            spanXs={6}
            isNoMarginBottom={true}
          >
            <a
              href={link.url}
              css={styles.linkContainer}
              target="_blank"
              rel="noreferrer"
            >
              <div css={styles.logoContainer}>
                <Image
                  src={isDarkMode ? link.iconWhite : link.iconBlack}
                  css={styles.logo}
                  alt={link.displayLabel}
                />
              </div>
              <div
                css={styles.label}
                dangerouslySetInnerHTML={{ __html: link.displayLabel }}
              />
            </a>
          </Column>
        ))}
      </Row>
    </section>
  );
};

export default LinksSection;
