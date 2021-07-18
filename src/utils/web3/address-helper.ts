import { ADDRESS_0 } from "../../data/dr/contract-by-network";

export const isSameAddress = (address1?: string, address2?: string) => {
  return (
    address1?.startsWith("0x") &&
    address2?.startsWith("0x") &&
    address1 !== ADDRESS_0 &&
    address1.toLowerCase() === address2.toLowerCase()
  );
};

export const formatAddressForDisplay = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-6)}`;
