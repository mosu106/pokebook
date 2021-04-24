/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

module.exports = {
  assetPrefix: process.env.NODE_ENV === "production" ? '/pokebook' : '.',
  publicRuntimeConfig: {
    basePath: process.env.NODE_ENV === "production" ? '/pokebook' : '',
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.join(__dirname, 'src/'),
    }
    return config
  },
}
