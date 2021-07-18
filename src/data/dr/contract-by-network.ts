type ContractName =
  | "uniswap"
  | "drc"
  | "weth"
  | "wbtc"
  | "paxg"
  | "usdc"
  | "farm"
  | "mph";

type NetworkType = "test" | "main";

type TokenContract = Record<NetworkType, string>;

type ContractAddresses = Record<ContractName, TokenContract>;

const contractAddresses: ContractAddresses = {
  uniswap: {
    test: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    main: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  },
  drc: {
    test: "0x6D38D09eb9705A5Fb1b8922eA80ea89d438159C7",
    main: "0xa150Db9b1Fa65b44799d4dD949D922c0a33Ee606",
  },
  weth: {
    test: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    main: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  wbtc: {
    test: "0x0B6D10102bbB04a0CA2Dc49d1b38bD9A788832FD",
    main: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  paxg: {
    test: "0x478640c8D01CAc92Ffcd4a15EaC1408Be52BA47A",
    main: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
  },
  usdc: {
    test: "0x87c00648150d89651FB6C5C5993338DCfcA3Ff7B",
    main: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  farm: {
    test: "0xDaddaAF81FA6f58610aaE83afA1F30929cDB4B22",
    main: "0xa0246c9032bC3A600820415aE600c6388619A14D",
  },
  mph: {
    test: "0x3007164919cC8A1Ce090DD7AEA5A57051d4478C1",
    main: "0x8888801af4d980682e47f1a9036e589479e835c5",
  },
};

export const contractNameByAddress = Object.keys(contractAddresses).reduce(
  (nameByAddr: Record<string, ContractName>, name) => {
    const addresses = contractAddresses[name as ContractName];
    Object.keys(addresses).forEach((key) => {
      const address = addresses[key as NetworkType].toLowerCase();
      nameByAddr[address] = name as ContractName;
    });
    return nameByAddr;
  },
  {}
);

export const ADDRESS_0 = "0x0000000000000000000000000000000000000000";

export const getContractAddress = (
  name: ContractName,
  chainId: number
): string => {
  const networkType: NetworkType = chainId === 3 ? "test" : "main";
  return contractAddresses[name][networkType] || ADDRESS_0;
};

type PairName = "drc" | "wbtc" | "paxg" | "usdc" | "farm" | "mph";

const pairAddress: Record<PairName, string> = {
  drc: "0x53455f3b566d6968e9282d982dd1e038e78033ac",
  wbtc: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
  paxg: "0x9c4fe5ffd9a9fc5678cfbd93aa2d4fd684b67c4c",
  usdc: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  farm: "0x56feaccb7f750b997b36a68625c7c596f0b41a58",
  mph: "0x4D96369002fc5b9687ee924d458A7E5bAa5df34E",
};

export const getPairAddress = (name: PairName) => pairAddress[name];
