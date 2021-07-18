import * as React from "react";
import { Theme } from "../../../../../types/theme";
import { BUY } from "../../../../constants/elements";
import { grid } from "../../../ui-library/design-tokens/grid";
import Heading from "../../../ui-library/text/heading";
import styles from "./how-to-buy-video.styles";

const HowToBuyVideo: React.FC = () => {
  return (
    <section id={BUY}>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(2) }}>
        How to Buy DRC
      </Heading>

      <div
        css={(theme: Theme) => ({
          color: theme.text,
          textAlign: "center",
          marginBottom: grid(3),
        })}
      >
        Tutorial on how to use MetaMask and Uniswap to buy DRC with ETH
      </div>

      <div css={styles.videoContainer}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/UAeuI-fl3yo?rel=0"
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

export default HowToBuyVideo;
