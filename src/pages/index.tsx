import * as React from "react";
import { NavTab } from "../components/layout/header/header";

import Layout from "../components/layout/layout";
import Home from "../components/pages/home/home";
import SEO from "../components/seo";

const IndexPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.Home}>
      <SEO title="Home" />

      <Home />
    </Layout>
  );
};

export default IndexPage;
