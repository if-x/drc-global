import Web3 from "web3";

export const bignumberToNumber = (
  web3: Web3,
  value: string,
  decimals: number
) => {
  let tokenStoredNum = 0;
  if (decimals === 18) {
    tokenStoredNum = Number(web3.utils.fromWei(value));
  } else if (decimals >= 9) {
    const leftoverDecimals = decimals - 9;
    tokenStoredNum =
      Number(web3.utils.fromWei(value, "gwei")) / 10 ** leftoverDecimals;
  } else if (decimals >= 6) {
    const leftoverDecimals = decimals - 6;
    const multiplier = 10 ** leftoverDecimals;
    tokenStoredNum = Number(web3.utils.fromWei(value, "mwei")) / multiplier;
  } else {
    tokenStoredNum = Number(value);
  }

  return tokenStoredNum;
};
