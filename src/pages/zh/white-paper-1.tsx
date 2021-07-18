import * as React from "react";
import { NavTab } from "../../components/layout/header/header";

import Layout from "../../components/layout/layout";
import WhitePaper from "../../components/pages/white-paper/white-paper";
import SEO from "../../components/seo";

const WhitePaperPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.WhitePaper} lang="zh">
      <SEO
        title="白皮书"
        description="数字储备货币（DRC）白皮书涵盖了DRC产生的基本原理，DRC的未来以及其经济模型和分布。"
        lang="zh"
      />

      <WhitePaper lang="zh" />
    </Layout>
  );
};

export default WhitePaperPage;
