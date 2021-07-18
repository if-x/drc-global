module.exports = {
  client: {
    service: {
      name: "drc-global",
      includes: ["**/*.ts"],
      url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      skipSSLValidation: true,
    },
  },
};
