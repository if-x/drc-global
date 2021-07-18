import * as React from "react";
import { NavTab } from "../../components/layout/header/header";

import Layout from "../../components/layout/layout";
import Home from "../../components/pages/home/home";
import SEO from "../../components/seo";

const IndexPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.Home} lang="zh">
      <SEO
        title="首页"
        description="数字储备货币（DRC）旨在成为去中心化的数字价值储藏，其供应有限且通货膨胀率为零。"
        lang="zh"
      />

      <Home lang="zh" />
    </Layout>
  );
};

export default IndexPage;
