import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { VaultAssetsInfo } from "../../../../types/dr-vault";
import DRContract from "../../../contracts/IDigitalReserve.json";
import IERC20 from "../../../contracts/IERC20.json";
import { getEthPrice } from "../../uniswap-graph/eth-price";
import { dataWeb3 } from "../data-web3";

interface VaultInfoInput {
  web3?: Web3;
  contractAddress: string;
}

export const getVaultInfo = async ({
  web3,
  contractAddress,
}: VaultInfoInput): Promise<VaultAssetsInfo | null> => {
  const web3ToUse = web3 || dataWeb3;
  try {
    const contract = new web3ToUse.eth.Contract(
      [...DRContract.abi, ...IERC20.abi] as AbiItem[],
      contractAddress
    );

    const totalSupply = await contract.methods.totalSupply().call();
    const podUnitprice = await contract.methods.getProofOfDepositPrice().call();
    const withdrawalFee = await contract.methods.withdrawalFee().call();

    const price = (await getEthPrice()) || 0;

    const totalSupplyNum = Number(web3ToUse.utils.fromWei(totalSupply));
    const podUnitpriceNum = Number(web3ToUse.utils.fromWei(podUnitprice));
    const feeFraction = Number(withdrawalFee[0]);
    const feeBase = Number(withdrawalFee[1]);
    const feePercentage = (feeFraction / feeBase) * 100;

    const totalWorth = totalSupplyNum * podUnitpriceNum * price;

    return {
      totalWorth,
      podTotalSupply: totalSupplyNum,
      feePercentage,
    };
  } catch (err) {
    console.error("Failed get vault info", err);
    return null;
  }
};
