/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Tartanify.com`,
    author: `PeHaa & Joe Vains`,
    description: `Tartan Patterns Collection. Over 5000 free tartan patterns in SVG and PNG format.`,
    siteUrl: `https://tartanify.com/`,
    social: {
      twitter: `pehaa`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-csv`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Alfa Slab One`,
          },
          {
            family: `Barlow`,
          },
        ],
      },
    },
    /* {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          TartansCsv: {
            name: node => node.Name,
            path: node => node.fields.slug,
          },
        },
      },
    }, */
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-151000989-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
      },
    },
  ],
}
