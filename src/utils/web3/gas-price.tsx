import Web3 from "web3";

export const getGasPrice = async (web3: Web3, ratio?: number) => {
  try {
    const gasPriceWei = await web3.eth.getGasPrice();

    const gasPrice = Number(web3.utils.fromWei(gasPriceWei, "gwei"));

    const gasPreferred = Math.round(gasPrice * (ratio || 1.1));

    return web3.utils.toWei(`${gasPreferred}`, "gwei");
  } catch (error) {
    console.error("Failed to get gas price", error);
    return undefined;
  }
};

export const getGasCost = async (gasEstimation: number) => {};
