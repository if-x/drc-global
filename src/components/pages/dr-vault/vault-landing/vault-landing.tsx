import * as React from "react";
import { CurrencySymbol } from "../../../../../types/currency";
import { SetId, VaultAssetsInfo } from "../../../../../types/dr-vault";
import { DR_VAULTS } from "../../../../data/dr/dr-vaults";
import { WalletContext } from "../../../../site-context/dr-context/wallet-context";
import { SiteContext } from "../../../../site-context/site-context";
import { getAddressUrl } from "../../../../utils/etherscan";
import { formatCurrency, formatNumber } from "../../../../utils/format-number";
import { getVaultInfo } from "../../../../utils/web3/dr-vault/vault-info";
import DrDepositWarning from "../../../modules/dr-deposit-warning/dr-deposit-warning";
import Column from "../../../ui-library/column-system/column";
import Row from "../../../ui-library/column-system/row";
import { grid } from "../../../ui-library/design-tokens/grid";
import LinkOut from "../../../ui-library/link-out/link-out";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Heading from "../../../ui-library/text/heading";
import InfoCardSmall from "../../../ui-library/vault-components/info-card/info-card-small";
import SlideOutDrPodInfo from "../../../ui-library/vault-components/slide-out-vault-info/slide-out-dr-pod-info";
import AccessDr from "./access-dr/access-dr";
import ConnectWallet from "./access-dr/connect-wallet";
import DrPerformanceGraph from "./dr-performance-graph/dr-performance-graph";
import PortfolioAllocation from "./portfolio-allocation/portfolio-allocation";

interface VaultLandingProps {
  setId: SetId;
}

const VaultLanding: React.FC<VaultLandingProps> = ({ setId }) => {
  const [isInfoOpen, setInfoOpen] = React.useState<boolean>(false);

  const { isMobile } = React.useContext(SiteContext);
  const context = React.useContext(WalletContext);

  const [vaultInfo, setVaultInfo] = React.useState<VaultAssetsInfo>();

  const drVaultData = DR_VAULTS[setId];
  const web3 = !context.loading ? context.web3 : undefined;
  const chainId = !context.loading ? context.chainId : 1;
  const networkKey = chainId === 3 ? "ropsten" : "mainnet";
  const contractAddress = drVaultData.address[networkKey];

  const fetchVaultInfo = async () => {
    const info = await getVaultInfo({
      web3,
      contractAddress,
    });
    if (info) {
      setVaultInfo(info);
    }
  };

  React.useEffect(() => {
    fetchVaultInfo();
    const refetchTimer = setInterval(() => fetchVaultInfo(), 1000 * 60 * 5);

    return () => {
      clearInterval(refetchTimer);
    };
  }, []);

  return (
    <div>
      <MarginBox margin={{ bottom: grid(4) }}>
        {!context.isConnected && <ConnectWallet setId={setId} />}
        {context.isConnected && <AccessDr setId={setId} />}
      </MarginBox>

      <MarginBox margin={{ bottom: grid(4) }}>
        <DrDepositWarning />
      </MarginBox>

      <MarginBox margin={{ bottom: grid(4) }}>
        <PortfolioAllocation {...drVaultData} />
      </MarginBox>

      {vaultInfo && (
        <MarginBox
          margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(3) } }}
        >
          <Row>
            <Column
              spanLg={4}
              spanMd={4}
              spanSm={12}
              isNoMarginBottom={!isMobile}
              isNarrowMargin={isMobile}
            >
              <InfoCardSmall
                label="Total USD Value Stored"
                value={
                  formatCurrency({
                    value: vaultInfo.totalWorth,
                    currency: CurrencySymbol.USD,
                  }) || "-"
                }
              />
            </Column>
            <Column
              spanLg={4}
              spanMd={4}
              spanSm={12}
              isNoMarginBottom={!isMobile}
              isNarrowMargin={isMobile}
            >
              <InfoCardSmall
                label="Total DR-POD"
                value={
                  formatNumber({
                    value: vaultInfo.podTotalSupply,
                    round: 2,
                  }) || "-"
                }
                info={{ onClick: () => setInfoOpen(true) }}
              />
            </Column>
            <Column
              spanLg={4}
              spanMd={4}
              spanSm={12}
              isNoMarginBottom={!isMobile}
              isNarrowMargin={isMobile}
            >
              <InfoCardSmall
                label="Withdrawal Fee"
                value={
                  `${formatNumber({
                    value: vaultInfo.feePercentage,
                    round: 1,
                  })}%` || "1%"
                }
              />
            </Column>
          </Row>
        </MarginBox>
      )}

      <DrPerformanceGraph contractAddress={contractAddress} />

      {context.isConnected && (
        <>
          <Heading textAlign="center" margin={{ bottom: grid(2) }}>
            DR Smart Contract Address
          </Heading>

          <LinkOut
            url={getAddressUrl(
              contractAddress,
              (!context.loading ? context.chainId : 1) || 1
            )}
            isCenter={true}
          >
            <span css={{ wordBreak: "break-word" }}>{contractAddress}</span>
          </LinkOut>
        </>
      )}

      <SlideOutDrPodInfo
        isOpen={isInfoOpen}
        onClose={() => setInfoOpen(false)}
      />
    </div>
  );
};

export default VaultLanding;
