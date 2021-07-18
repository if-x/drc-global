import {
  AssetKey,
  DrVaultInfo,
  SetId,
  ValueAsset,
} from "../../../types/dr-vault";
import BtcIconBlack from "../../images/dr-asset-icons/black/btc.svg";
import PaxgIconBlack from "../../images/dr-asset-icons/black/paxg.svg";
import EthIconBlack from "../../images/dr-asset-icons/black/ether.svg";
import UsdcIconBlack from "../../images/dr-asset-icons/black/usdc.svg";
import FarmIconBlack from "../../images/dr-asset-icons/black/farm.svg";
import MphIconBlack from "../../images/dr-asset-icons/black/mph.svg";
import BtcIconWhite from "../../images/dr-asset-icons/white/btc.svg";
import PaxgIconWhite from "../../images/dr-asset-icons/white/paxg.svg";
import EthIconWhite from "../../images/dr-asset-icons/white/ether.svg";
import UsdcIconWhite from "../../images/dr-asset-icons/white/usdc.svg";
import FarmIconWhite from "../../images/dr-asset-icons/white/farm.svg";
import MphIconWhite from "../../images/dr-asset-icons/white/mph.svg";
import { drContractAddresses } from "./dr-contract-addresses";
import { getContractAddress } from "./contract-by-network";

export const drAssets: Record<AssetKey, ValueAsset> = {
  wbtc: {
    id: "bitcoin",
    name: "Bitcoin",
    tokenName: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
    address: {
      mainnet: getContractAddress("wbtc", 1),
      ropsten: getContractAddress("wbtc", 3),
    },
    image: {
      black: BtcIconBlack,
      white: BtcIconWhite,
    },
  },
  paxg: {
    id: "pax-gold",
    name: "Gold",
    tokenName: "PAX Gold",
    symbol: "PAXG",
    decimals: 18,
    address: {
      mainnet: getContractAddress("paxg", 1),
      ropsten: getContractAddress("paxg", 3),
    },
    image: {
      black: PaxgIconBlack,
      white: PaxgIconWhite,
    },
  },
  weth: {
    id: "ethereum",
    name: "Ether",
    tokenName: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    address: {
      mainnet: getContractAddress("weth", 1),
      ropsten: getContractAddress("weth", 3),
    },
    image: {
      black: EthIconBlack,
      white: EthIconWhite,
    },
  },
  usdc: {
    id: "usd-coin",
    name: "US Dollar",
    tokenName: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: {
      mainnet: getContractAddress("usdc", 1),
      ropsten: getContractAddress("usdc", 3),
    },
    image: {
      black: UsdcIconBlack,
      white: UsdcIconWhite,
    },
  },
  farm: {
    id: "harvest-finance",
    name: "Harvest Finance",
    tokenName: "Harvest Reward Token",
    symbol: "FARM",
    decimals: 18,
    address: {
      mainnet: getContractAddress("farm", 1),
    },
    image: {
      black: FarmIconBlack,
      white: FarmIconWhite,
    },
  },
  mph: {
    id: "88mph",
    name: "88mph",
    tokenName: "88mph Reward Token",
    symbol: "MPH",
    decimals: 18,
    address: {
      mainnet: getContractAddress("mph", 1),
    },
    image: {
      black: MphIconBlack,
      white: MphIconWhite,
    },
  },
};

