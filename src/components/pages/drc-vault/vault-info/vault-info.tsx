import * as React from "react";
import { CurrencySymbol } from "../../../../../types/currency";
import { DrcVaultInfo } from "../../../../../types/dr-vault";
import { drcVaultAddress } from "../../../../data/dr/dr-contract-addresses";
import { useCoinPrice } from "../../../../hooks/query-hooks/use-coin-price";
import { WalletContext } from "../../../../site-context/dr-context/wallet-context";
import { SiteContext } from "../../../../site-context/site-context";
import { formatCurrency, formatNumber } from "../../../../utils/format-number";
import { getDrcVaultInfo } from "../../../../utils/web3/drc-vault/drc-vault-info";
import Column from "../../../ui-library/column-system/column";
import Row from "../../../ui-library/column-system/row";
import { grid } from "../../../ui-library/design-tokens/grid";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import Heading from "../../../ui-library/text/heading";
import InfoCardSmall from "../../../ui-library/vault-components/info-card/info-card-small";
import VaultHolders from "./vault-holders/vault-holders";

const VaultInfo: React.FC = () => {
  const context = React.useContext(WalletContext);
  const { isMobile } = React.useContext(SiteContext);

  const [vaultInfo, setVaultInfo] = React.useState<DrcVaultInfo>();

  const { data } = useCoinPrice({ id: "digital-reserve-currency" });

  const web3 = !context.loading ? context.web3 : undefined;
  const chainId = !context.loading ? context.chainId : 1;
  const networkKey = chainId === 3 ? "ropsten" : "mainnet";
  const contractAddress = drcVaultAddress[networkKey];

  const fetchVaultInfo = async () => {
    const info = await getDrcVaultInfo({
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
  }, [chainId]);

  if (!vaultInfo) {
    return null;
  }

  return (
    <>
      <Heading textAlign="center" margin={{ bottom: grid(3.5) }}>
        DRC Holders in DRC Vault
      </Heading>

      <MarginBox
        margin={{ desktop: { bottom: grid(4) }, mobile: { bottom: grid(3) } }}
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
              label="Total Holders"
              value={`${vaultInfo.holders.length}`}
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
              label="Total DRC Locked"
              value={
                formatNumber({
                  value: vaultInfo.total,
                  round: 0,
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
              label="Total Value Locked"
              value={`${
                vaultInfo.total && data?.usd
                  ? formatCurrency({
                      value: vaultInfo.total * data.usd,
                      currency: CurrencySymbol.USD,
                      round: 2,
                    })
                  : "$-"
              }`}
            />
          </Column>
        </Row>
      </MarginBox>

      <MarginBox margin={{ bottom: grid(4) }}>
        <VaultHolders holders={vaultInfo.holders} />
      </MarginBox>
    </>
  );
};

export default VaultInfo;
