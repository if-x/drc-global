import * as React from "react";
import { Language } from "../../../../../types/language";
import { marketLinks } from "../../../../data/resource-links";
import Button from "../../../ui-library/button/button";
import Column from "../../../ui-library/column-system/column";
import Row from "../../../ui-library/column-system/row";
import { grid } from "../../../ui-library/design-tokens/grid";
import Text from "../../../ui-library/text/text";

const uniswapButton: Record<Language, string> = {
  en: "BUY DRC ON UNISWAP",
  zh: "UNISWAP 购买DRC",
};

const bilaxyButton: Record<Language, string> = {
  en: "BUY DRC ON BILAXY",
  zh: "BILAXY 购买DRC",
};

const dharmaButton: Record<Language, string> = {
  en: "BUY DRC WITH FIAT (U.S ONLY)",
  zh: "美元购买DRC（限美国）",
};

const quickswapButton: Record<Language, string> = {
  en: "BUY DRC ON QUICKSWAP",
  zh: "QUICKSWAP 购买DRC",
};

const bittrexButton: Record<Language, string> = {
  en: "BUY ON BITTREX GLOBAL",
  zh: "BITTREX GLOBAL 购买DRC",
};

interface ExchangesProps {
  lang?: Language;
}

const Exchanges: React.FC<ExchangesProps> = ({ lang = "en" }) => {
  return (
    <>
      <Row isCenter={true}>
        <Column spanLg={6} spanMd={6} spanSm={6} spanXs={12}>
          <Button
            to={marketLinks.uniswapTrade.url}
            target="_blank"
            css={{ width: "100%" }}
          >
            {uniswapButton[lang]}
          </Button>
        </Column>
        <Column spanLg={6} spanMd={6} spanSm={6} spanXs={12}>
          <Button
            to={marketLinks.bilaxy.url}
            target="_blank"
            css={{ width: "100%" }}
          >
            {bilaxyButton[lang]}
          </Button>
        </Column>
        <Column spanLg={6} spanMd={6} spanSm={6} spanXs={12}>
          <div>
            <Button
              to="https://www.dharma.io/token/0xa150db9b1fa65b44799d4dd949d922c0a33ee606"
              target="_blank"
              css={{ width: "100%" }}
            >
              {dharmaButton[lang]}
            </Button>
            {lang === "en" && (
              <Text
                component="div"
                type="secondary"
                textSize={12}
                textAlign="center"
                margin={{ top: grid(1.5) }}
              >
                <a
                  href="https://dharma.io"
                  target="_blank"
                  rel="noreferrer"
                  css={{ textDecoration: "underline" }}
                >
                  dharma.io
                </a>{" "}
                allows you to buy directly from your US bank account, wire
                transfer or using your deposited crypto
              </Text>
            )}
          </div>
        </Column>
        <Column spanLg={6} spanMd={6} spanSm={6} spanXs={12}>
          <div>
            <Button
              to="https://quickswap.exchange/#/swap?outputCurrency=0xfed16c746cb5bfed009730f9e3e6a673006105c7"
              target="_blank"
              css={{ width: "100%" }}
            >
              {quickswapButton[lang]}
            </Button>

            {lang === "en" && (
              <Text
                component="div"
                type="secondary"
                textSize={12}
                textAlign="center"
                margin={{ top: grid(1.5) }}
              >
                Quickswap, a DEX on the Matic/Polygon network, where users can
                enjoy low fee trading with the DRC/MATIC pair
              </Text>
            )}
          </div>
        </Column>
      </Row>

      <div css={{ display: "flex", justifyContent: "center" }}>
        <Button
          to="https://global.bittrex.com/Market/Index?MarketName=ETH-DRC"
          target="_blank"
          css={{ width: "100%", maxWidth: grid(34.5) }}
        >
          {bittrexButton[lang]}
        </Button>
      </div>
    </>
  );
};

export default Exchanges;
