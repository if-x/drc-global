import * as React from "react";
import { DrVaultInfo } from "../../../../../types/dr-vault";
import { grid } from "../../design-tokens/grid";
import Separator from "../../separator/separator";
import SlideOut from "../../slide-out/slide-out";
import Text from "../../text/text";
import SlideOutHeader from "./slide-out-header";
import styles from "./slide-out-vault-info.styles";

interface SlideOutVaultInfoProps extends DrVaultInfo {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutVaultInfo: React.FC<SlideOutVaultInfoProps> = ({
  title,
  goal,
  timeline,
  riskLevel,
  allocations,
  details,
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
        <SlideOutHeader heading={`${title} - Portfolio`} onClose={onClose} />

        <div css={styles.content}>
          <div css={styles.heading}>{title} - Portfolio</div>

          <div css={styles.sectionHeading}>Allocation Goal</div>
          <Text
            component="div"
            css={(theme) => [styles.text(theme), styles.uppercase]}
            margin={{ bottom: grid(2) }}
          >
            {goal}
          </Text>

          <Separator margin={{ bottom: grid(2) }} />

          <div css={styles.sectionHeading}>Recommended Allocation Timeline</div>
          <Text component="div" css={styles.text} margin={{ bottom: grid(2) }}>
            {timeline}
          </Text>

          <Separator margin={{ bottom: grid(2) }} />

          <div css={styles.sectionHeading}>Recommended Risk Tolerance</div>
          <Text component="div" css={styles.text} margin={{ bottom: grid(2) }}>
            {riskLevel}
          </Text>

          <Separator margin={{ bottom: grid(2) }} />

          <div css={styles.sectionHeading}>Assets</div>
          {allocations.map((asset) => (
            <Text
              key={asset.name}
              component="div"
              css={styles.text}
              margin={{ bottom: grid(1) }}
            >
              {asset.symbol} - {asset.percentage}%{" "}
              <em>
                ({asset.tokenName} - {asset.name})
              </em>
            </Text>
          ))}

          <Separator margin={{ top: grid(2), bottom: grid(2) }} />

          <div css={styles.sectionHeading}>Why this Asset Allocation?</div>
          {details.map((detail) => (
            <Text
              key={detail.slice(0, 30)}
              component="div"
              css={styles.text}
              margin={{ bottom: grid(2) }}
              dangerouslySetInnerHTML={{ __html: detail }}
            />
          ))}
        </div>
      </div>
    </SlideOut>
  );
};

export default SlideOutVaultInfo;
