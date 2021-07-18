import * as React from "react";
import WalletProvider from "../../../site-context/dr-context/wallet-provider";
import DrcVault from "./drc-vault";

const DrcVaultApp: React.FC = () => {
  return (
    <WalletProvider>
      <DrcVault />
    </WalletProvider>
  );
};

export default DrcVaultApp;
