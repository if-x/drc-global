import * as React from "react";
import { NavTab } from "../../components/layout/header/header";

import Layout from "../../components/layout/layout";
import DrcVaultApp from "../../components/pages/drc-vault/drc-vault-app";
import SEO from "../../components/seo";

const DrcVaultPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.Platform} hideSocial={true}>
      <SEO
        title="DRC Vault"
        description="DRC Vault is a secure non-custodial and 100% decentralized application created specifically for DRC holders. DRC tokens held in the DRC Vault remain completely under the user’s control and ownership, with nobody else able to access the funds."
      />

      <DrcVaultApp />
    </Layout>
  );
};

export default DrcVaultPage;
