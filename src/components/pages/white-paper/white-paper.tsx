import * as React from "react";
import { Language } from "../../../../types/language";
import { Theme } from "../../../../types/theme";
import {
  WhitePaperContentEn,
  WhitePaperLegalDisclosureEn,
} from "../../../data/content/white-paper-content-en";
import {
  WhitePaperContentZh,
  WhitePaperLegalDisclosureZh,
} from "../../../data/content/white-paper-content-zh";
import { anchorToElement } from "../../../utils/dom/anchor-to-hash";
import PageHeading from "../../modules/page-heading/page-heading";
import Container from "../../ui-library/container/container";
import { grid } from "../../ui-library/design-tokens/grid";
import MarginBox from "../../ui-library/margin-box/margin-box";
import Text from "../../ui-library/text/text";
import WhitePaperSection from "./white-paper-section";

const heading: Record<Language, string> = {
  en: "DRC WHITE PAPER",
  zh: "DRC白皮书",
};

interface WhitePaperSection {
  heading: string;
  contents: string[];
}

const whitePaperContentByLang: Record<Language, WhitePaperSection[]> = {
  en: WhitePaperContentEn,
  zh: WhitePaperContentZh,
};

const whitePaperDisclosureByLang: Record<Language, WhitePaperSection> = {
  en: WhitePaperLegalDisclosureEn,
  zh: WhitePaperLegalDisclosureZh,
};

interface WhitePaperProps {
  lang?: Language;
}

const WhitePaper: React.FC<WhitePaperProps> = ({ lang = "en" }) => {
  const whitePaperContent = whitePaperContentByLang[lang];
  const whitePaperDisclosure = whitePaperDisclosureByLang[lang];

  return (
    <Container>
      <MarginBox
        margin={{ desktop: { bottom: grid(6) }, mobile: { bottom: grid(5) } }}
      >
        <PageHeading />
      </MarginBox>

      <WhitePaperSection heading={heading[lang]}>
        {whitePaperContent.map((section, index) => (
          <a
            key={section.heading}
            href={`#whitePaperSection${index + 1}`}
            css={(theme: Theme) => ({
              display: "block",
              color: theme.text,
              cursor: "pointer",
              marginBottom: grid(1.5),
            })}
            onClick={(e) => {
              e.preventDefault();
              anchorToElement(`whitePaperSection${index + 1}`);
            }}
          >
            {section.heading}
          </a>
        ))}
      </WhitePaperSection>

      {whitePaperContent.map((section, index) => (
        <WhitePaperSection
          key={section.heading}
          id={`whitePaperSection${index + 1}`}
          heading={section.heading}
        >
          {section.contents.map((paragraph) => (
            <p
              key={paragraph.slice(0.3)}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </WhitePaperSection>
      ))}

      <Text
        component="h2"
        textSize={{ desktop: 24, mobile: 20 }}
        margin={{ top: grid(8), bottom: grid(3) }}
      >
        <em>{whitePaperDisclosure.heading}</em>
      </Text>

      {whitePaperDisclosure.contents.map((paragraph) => (
        <p
          key={paragraph.slice(0.3)}
          css={(theme: Theme) => ({
            fontStyle: "italic",
            color: theme.text,
          })}
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
    </Container>
  );
};

export default WhitePaper;
