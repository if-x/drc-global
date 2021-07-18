import * as React from "react";
import Container from "../../ui-library/container/container";
import { grid } from "../../ui-library/design-tokens/grid";
import MarginBox from "../../ui-library/margin-box/margin-box";
import PageHeading from "../../modules/page-heading/page-heading";
import TopLogo from "../../modules/top-logo/top-logo";
import { Language } from "../../../../types/language";
import MarketChart from "./market-chart/market-chart";
import RelatedLinks from "./related-links/related-links";
import StoryOfDRC from "./story-of-drc/story-of-drc";
import HowToBuyVideo from "./how-to-buy-video/how-to-buy-video";
import Exchanges from "./exchanges/exchanges";
import Roadmap from "./roadmap/roadmap";
import styles from "./home.styles";
import DrPlatform from "./dr-platform/dr-platform";
import Gen01Nft from "./gen01-nft/gen01-nft";

interface HomeProps {
  lang?: Language;
}

const Home: React.FC<HomeProps> = ({ lang = "en" }) => {
  return (
    <Container>
      <MarginBox
        margin={{ desktop: { bottom: grid(4) }, mobile: { bottom: grid(2) } }}
      >
        <PageHeading />
      </MarginBox>

      <TopLogo />

      <h1 css={styles.tagline}>
        When the traditional financial system is failing, and the next step is
        unclear, a simple solution is required.
      </h1>

      <MarginBox
        margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(5) } }}
      >
        <StoryOfDRC lang={lang} />
      </MarginBox>

      <MarginBox
        margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(5) } }}
      >
        <MarketChart lang={lang} />
      </MarginBox>

      {lang === "en" && (
        <MarginBox
          margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(5) } }}
        >
          <DrPlatform />
        </MarginBox>
      )}

      <MarginBox
        margin={{ desktop: { bottom: grid(8) }, mobile: { bottom: grid(5) } }}
      >
        <Gen01Nft lang={lang} />
      </MarginBox>

      <MarginBox margin={{ bottom: grid(5) }}>
        <RelatedLinks lang={lang} />
      </MarginBox>

      {lang === "en" && (
        <MarginBox
          margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(3) } }}
        >
          <HowToBuyVideo />
        </MarginBox>
      )}

      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(2) } }}
      >
        <Exchanges lang={lang} />
      </MarginBox>

      {lang === "en" && <Roadmap />}
    </Container>
  );
};

export default Home;
