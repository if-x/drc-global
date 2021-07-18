import * as React from "react";
import { NavTab } from "../../components/layout/header/header";

import Layout from "../../components/layout/layout";
import FAQs from "../../components/pages/faqs/faqs";
import SEO from "../../components/seo";

const FAQsPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.FAQs} lang="zh">
      <SEO
        title="常见问题"
        description="有关DRC代币，其价值主张，可投资性等的常见问题"
        lang="zh"
      />

      <FAQs lang="zh" />
    </Layout>
  );
};

export default FAQsPage;
