import * as React from "react";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import SlideOut from "../../../../../ui-library/slide-out/slide-out";
import Heading from "../../../../../ui-library/text/heading";
import Text from "../../../../../ui-library/text/text";
import SlideOutHeader from "../../../../../ui-library/vault-components/slide-out-vault-info/slide-out-header";
import styles from "./dr-access-info.styles";

interface SlideOutDrAccessInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutDrAccessInfo: React.FC<SlideOutDrAccessInfoProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <SlideOut
      isOpen={isOpen}
      onHide={onClose}
      isFullWidthOnMobile={true}
      enableBodyLock={true}
    >
      <div css={styles.root}>
        <SlideOutHeader heading="Private Beta Access" onClose={onClose} />

        <div css={styles.content}>
          <Heading margin={{ bottom: grid(3) }}>
            Digital Reserve Pre-launch Access
          </Heading>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            Before the official launch of the Digital Reserve on the 3rd of
            March 2021, we’re giving exclusive Private Beta Access to the
            Digital Reserve DR Vault s1 and DR Vault s2 to DRC Supporting Member
            GEN00 NFT Holders.
          </Text>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            If you would like to gain Private Beta Access,{" "}
            <a
              href="https://drc.foundation/fund/#nft"
              target="_blank"
              rel="noreferrer"
              css={{ textDecoration: "underline" }}
            >
              claim a DRC Supporting Member GEN00 NFT here
            </a>
            .
          </Text>
        </div>
      </div>
    </SlideOut>
  );
};

export default SlideOutDrAccessInfo;
