import * as React from "react";

import Layout from "../components/layout/layout";
import NotFound from "../components/pages/not-found/not-found";
import SEO from "../components/seo";

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found - Digital Reserve Currency" />
    <NotFound />
  </Layout>
);

export default NotFoundPage;
