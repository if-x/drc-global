import * as React from "react";
import { grid } from "../../../../../../ui-library/design-tokens/grid";
import SlideOut from "../../../../../../ui-library/slide-out/slide-out";
import Heading from "../../../../../../ui-library/text/heading";
import Text from "../../../../../../ui-library/text/text";
import SlideOutHeader from "../../../../../../ui-library/vault-components/slide-out-vault-info/slide-out-header";
import styles from "./price-impact-info.styles";

interface SlideOutPriceImpactInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutPriceImpactInfo: React.FC<SlideOutPriceImpactInfoProps> = ({
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
        <SlideOutHeader
          heading="Price impact deposit limits"
          onClose={onClose}
        />

        <div css={styles.content}>
          <Heading margin={{ bottom: grid(3) }}>
            Why can’t I deposit my DRC?
          </Heading>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            The Digital Reserve limits the amount of DRC that can be deposited
            if it will have a greater than 2% price impact on any of the assets
            in the portfolio allocation.
          </Text>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            These limits are added for protection of the Digital Reserve against
            Flash Loan Attacks. As the current availability of liquidity for the
            underlying assets on Uniswap is not sufficient for your deposit at
            this moment, you are unable to deposit your currently entered amount
            of DRC.
          </Text>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            You can try reducing the amount of DRC to be deposited or
            alternatively, please wait for the asset’s liquidity pool to
            increase to accommodate your preferred amount of DRC.
          </Text>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            Thank you for your patience and understanding.
          </Text>
        </div>
      </div>
    </SlideOut>
  );
};

export default SlideOutPriceImpactInfo;
