const siteMetadata = require('./site-metadata.json')

const plugins = [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-data`,
    `gatsby-transformer-remark`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `pages`,
            path: `${__dirname}/src/pages`
        }
    },
    {
        resolve: `gatsby-plugin-sass`,
        options: {}
    },
    {
        resolve: `gatsby-remark-page-creator`,
        options: {}
    },
    {
        resolve: `@stackbit/gatsby-plugin-menus`,
        options: {
            sourceUrlPath: `fields.url`,
            pageContextProperty: `menus`,
        }
    }
];

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: plugins
};

const TRACKING_ID = process.env.TRACKING_ID;

if (TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      // You can add multiple tracking ids and a pageview event will be fired for all of them.
      trackingIds: [
        TRACKING_ID, // Google Analytics / GA
      ],
      // This object gets passed directly to the gtag config command
      // This config will be shared across all trackingIds
      gtagConfig: {
        optimize_id: "OPT_CONTAINER_ID",
        anonymize_ip: true,
        cookie_expires: 0,
      },
      // This object is used for configuration specific to this plugin
      pluginConfig: {
        // Puts tracking script in the head instead of the body
        head: false,
      },
    }
  });
}
