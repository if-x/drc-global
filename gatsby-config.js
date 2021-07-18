module.exports = {
  siteMetadata: {
    siteUrl: `https://drcglobal.org`,
    title: `Digital Reserve Currency (DRC Token)`,
    description: `Digital Reserve Currency (DRC Token) was designed to become a decentralized digital store of value with a limited supply and a zero inflation rate.`,
    author: `@DRCToken`,
  },
  pathPrefix: "/drc-global", // For github page only, can remove later
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [],
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://drcglobal.org`,
        exclude: [],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Digital Reserve Currency`,
        short_name: `DRC Global`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Lato:400,400i,700,700i&display=swap",
            `Noto+Sans+SC:400,700&display=swap`,
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-K5Z4FDV",
        includeInDevelopment: true,
        defaultDataLayer: {},
      },
    },
  ],
};
