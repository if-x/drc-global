import * as React from "react";
import { SetId } from "../../../../types/dr-vault";
import WalletProvider from "../../../site-context/dr-context/wallet-provider";
import DrVault from "./dr-vault";

interface DrVaultAppProps {
  setId: SetId;
}

const DrVaultApp: React.FC<DrVaultAppProps> = ({ setId }) => {
  return (
    <WalletProvider>
      <DrVault setId={setId} />
    </WalletProvider>
  );
};

export default DrVaultApp;
