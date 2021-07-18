import * as React from "react";
import { CurrencySymbol } from "../../../../../../../types/currency";
import { DrContext } from "../../../../../../site-context/dr-context/dr-context";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../../utils/format-number";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import MarginBox from "../../../../../ui-library/margin-box/margin-box";
import Text from "../../../../../ui-library/text/text";
import AllocationPieChart from "../../../../../ui-library/vault-components/allocation-pie-chart/allocation-pie-chart";
import VaultAssetStacked from "../../../../../ui-library/vault-components/vault-asset-stacked/vault-asset-stacked";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import SlideOutDrPodInfo from "../../../../../ui-library/vault-components/slide-out-vault-info/slide-out-dr-pod-info";
import InfoCta from "../../../../../ui-library/info-cta/info-cta";
import styles from "./user-assets-in-vault.styles";

const UserAssetsInVault: React.FC = () => {
  const {
    setId,
    userVaultInfo: { data },
    vaultTokens,
  } = React.useContext(DrContext);

  const [isInfoOpen, setInfoOpen] = React.useState<boolean>(false);

  return (
    <div>
      {vaultTokens.map((asset) => (
        <div key={asset.name} css={styles.assetContainer}>
          <VaultAssetStacked
            {...asset}
            usdValue={
              data ? (data.userHoldingUsd * asset.percentage) / 100 : undefined
            }
          />
        </div>
      ))}

      <div css={styles.content}>
        <div css={styles.headingContainer}>
          <Text
            component="div"
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(0.5) }}
          >
            Your DR Vault {setId} balance
          </Text>
          <Text
            component="div"
            textSize={24}
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(0.5) }}
          >
            {formatCurrency({
              value: data?.userHoldingUsd,
              currency: CurrencySymbol.USD,
            }) || "$-"}
          </Text>

          <Text component="div" type="secondary" textSize={14}>
            {formatNumber({
              value: data?.totalWorthInDrc,
            })}{" "}
            DRC
          </Text>
        </div>

        <MarginBox margin={{ bottom: grid(2.5) }}>
          <AllocationPieChart allocations={vaultTokens} />
        </MarginBox>

        <InfoCta size="small" onClick={() => setInfoOpen(true)}>
          Your DR-POD
        </InfoCta>

        <Text component="div" weight={Fonts.Weight.Bold} textAlign="center">
          {formatNumber({ value: data?.drPodBalance, round: 2 })}
        </Text>
      </div>

      <SlideOutDrPodInfo
        isOpen={isInfoOpen}
        onClose={() => setInfoOpen(false)}
      />
    </div>
  );
};

export default UserAssetsInVault;
