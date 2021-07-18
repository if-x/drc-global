import * as React from "react";
import { DR_VAULTS } from "../../../../../data/dr/dr-vaults";
import VaultCard from "../../vault-card/vault-card";

const SovVaults: React.FC = () => {
  return (
    <div>
      <VaultCard {...DR_VAULTS.s2} />
    </div>
  );
};

export default SovVaults;
