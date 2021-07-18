import * as React from "react";
import { NavTab } from "../../components/layout/header/header";

import Layout from "../../components/layout/layout";
import Platform from "../../components/pages/platform/platform";
import SEO from "../../components/seo";

const PlatformPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.Platform}>
      <SEO
        title="Digital Reserve Platform"
        description="Digital Reserve (DR) is an online platform for DRC token holders to get easy exposure to a basket of the most efficient store of value (SoV) assets."
      />

      <Platform />
    </Layout>
  );
};

export default PlatformPage;
