import * as React from "react";
import { grid } from "../../design-tokens/grid";
import SlideOut from "../../slide-out/slide-out";
import Heading from "../../text/heading";
import Text from "../../text/text";
import SlideOutHeader from "./slide-out-header";
import styles from "./slide-out-dr-pod-info.styles";

interface SlideOutDrPodInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutDrPodInfo: React.FC<SlideOutDrPodInfoProps> = ({
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
        <SlideOutHeader heading="What is DR-POD?" onClose={onClose} />

        <div css={styles.content}>
          <Heading margin={{ bottom: grid(2) }}>
            Digital Reserve - Proof of Deposit
          </Heading>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            When a user deposits DRC into the Digital Reserve Vault, a Proof of
            Deposit is minted to them as a representation of their Vault
            holdings. The unit price of the DR-POD equals to the DR Vault's
            total Total Value Locked (TVL), divided by the total supply of
            DR-POD.
          </Text>
          <Text component="p" type="secondary" margin={{ bottom: grid(3) }}>
            DR-POD is burnt upon withdrawal of DRC from the Digital Reserve.
            When withdrawing a fraction or 100% of a user's holdings, the exact
            fraction of their DR-POD balance is burnt.
          </Text>

          <Heading margin={{ bottom: grid(2) }}>How is DR-POD created?</Heading>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            The initial supply of DR-POD in a DR Vault always starts at 0.
          </Text>
          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            A Genesis Deposit of 1000 DRC to each respective DR Vault is made by
            the DRC Foundation Multi-sig wallet to create the initial DR-POD
            supply with a favourable numerical value.
          </Text>
          <Text component="p" type="secondary" margin={{ bottom: grid(3) }}>
            The total supply of DR-POD will change according to the value of
            subsequent deposits into the Vault. When new assets are stored in a
            DR Vault, the new total assets worth, divided by the DR-POD unit
            price gives the new DR-POD total supply. The newly minted DR-POD
            goes to the depositor.
          </Text>

          <Heading margin={{ bottom: grid(2) }}>
            Anything else I should know?
          </Heading>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            DR-POD is an ERC-20 token and thus transferable from wallet to
            wallet. It is a real representation of your holding and can be used
            to withdraw the related value from the DR Vault at any time.
          </Text>
          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            Please do not transfer or approve spending of your DR-POD to any
            other address you do not trust.
          </Text>
          <Text component="p" type="secondary" margin={{ bottom: grid(3) }}>
            Trading action of DR-POD is not encouraged by the DRC Foundation.
          </Text>
        </div>
      </div>
    </SlideOut>
  );
};

export default SlideOutDrPodInfo;
