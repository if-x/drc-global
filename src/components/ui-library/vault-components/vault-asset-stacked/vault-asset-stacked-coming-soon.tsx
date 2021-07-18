import * as React from "react";
import { Fonts } from "../../design-tokens/fonts";
import Text from "../../text/text";
import styles from "./vault-asset-stacked.styles";

interface VaultAssetStackedProps {
  hasBorder?: boolean;
}

const VaultAssetStackedComingSoon: React.FC<VaultAssetStackedProps> = ({
  hasBorder,
}) => {
  return (
    <div css={(theme) => [styles.root, hasBorder && styles.rootBorder(theme)]}>
      <div css={styles.imageContainer} />

      <div css={styles.content}>
        <Text component="div" weight={Fonts.Weight.Bold} margin={{ bottom: 3 }}>
          COMING SOON
        </Text>
        <Text component="div" type="secondary" textSize={12}>
          Coming soon
        </Text>
      </div>

      <div css={styles.valueContainer}>
        <Text component="div" weight={Fonts.Weight.Bold} textSize={22}>
          0%
        </Text>
      </div>
    </div>
  );
};

export default VaultAssetStackedComingSoon;
