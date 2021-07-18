import * as React from "react";
import { MarketDays } from "../../../../../types/coin-market-data";
import { grid } from "../../../ui-library/design-tokens/grid";
import MarginBox from "../../../ui-library/margin-box/margin-box";
import LogoBlack from "../../../../images/logo-round-black.svg";
import LogoWhite from "../../../../images/logo-round-white.svg";
import Image from "../../../ui-library/image/image";
import Heading from "../../../ui-library/text/heading";
import { COIN_ID } from "../../../../constants/coin-id";
import { formatCurrency } from "../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../types/currency";
import Separator from "../../../ui-library/separator/separator";
import { useCoinDetails } from "../../../../hooks/query-hooks/use-coin-details";
import { SiteContext } from "../../../../site-context/site-context";
import { Language } from "../../../../../types/language";
import MarketTimeRangeTabs from "./market-time-range-tabs";
import MarketChartByTimeRange from "./market-chart-by-time-range";
import styles from "./market-chart.styles";
import MarketDetails from "./market-details";

interface MarketChartProps {
  lang?: Language;
}

const MarketChart: React.FC<MarketChartProps> = ({ lang }) => {
  const { isDarkMode } = React.useContext(SiteContext);

  const [activeTimeRange, setActiveTimeRange] = React.useState<MarketDays>("7");

  const { data } = useCoinDetails({ id: COIN_ID });
  const currentPriceUsd = data?.marketData?.currentPrice?.[CurrencySymbol.USD];
  const currentPriceETH = data?.marketData?.currentPrice?.[CurrencySymbol.ETH];

  const logo = isDarkMode ? LogoWhite : LogoBlack;

  return (
    <section>
      <div css={styles.headingContainer}>
        <div css={styles.imageContainer}>
          <Image css={styles.image} src={logo} alt="Logo" />
        </div>

        <div css={styles.headerContent}>
          <MarginBox margin={{ mobile: { bottom: grid(3) } }}>
            <Heading component="h2">DRC</Heading>
            <div>Digital Reserve Currency</div>
          </MarginBox>
          <div>
            <Heading>
              {formatCurrency({
                value: currentPriceUsd,
                currency: CurrencySymbol.USD,
              })}
            </Heading>
            <div>{currentPriceETH?.toFixed(10)} ETH</div>
          </div>
        </div>
      </div>

      <MarginBox margin={{ bottom: grid(3) }}>
        <MarketTimeRangeTabs
          activeTab={activeTimeRange}
          setActiveTab={setActiveTimeRange}
        />
      </MarginBox>

      <MarginBox margin={{ bottom: grid(3) }}>
        <MarketChartByTimeRange timeRange={activeTimeRange} />
      </MarginBox>

      <MarginBox margin={{ bottom: grid(2) }}>
        <MarketDetails coinData={data} lang={lang} />
      </MarginBox>

      <Separator />
    </section>
  );
};

export default MarketChart;
