import * as React from "react";
import { CoinDetailsMapped } from "../../../../../types/api-results/coin-details";
import { CurrencySymbol } from "../../../../../types/currency";
import { Language } from "../../../../../types/language";
import { formatCurrency, formatSupply } from "../../../../utils/format-number";
import Column from "../../../ui-library/column-system/column";
import Row from "../../../ui-library/column-system/row";
import styles from "./market-details.styles";

type Label = Record<Language, string>;

const labels = {
  maxSupply: {
    en: "Max Supply",
    zh: "总供应量",
  } as Label,
  circulatingSupply: {
    en: "Circulating Supply",
    zh: "循环供应",
  } as Label,
  marketCap: {
    en: "Market Cap",
    zh: "市值",
  } as Label,
  totalVolume: {
    en: "24h Volume",
    zh: "24小时成交量",
  } as Label,
};

interface MarketDetailsProps {
  coinData?: CoinDetailsMapped;
  lang?: Language;
}

const MarketDetails: React.FC<MarketDetailsProps> = ({
  coinData,
  lang = "en",
}) => {
  const maxSupply = 1000000000;
  const circulatingSupply = coinData?.marketData?.circulatingSupply;
  const currentPrice = coinData?.marketData?.currentPrice;
  const totalVolume = coinData?.marketData?.totalVolume;

  const currentPriceUsd = currentPrice?.[CurrencySymbol.USD];
  const marketCap = currentPriceUsd ? currentPriceUsd * maxSupply : undefined;

  return (
    <Row>
      <Column spanLg={3} spanMd={3} spanSm={6} spanXs={6}>
        <div>
          <div css={styles.label}>{labels.maxSupply[lang]}</div>
          <div css={styles.value}>{formatSupply({ value: maxSupply })}</div>
        </div>
      </Column>
      <Column spanLg={3} spanMd={3} spanSm={6} spanXs={6}>
        <div>
          <div css={styles.label}>{labels.circulatingSupply[lang]}</div>
          <div css={styles.value}>
            {formatSupply({ value: circulatingSupply })}
          </div>
        </div>
      </Column>
      <Column spanLg={3} spanMd={3} spanSm={6} spanXs={6}>
        <div>
          <div css={styles.label}>{labels.marketCap[lang]}</div>
          <div css={styles.value}>
            {formatCurrency({
              value: marketCap,
              currency: CurrencySymbol.USD,
            }) || "$ -"}
          </div>
        </div>
      </Column>
      <Column spanLg={3} spanMd={3} spanSm={6} spanXs={6}>
        <div>
          <div css={styles.label}>{labels.totalVolume[lang]}</div>
          <div css={styles.value}>
            {formatCurrency({
              value: totalVolume?.[CurrencySymbol.USD],
              currency: CurrencySymbol.USD,
            }) || "$ -"}
          </div>
        </div>
      </Column>
    </Row>
  );
};

export default MarketDetails;
