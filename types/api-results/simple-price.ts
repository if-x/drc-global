export interface SimplePriceResult {
  usd?: number;
  eth?: number;
  last_updated_at?: number;
}

export interface SimplePriceMapped {
  usd?: number;
  eth?: number;
  lastUpdatedAt?: Date;
}

export type CoinId = "digital-reserve-currency" | string;

export type HashedSimplePriceResult = Record<
  CoinId,
  SimplePriceResult | undefined
>;

export type HashedSimplePriceMapped = Record<
  CoinId,
  SimplePriceMapped | undefined
>;
