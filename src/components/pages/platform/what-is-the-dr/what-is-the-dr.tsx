import * as React from "react";
import { Language } from "../../../../../types/language";
import { WHAT_IS_THE_DR } from "../../../../data/content/what-is-the-dr";
import { grid } from "../../../ui-library/design-tokens/grid";
import Heading from "../../../ui-library/text/heading";
import styles from "./what-is-the-dr.styles";

interface WhatIsTheDrProps {
  lang?: Language;
}

const WhatIsTheDr: React.FC<WhatIsTheDrProps> = ({ lang = "en" }) => {
  const data = WHAT_IS_THE_DR[lang];

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
    </section>
  );
};

export default WhatIsTheDr;
