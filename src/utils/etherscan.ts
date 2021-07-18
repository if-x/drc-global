export const getAddressUrl = (address: string, chainId: number) => {
  if (chainId === 3) {
    return `https://ropsten.etherscan.io/address/${address}`;
  }

  return `https://etherscan.io/address/${address}`;
};

export const getTransactionUrl = (txHash: string, chainId: number) => {
  if (chainId === 3) {
    return `https://ropsten.etherscan.io/tx/${txHash}`;
  }

  return `https://etherscan.io/tx/${txHash}`;
};
