const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib')
    return config
  }
}
