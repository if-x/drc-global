import * as React from "react";
import { NavTab } from "../components/layout/header/header";

import Layout from "../components/layout/layout";
import Resources from "../components/pages/resources/resources";
import SEO from "../components/seo";

const ResourcesPage: React.FC = () => {
  return (
    <Layout activeTab={NavTab.Resources}>
      <SEO
        title="Resources"
        description="Discover Digital Reserve Currency (DRC) communities, marketplace, media and other information."
      />

      <Resources />
    </Layout>
  );
};

export default ResourcesPage;
