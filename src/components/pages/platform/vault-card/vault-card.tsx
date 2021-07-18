import * as React from "react";
import { navigate } from "gatsby";
import { DrVaultInfo, VaultAssetsInfo } from "../../../../../types/dr-vault";
import Button from "../../../ui-library/button/button";
import { Fonts } from "../../../ui-library/design-tokens/fonts";
import { grid } from "../../../ui-library/design-tokens/grid";
import DrCard from "../../../ui-library/vault-components/dr-card/dr-card";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Separator from "../../../ui-library/separator/separator";
import Heading from "../../../ui-library/text/heading";
import Text from "../../../ui-library/text/text";
import SlideOutVaultInfo from "../../../ui-library/vault-components/slide-out-vault-info/slide-out-vault-info";
import VaultAssetStacked from "../../../ui-library/vault-components/vault-asset-stacked/vault-asset-stacked";
import { getVaultInfo } from "../../../../utils/web3/dr-vault/vault-info";
import { formatCurrency } from "../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../types/currency";
import InfoCta from "../../../ui-library/info-cta/info-cta";
import { SiteContext } from "../../../../site-context/site-context";
import Row from "../../../ui-library/column-system/row";
import Column from "../../../ui-library/column-system/column";
import VaultAssetItem from "../../../ui-library/vault-components/vault-asset-item/vault-asset-item";
import styles from "./vault-card.styles";

interface VaultCardProps extends DrVaultInfo {
  isComingSoon?: boolean;
}

const VaultCard: React.FC<VaultCardProps> = (vaultInfo) => {
  const {
    address,
    title,
    shortDescription,
    allocations,
    url,
    isComingSoon,
    isArchived,
  } = vaultInfo;

  const [isInfoOpen, setInfoOpen] = React.useState<boolean>(false);
  const [vaultAssetsInfo, setVaultAssetsInfo] =
    React.useState<VaultAssetsInfo>();

  const { isMobile } = React.useContext(SiteContext);

  const fetchVaultInfo = async () => {
    const info = await getVaultInfo({ contractAddress: address.mainnet });
    if (info) {
      setVaultAssetsInfo(info);
    }
  };

  React.useEffect(() => {
    let refetchTimer: NodeJS.Timeout;

    if (!isComingSoon) {
      fetchVaultInfo();
      refetchTimer = setInterval(() => fetchVaultInfo(), 1000 * 60 * 5);
    }

    return () => {
      clearInterval(refetchTimer);
    };
  }, []);

  const handleClick = () => {
    navigate(url);
  };

  return (
    <DrCard>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(1.5) }}>
        {title}
      </Heading>

      <Text component="div" type="secondary" margin={{ bottom: grid(3.5) }}>
        {!isArchived ? "Deposit and Withdraw DRC" : "Please withdraw DRC"}
      </Text>

      {(isMobile || isArchived) && (
        <>
          <Text
            component="div"
            weight={Fonts.Weight.Bold}
            margin={{ bottom: grid(2) }}
          >
            Portfolio Allocation
          </Text>
          {allocations.map((asset) => (
            <VaultAssetStacked key={asset.name} {...asset} hasBorder={true} />
          ))}
        </>
      )}

      {!isMobile && !isArchived && (
        <MarginBox margin={{ bottom: grid(3) }}>
          <Row isCenter={true}>
            {allocations.map((asset) => (
              <Column
                key={asset.name}
                spanLg={4}
                spanMd={4}
                isNoMarginBottom={true}
              >
                <VaultAssetItem key={asset.name} {...asset} />
              </Column>
            ))}
          </Row>
        </MarginBox>
      )}

      <Separator margin={{ bottom: grid(2) }} />

      <Text
        component="div"
        type="secondary"
        textSize={14}
        margin={{ bottom: 2 }}
      >
        Total Value Locked
      </Text>

      <Text
        component="div"
        textSize={18}
        weight={Fonts.Weight.Bold}
        margin={{ bottom: grid(2) }}
      >
        {formatCurrency({
          value: vaultAssetsInfo?.totalWorth,
          currency: CurrencySymbol.USD,
        }) || "$-"}
      </Text>

      <Separator margin={{ bottom: grid(3) }} />

      <MarginBox margin={{ bottom: grid(3) }}>
        <InfoCta onClick={() => setInfoOpen(true)}>
          <span dangerouslySetInnerHTML={{ __html: shortDescription }} />
        </InfoCta>
      </MarginBox>

      <div css={styles.buttonContainer}>
        <Button
          css={styles.button}
          type={isComingSoon ? "default" : "primary"}
          onClick={!isComingSoon ? handleClick : undefined}
        >
          {isComingSoon ? "COMING SOON" : "LAUNCH APP"}
        </Button>
      </div>

      <SlideOutVaultInfo
        isOpen={isInfoOpen}
        onClose={() => setInfoOpen(false)}
        {...vaultInfo}
      />
    </DrCard>
  );
};

export default VaultCard;
