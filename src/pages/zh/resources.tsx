import * as React from "react";
import { NavTab } from "../../components/layout/header/header";

import Layout from "../../components/layout/layout";
import Resources from "../../components/pages/resources/resources";
import SEO from "../../components/seo";

const ResourcesPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.Resources} lang="zh">
      <SEO
        title="相关链接"
        description="数字储备货币（DRC）社区，市场，媒体和其他信息"
        lang="zh"
      />

      <Resources lang="zh" />
    </Layout>
  );
};

export default ResourcesPage;
