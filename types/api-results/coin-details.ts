export interface CoinDetailsMarketDataResult {
  current_price?: Record<string, number | undefined | null> | null;
  ath?: Record<string, number | undefined | null> | null;
  ath_change_percentage?: Record<string, number | undefined | null> | null;
  ath_date?: Record<string, string | null> | null;
  atl?: Record<string, number | undefined | null> | null;
  atl_change_percentage?: Record<string, number | undefined | null> | null;
  atl_date?: Record<string, string | null> | null;
  market_cap?: Record<string, number | undefined | null> | null;
  market_cap_rank?: number | null;
  fully_diluted_valuation?: Record<string, number | undefined | null> | null;
  total_volume?: Record<string, number | undefined | null> | null;
  high_24h?: Record<string, number | undefined | null> | null;
  low_24h?: Record<string, number | undefined | null> | null;
  price_change_24h?: number | null;
  price_change_percentage_24h?: number | null;
  price_change_percentage_7d?: number | null;
  price_change_percentage_14d?: number | null;
  price_change_percentage_30d?: number | null;
  price_change_percentage_60d?: number | null;
  price_change_percentage_200d?: number | null;
  price_change_percentage_1y?: number | null;
  market_cap_change_24h?: number | null;
  market_cap_change_percentage_24h?: number | null;
  price_change_24h_in_currency?: Record<
    string,
    number | undefined | null
  > | null;
  price_change_percentage_1h_in_currency?: Record<
    string,
    number | undefined | null
  > | null;
  price_change_percentage_24h_in_currency?: Record<
    string,
    number | null
  > | null;
  price_change_percentage_7d_in_currency?: Record<
    string,
    number | undefined | null
  > | null;
  price_change_percentage_14d_in_currency?: Record<
    string,
    number | null
  > | null;
  price_change_percentage_30d_in_currency?: Record<
    string,
    number | null
  > | null;
  price_change_percentage_60d_in_currency?: Record<
    string,
    number | null
  > | null;
  price_change_percentage_200d_in_currency?: Record<
    string,
    number | null
  > | null;
  price_change_percentage_1y_in_currency?: Record<
    string,
    number | undefined | null
  > | null;
  market_cap_change_24h_in_currency?: Record<
    string,
    number | undefined | null
  > | null;
  market_cap_change_percentage_24h_in_currency?: Record<
    string,
    number | null
  > | null;
  total_supply?: number | null;
  max_supply?: number | null;
  circulating_supply?: number | null;
  sparkline_7d?: { price?: (number | null)[] | null } | null;
  last_updated?: string | null;
}

export interface CoinDetailsResult {
  id: string;
  symbol?: string | null;
  name?: string | null;
  block_time_in_minutes?: number | null;
  hashing_algorithm?: string | null;
  categories?: string[] | null;
  description?: { en?: string | null } | null;
  links?: {
    homepage?: string[] | null;
    blockchain_site?: string[] | null;
    official_forum_url?: string[] | null;
    chat_url?: string[] | null;
    announcement_url?: string[] | null;
    twitter_screen_name?: string | null;
    facebook_username?: string | null;
    telegram_channel_identifier?: string | null;
    bitcointalk_thread_identifier?: string | null;
    subreddit_url?: string | null;
    repos_url?: {
      github: string[] | null;
      bitbucket: string[] | null;
    } | null;
  } | null;
  image?: {
    thumb?: string | null;
    small?: string | null;
    large?: string | null;
  } | null;
  country_origin?: string | null;
  genesis_date?: string | null;
  contract_address?: string | null;
  sentiment_votes_up_percentage?: number | null;
  sentiment_votes_down_percentage?: number | null;
  market_cap_rank?: number | null;
  coingecko_rank?: number | null;
  coingecko_score?: number | null;
  developer_score?: number | null;
  community_score?: number | null;
  liquidity_score?: number | null;
  public_interest_score?: number | null;
  market_data?: CoinDetailsMarketDataResult | null;
  public_interest_stats?: {
    alexa_rank?: number | null;
  } | null;
  last_updated?: string | null;
}

export interface CoinDetailsMarketDataMapped {
  currentPrice?: Record<string, number | undefined | null>;
  ath?: Record<string, number | undefined | null>;
  athChangePercentage?: Record<string, number | undefined | null>;
  athDate?: Record<string, string | null>;
  atl?: Record<string, number | undefined | null>;
  atlChangePercentage?: Record<string, number | undefined | null>;
  atlDate?: Record<string, string | null>;
  marketCap?: Record<string, number | undefined | null>;
  marketCapRank?: number;
  fullyDilutedValuation?: Record<string, number | undefined | null>;
  totalVolume?: Record<string, number | undefined | null>;
  high24h?: Record<string, number | undefined | null>;
  low24h?: Record<string, number | undefined | null>;
  priceChange24h?: number;
  priceChangePercentage24h?: number;
  priceChangePercentage7d?: number;
  priceChangePercentage14d?: number;
  priceChangePercentage30d?: number;
  priceChangePercentage60d?: number;
  priceChangePercentage200d?: number;
  priceChangePercentage1y?: number;
  marketCapChange24h?: number;
  marketCapChangePercentage24h?: number;
  priceChange24hInCurrency?: Record<string, number | undefined | null>;
  priceChangePercentage1hInCurrency?: Record<string, number | undefined | null>;
  priceChangePercentage24hInCurrency?: Record<
    string,
    number | undefined | null
  >;
  priceChangePercentage7dInCurrency?: Record<string, number | undefined | null>;
  priceChangePercentage14dInCurrency?: Record<
    string,
    number | undefined | null
  >;
  priceChangePercentage30dInCurrency?: Record<
    string,
    number | undefined | null
  >;
  priceChangePercentage60dInCurrency?: Record<
    string,
    number | undefined | null
  >;
  priceChangePercentage200dInCurrency?: Record<
    string,
    number | undefined | null
  >;
  priceChangePercentage1yInCurrency?: Record<string, number | undefined | null>;
  marketCapChange24hInCurrency?: Record<string, number | undefined | null>;
  marketCapChangePercentage24hInCurrency?: Record<
    string,
    number | undefined | null
  >;
  totalSupply?: number;
  maxSupply?: number;
  circulatingSupply?: number;
  sparkline7d?: { price?: (number | null)[] };
  lastUpdated?: Date;
}

export interface CoinDetailsMapped {
  id: string;
  symbol?: string;
  name?: string;
  blockTimeInMinutes?: number;
  hashingAlgorithm?: string;
  categories?: string[];
  description?: { en?: string };
  links?: {
    homepage?: string[];
    blockchainSite?: string[];
    officialForumUrl?: string[];
    chatUrl?: string[];
    announcementUrl?: string[];
    twitterScreenName?: string;
    facebookUsername?: string;
    telegramChannelIdentifier?: string;
    bitcointalkThreadIdentifier?: string;
    subredditUrl?: string;
    reposUrl?: {
      github?: string[];
      bitbucket?: string[];
    };
  };
  image?: {
    thumb?: string;
    small?: string;
    large?: string;
  };
  countryOrigin?: string;
  genesisDate?: Date;
  contractAddress?: string;
  sentimentVotesUpPercentage?: number;
  sentimentVotesDownPercentage?: number;
  marketCapRank?: number;
  coingeckoRank?: number;
  coingeckoScore?: number;
  developerScore?: number;
  communityScore?: number;
  liquidityScore?: number;
  publicInterestScore?: number;
  marketData?: CoinDetailsMarketDataMapped;
  publicInterestStats?: {
    alexaRank?: number;
  };
  lastUpdated?: Date;
}
