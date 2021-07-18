import * as React from "react";
import { grid } from "../../design-tokens/grid";
import SlideOut from "../../slide-out/slide-out";
import Heading from "../../text/heading";
import Text from "../../text/text";
import SlideOutHeader from "./slide-out-header";
import styles from "./slide-out-dr-pod-info.styles";

interface SlideOutNetAssetValueProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutNetAssetValue: React.FC<SlideOutNetAssetValueProps> = ({
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
          heading="What is Net Asset Value (NAV)?"
          onClose={onClose}
        />

        <div css={styles.content}>
          <Heading margin={{ bottom: grid(2) }}>
            DR-POD's Net Asset Value
          </Heading>

          <Text component="p" type="secondary" margin={{ bottom: grid(2) }}>
            DR-POD’s Net Asset Value (NAV) is the DR Vault's total asset worth,
            divided by the total supply of DR-POD in its respective DR Vault.
          </Text>
          <Text component="p" type="secondary" margin={{ bottom: grid(3) }}>
            The price oracle function for DR-POD’s Net Asset Value is provided
            in the DR Smart Contract.
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
        </div>
      </div>
    </SlideOut>
  );
};

export default SlideOutNetAssetValue;
