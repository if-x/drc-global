import * as React from "react";
import { Language } from "../../../../../types/language";
import { grid } from "../../../ui-library/design-tokens/grid";
import Heading from "../../../ui-library/text/heading";
import styles from "./drc-ecosystem-video.styles";

interface DRCEcosystemVideoProps {
  lang?: Language;
}

const DRCEcosystemVideo: React.FC<DRCEcosystemVideoProps> = ({
  lang = "en",
}) => {
  return (
    <section>
      <Heading
        component="h2"
        textAlign="center"
        margin={{ desktop: { bottom: grid(4) }, mobile: { bottom: grid(3) } }}
      >
        {lang === "zh" ? "DRC生态系统" : "The DRC ecosystem"}
      </Heading>

      <div css={styles.videoContainer}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/D3VuC9t2BLI?rel=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          // @ts-ignore Youtube attribute
          enablejsapi={1}
        ></iframe>
      </div>
    </section>
  );
};

export default DRCEcosystemVideo;
