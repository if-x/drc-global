import * as React from "react";
import { Language } from "../../../../types/language";
import PageHeading from "../../modules/page-heading/page-heading";
import Container from "../../ui-library/container/container";
import { Fonts } from "../../ui-library/design-tokens/fonts";
import { grid } from "../../ui-library/design-tokens/grid";
import MarginBox from "../../ui-library/margin-box/margin-box";
import Text from "../../ui-library/text/text";
import DrFaqs from "./dr-faqs/dr-faqs";
import DrVaults from "./dr-vaults/dr-vaults";
import DrcVaultCard from "./drc-vault-card/drc-vault-card";
import WhatIsTheDr from "./what-is-the-dr/what-is-the-dr";

interface PlatformProps {
  lang?: Language;
}

const Platform: React.FC<PlatformProps> = ({ lang = "en" }) => {
  return (
    <Container>
      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <PageHeading
          heading="DIGITAL RESERVE"
          subHeading="DEPOSIT DRC TOKENS INTO DR VAULTS"
        />
      </MarginBox>

      <MarginBox margin={{ bottom: grid(5) }}>
        <DrcVaultCard />
      </MarginBox>

      <Text
        component="h2"
        textSize={28}
        textAlign="center"
        weight={Fonts.Weight.Bold}
        margin={{ bottom: grid(4) }}
      >
        DR Vault Sets
      </Text>

      <MarginBox margin={{ bottom: grid(3) }}>
        <DrVaults />
      </MarginBox>

      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <WhatIsTheDr lang={lang} />
      </MarginBox>

      <DrFaqs />
    </Container>
  );
};

export default Platform;
