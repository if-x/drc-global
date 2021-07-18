export type SetId = "s1" | "s2" | "s3";
export type DrCoinId =
  | "ethereum"
  | "bitcoin"
  | "pax-gold"
  | "usd-coin"
  | "digital-reserve-currency"
  | "harvest-finance"
  | "88mph";

export type AssetKey = "wbtc" | "paxg" | "weth" | "usdc" | "farm" | "mph";

export interface ValueAsset {
  id: DrCoinId;
  name: string;
  tokenName: string;
  symbol: string;
  decimals: number;
  address: {
    mainnet: string;
    ropsten?: string;
  };
  image: {
    black: string;
    white: string;
  };
}

export interface AssetAllocation extends ValueAsset {
  percentage: number;
}

export interface AssetAllocationWorth extends AssetAllocation {
  usdValue?: number;
}

export interface DrVaultInfo {
  setId: SetId;
  address: {
    mainnet: string;
    ropsten: string;
  };
  title: string;
  shortDescription: string;
  goal: string;
  timeline: string;
  riskLevel: string;
  url: string;
  allocations: AssetAllocation[];
  details: string[];
  isArchived?: boolean;
}

export interface VaultAssetsInfo {
  totalWorth: number;
  podTotalSupply: number;
  feePercentage: number;
}

export interface DrTransactionInfo {
  id: string;
  eventName: string;
  transactionHash: string;
  timestamp: number;
  timeFormated: string;
  drcAmount?: number;
  podAmount?: number;
}

export interface DrcVaultTransactionInfo {
  id: string;
  eventName: string;
  transactionHash: string;
  timestamp: number;
  timeFormated: string;
  drcAmount?: number;
}

export interface DrcVaultHolding {
  timestamp: number;
  holding: number;
}

export type DrVaultUserAction = "deposit" | "withdraw";

export type TransactionStatus = "pending" | "success" | "failed" | "none";

export interface DrcVaultHolderInfo {
  address: string;
  holding: number;
  percentage: number;
  gen00: boolean;
  gen01: boolean;
}

export interface DrcVaultInfo {
  total: number | null;
  holders: DrcVaultHolderInfo[];
}
