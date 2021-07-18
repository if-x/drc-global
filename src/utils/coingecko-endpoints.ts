import { MarketDays } from "../../types/coin-market-data";

const createUrlWithParams = (
  url: string,
  params: { [key: string]: string | number }
) => {
  if (Object.keys(params).length === 0) {
    return url;
  }

  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return `${url}?${queryString}`;
};

interface SimplePriceEndpointOptions {
  ids: string[];
}

export const getSimplePriceQueryUrl = ({ ids }: SimplePriceEndpointOptions) => {
  const params: { [key: string]: string | number } = {
    ids: ids.join(","),
    vs_currencies: "usd,eth",
    include_last_updated_at: "true",
  };

  return createUrlWithParams(
    "https://api.coingecko.com/api/v3/simple/price",
    params
  );
};

interface CoinDetailEndpointOptions {
  id: string;
}

export const getCoinDetailQueryUrl = ({ id }: CoinDetailEndpointOptions) => {
  const params: { [key: string]: string | number } = {
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "false",
    developer_data: "false",
    sparkline: "true",
  };

  return createUrlWithParams(
    `https://api.coingecko.com/api/v3/coins/${id}`,
    params
  );
};

interface CoinMarketDataEndpointOptions {
  id: string;
  days: MarketDays | number;
  interval?: "daily";
}

export const getCoinMarketDataQueryUrl = ({
  id,
  days,
  interval,
}: CoinMarketDataEndpointOptions) => {
  const params: { [key: string]: string | number } = {
    vs_currency: "usd",
    days,
  };

  if (interval) {
    params.interval = interval;
  }

  return createUrlWithParams(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
    params
  );
};
