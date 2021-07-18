import * as React from "react";
import { Language } from "../../../../../types/language";
import { SiteContext } from "../../../../site-context/site-context";
import Button from "../../../ui-library/button/button";
import { Fonts } from "../../../ui-library/design-tokens/fonts";
import { grid } from "../../../ui-library/design-tokens/grid";
import Separator from "../../../ui-library/separator/separator";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import styles from "./gen01-nft.styles";

const heading: Record<Language, string> = {
  en: "Claim a DRC Supporting Member GEN01 NFT",
  zh: "DRC赞助成员GEN01 NFT",
};

const subHeading: Record<Language, string> = {
  en: "Support the DRC Foundation",
  zh: "支持DRC基金会",
};

const description: Record<Language, string> = {
  en: "The DRC Foundation would like to offer you an opportunity to claim a limited edition DRC Supporting Member GEN01 Digital Collectible NFT by donating towards the DRC Foundation Fund.",
  zh: "DRC基金会上线筹款活动进行中。向此次筹款活动捐款数额符合要求的朋友可获得限量版DRC GEN01 NFT。详情请见DRC基金会网站。",
};

const buttonText: Record<Language, string> = {
  en: "Learn more about the NFT",
  zh: "查看NFT详情",
};

interface Gen00NftProps {
  lang?: Language;
}

const Gen01Nft: React.FC<Gen00NftProps> = ({ lang = "en" }) => {
  const { isMobile } = React.useContext(SiteContext);

  return (
    <div css={styles.root}>
      <div css={styles.hideDesktop}>
        <Heading textAlign={"center"} margin={{ bottom: grid(3) }}>
          {heading[lang]}
        </Heading>
      </div>

      <a
        css={styles.gifLink}
        href="https://drc.foundation/fund/#nft"
        target="_blank"
        rel="noreferrer"
      >
        <video
          css={styles.gif}
          width={800}
          height={800}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
        >
          <source
            src="https://storage.opensea.io/files/211594df7771e0b571749a97e8132080.mp4"
            type="video/mp4"
          />
        </video>
      </a>

      <div css={styles.content}>
        {!isMobile && (
          <>
            <Heading margin={{ bottom: grid(3) }}>{heading[lang]}</Heading>
            <Separator margin={{ bottom: grid(2.5) }} />
          </>
        )}
        <Text
          component="div"
          type="secondary"
          textSize={18}
          weight={Fonts.Weight.Bold}
          margin={{ bottom: grid(2) }}
        >
          {subHeading[lang]}
        </Text>

        <Text component="div" type="secondary" margin={{ bottom: grid(3) }}>
          {description[lang]}
        </Text>

        <Button css={styles.button} to="https://drc.foundation/fund/#nft">
          {buttonText[lang]}
        </Button>
      </div>
    </div>
  );
};

export default Gen01Nft;
