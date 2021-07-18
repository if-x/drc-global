import * as React from "react";
import { Language } from "../../../../../types/language";
import { communityLinks } from "../../../../data/resource-links";
import { STORY_OF_DRC } from "../../../../data/content/story-of-drc";
import Button from "../../../ui-library/button/button";
import { grid } from "../../../ui-library/design-tokens/grid";
import Heading from "../../../ui-library/text/heading";
import styles from "./story-of-drc.styles";

const buttonText: Record<Language, string> = {
  en: "VISIT DRC FOUNDATION",
  zh: "DRC基金会",
};

interface StoryOfDRCProps {
  lang?: Language;
}

const StoryOfDRC: React.FC<StoryOfDRCProps> = ({ lang = "en" }) => {
  const data = STORY_OF_DRC[lang];

  return (
    <section>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(3) }}>
        {data.title}
      </Heading>

      {data.contents.map((content) => (
        <p
          key={content.slice(0, 30)}
          css={styles.paragraph}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ))}

      <div css={styles.buttonContainer}>
        <Button
          to={communityLinks.drcFoundation.url}
          target="_blank"
          css={styles.button}
        >
          {buttonText[lang]}
        </Button>
      </div>
    </section>
  );
};

export default StoryOfDRC;
