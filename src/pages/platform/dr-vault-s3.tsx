import * as React from "react";
import { NavTab } from "../../components/layout/header/header";

import Layout from "../../components/layout/layout";
import DrVaultApp from "../../components/pages/dr-vault/dr-vault-app";
import SEO from "../../components/seo";

const DrVaultS3: React.FC = () => {
  return (
    <Layout activeTab={NavTab.Platform} hideSocial={true}>
      <SEO
        title="DR Vault s3"
        description="Digital Reserve (DR) s3 is a decentralised platform where users can deposit their DRC into vaults and gain easy exposure to a basket of the most efficient store of value (SoV) assets as a hedge against inflation and market volatility."
      />

      <DrVaultApp setId="s3" />
    </Layout>
  );
};

export default DrVaultS3;
