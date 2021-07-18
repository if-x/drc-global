import * as React from "react";
import { NavTab } from "../components/layout/header/header";

import Layout from "../components/layout/layout";
import WhitePaper from "../components/pages/white-paper/white-paper";
import SEO from "../components/seo";

const WhitePaperPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.WhitePaper}>
      <SEO
        title="White paper"
        description="The Whitepaper covers the rationale for DRC’s genesis, the future of DRC, and its economic model and distribution."
      />

      <WhitePaper />
    </Layout>
  );
};

export default WhitePaperPage;
