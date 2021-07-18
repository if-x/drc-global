import * as React from "react";
import { Language } from "../../../../types/language";
import { footerLinks } from "../../../data/footer-links";
import Column from "../../ui-library/column-system/column";
import Row from "../../ui-library/column-system/row";
import Container from "../../ui-library/container/container";
import Image from "../../ui-library/image/image";

import DarkModeAngLanguageToggle from "../dark-mode-and-language-toggle/dark-mode-and-language-toggle";
import styles from "./footer.styles";

interface FooterProps {
  lang?: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer css={styles.root}>
      <Container css={styles.container}>
        <div css={styles.links}>
          <Row>
            {footerLinks.map((link) => (
              <Column
                key={link.url}
                spanLg={1.5}
                spanMd={1.5}
                spanSm={3}
                spanXs={3}
                isNoMarginBottom={true}
              >
                <a
                  href={link.url}
                  css={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image src={link.icon} alt={link.name} />
                </a>
              </Column>
            ))}
          </Row>
        </div>

        <div css={styles.copyRight}>© {currentYear} DRC</div>
      </Container>

      <div css={styles.darkModeToggle}>
        <DarkModeAngLanguageToggle currentLang={lang} />
      </div>
    </footer>
  );
};

export default Footer;
