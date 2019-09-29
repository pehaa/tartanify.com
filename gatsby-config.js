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
  ],
}
