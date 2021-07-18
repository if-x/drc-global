import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import SocialImage from "../images/social-share.png";
import logoImage from "../images/favicon.png";
import { Language } from "../../types/language";

const titleSuffix: Record<Language, string> = {
  en: "Digital Reserve Currency (DRC Token)",
  zh: "数字储备货币（DRC）",
};

interface SEOProps {
  description?: string;
  lang?: Language;
  meta?: {
    name: string;
    content: string;
  }[];
  title: string;
  imageUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
  imageUrl,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaTitle = `${title} | ${titleSuffix[lang]}`;
  const metaDescription = description || site.siteMetadata.description;
  const logoSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://drcglobal.org",
    logo: logoImage,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: imageUrl || `https://drcglobal.org${SocialImage}`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:image`,
          content: imageUrl || `https://drcglobal.org${SocialImage}`,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">{JSON.stringify(logoSchema)}</script>
    </Helmet>
  );
};

export default SEO;