export const DR_VAULTS: Record<SetId, DrVaultInfo> = {
  s1: {
    setId: "s1",
    address: {
      mainnet: drContractAddresses.mainnet.s1,
      ropsten: drContractAddresses.ropsten.s1,
    },
    title: "DR Vault s1",
    shortDescription: "Capital Appreciation",
    goal: "Capital Appreciation",
    timeline: "Medium to Long-Term",
    riskLevel: "Moderate to High",
    url: "/platform/dr-vault-s1/",
    allocations: [
      { ...drAssets.wbtc, percentage: 40 },
      { ...drAssets.paxg, percentage: 40 },
      { ...drAssets.weth, percentage: 20 },
    ],
    details: [
      "Currently, gold and Bitcoin are considered the most efficient SoV assets. Both of them not much correlated with traditional asset classes and retain their value during economic downturns.",
      "Ethereum is positioned to become a SoV because of the upcoming staking mechanism (Ethereum 2.0) and declining ETH inflation rate. ",
    ],
    isArchived: true,
  },
  s2: {
    setId: "s2",
    address: {
      mainnet: drContractAddresses.mainnet.s2,
      ropsten: drContractAddresses.ropsten.s2,
    },
    title: "DR Vault s2",
    shortDescription: "Capital Preservation",
    goal: "Capital Preservation",
    timeline: "Short to Long-Term",
    riskLevel: "Low to Moderate",
    url: "/platform/dr-vault-s2/",
    allocations: [
      { ...drAssets.usdc, percentage: 90 },
      { ...drAssets.paxg, percentage: 5 },
      { ...drAssets.wbtc, percentage: 5 },
    ],
    details: [
      "US Dollar is a global reserve currency, used by companies and central banks worldwide. It is also a SoV asset in developing countries with high inflation rates.",
      "Small portfolio allocation to gold and Bitcoin mitigates US dollar inflation risks, as those assets historically outperform US dollar inflation.",
    ],
  },
  s3: {
    setId: "s3",
    address: {
      mainnet: drContractAddresses.mainnet.s3,
      ropsten: drContractAddresses.ropsten.s3,
    },
    title: "DR Vault s3",
    shortDescription: "Aggressive Capital Appreciation",
    goal: "Aggressive Capital Appreciation",
    timeline: "Medium Term",
    riskLevel: "High",
    url: "/platform/dr-vault-s3/",
    allocations: [
      { ...drAssets.farm, percentage: 35 },
      { ...drAssets.mph, percentage: 35 },
      { ...drAssets.weth, percentage: 30 },
    ],
    details: [
      "This Vault is named the ‘DeFi Innovation Vault’. These assets are believed to be at the forefront of innovation in the growing DeFi world; yield-farming is where DeFi’s largest volumes are gathered and Harvest is one of the largest and most versatile yield-farm aggregators. 88mph has released a ‘DeFi primitive’ building block protocol, fixed-rate interest bonds, that allow other DeFi protocols to build on top of. Ether is the glue that binds the current world of DeFi together.",
      "This Vault allocation was selected and voted in using token-weighted snapshot governance, by the DRC community.",
      "<strong>$FARM</strong>",
      "FARM is the native reward token / cash-flow token for Harvest Finance. 30% of all profits earned by the Harvest Finance protocol are used to purchase FARM from the secondary market. This creates an increasing price floor.",
      "The liquidity pool for FARM/ETH on Uniswap is very large and Harvest has a unique self-provisioning strategy for liquidity which means that the pools will remain strong.",
      `Website: <a href="https://harvest.finance" target="_blank" rel="noreferrer">harvest.finance</a><br>Twitter: <a href="https://twitter.com/harvest_finance" target="_blank" rel="noreferrer">@harvest_finance</a><br>Discord: <a href="https://discord.gg/zhGnsaHZtT" target="_blank" rel="noreferrer">https://discord.gg/zhGnsaHZtT</a>`,
      "<strong>$MPH</strong>",
      "MPH is the native reward token for 88mph.app. 88mph is a protocol that allows users to gain Fixed-rate interest on deposits of selected assets such as stablecoins, UNI, and 3CRV. 88mph has an organic growth model and is building a ‘DeFi primitive’ that allows other projects to build on top of and utilise their fixed-rate earning protocol. They have recently released a slew of products that are unique and serve to improve and de-risk the whole ecosystem; Floating-rate Bonds, Zero-Coupon Bonds and a larger range of FIRBs.",
      "MPH/ETH is subject to continuous Liquidity Mining initiatives, bootstrapped by 88mph, and thus has a very healthy liquidity pool.",
      `Website: <a href="https://88mph.app" target="_blank" rel="noreferrer">88mph.app</a><br>Twitter: <a href="https://twitter.com/88mphapp" target="_blank" rel="noreferrer">@88mphapp</a><br>Discord: <a href="https://discord.gg/qskv7aeePc" target="_blank" rel="noreferrer">https://discord.gg/qskv7aeePc</a>`,
      "<strong>$ETH</strong>",
      "Ethereum is positioned to become a SoV because of the upcoming Ethereum 2.0 staking mechanism and declining ETH inflation rate.",
    ],
    isArchived: true,
  },
};
