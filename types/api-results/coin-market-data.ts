type ResultDataPoint = [number, number];

export interface CoinMarketDataResult {
  prices?: ResultDataPoint[] | null;
  market_caps?: ResultDataPoint[] | null;
  total_volumes?: ResultDataPoint[] | null;
}

interface MarketDataPoint {
  date: number;
  price: number;
  marketCap: number;
  totalVolume: number;
}

export type CoinMarketDataMapped = MarketDataPoint[];
