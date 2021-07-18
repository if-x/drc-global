import * as React from "react";
import { DrVaultInfo } from "../../../../../../types/dr-vault";
import { SiteContext } from "../../../../../site-context/site-context";
import Column from "../../../../ui-library/column-system/column";
import Row from "../../../../ui-library/column-system/row";
import { grid } from "../../../../ui-library/design-tokens/grid";
import InfoCta from "../../../../ui-library/info-cta/info-cta";
import MarginBox from "../../../../ui-library/margin-box/margin-box";
import Heading from "../../../../ui-library/text/heading";
import SlideOutVaultInfo from "../../../../ui-library/vault-components/slide-out-vault-info/slide-out-vault-info";
import VaultAssetItem from "../../../../ui-library/vault-components/vault-asset-item/vault-asset-item";
import VaultAssetStacked from "../../../../ui-library/vault-components/vault-asset-stacked/vault-asset-stacked";
import styles from "./portfolio-allocation.styles";

const PortfolioAllocation: React.FC<DrVaultInfo> = (vaultInfo) => {
  const { shortDescription, allocations } = vaultInfo;

  const [isInfoOpen, setInfoOpen] = React.useState<boolean>(false);

  const { isMobile } = React.useContext(SiteContext);

  return (
    <div css={styles.root}>
      <Heading margin={{ bottom: grid(1.5) }}>Portfolio Allocation</Heading>

      <MarginBox margin={{ bottom: grid(3) }}>
        <InfoCta onClick={() => setInfoOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: shortDescription }} />
        </InfoCta>
      </MarginBox>

      {isMobile &&
        allocations.map((asset) => (
          <VaultAssetStacked key={asset.name} {...asset} hasBorder={true} />
        ))}

      {!isMobile && (
        <Row isCenter={true}>
          {allocations.map((asset) => (
            <Column
              key={asset.name}
              spanLg={4}
              spanMd={4}
              isNoMarginBottom={true}
            >
              <VaultAssetItem
                key={asset.name}
                {...asset}
                showLiquidity={true}
              />
            </Column>
          ))}
        </Row>
      )}

      <SlideOutVaultInfo
        isOpen={isInfoOpen}
        onClose={() => setInfoOpen(false)}
        {...vaultInfo}
      />
    </div>
  );
};

export default PortfolioAllocation;
