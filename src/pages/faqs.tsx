import * as React from "react";
import { NavTab } from "../components/layout/header/header";

import Layout from "../components/layout/layout";
import FAQs from "../components/pages/faqs/faqs";
import SEO from "../components/seo";

const FAQsPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.FAQs}>
      <SEO
        title="Frequently asked questions"
        description="Frequently Asked Questions (FAQs) regarding the DRC token, its value proposition, investability and more."
      />

      <FAQs />
    </Layout>
  );
};

export default FAQsPage;
