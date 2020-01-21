// next.config.js
const theme = require('./theme/color');
const withLess = require('@zeit/next-less')
module.exports = withLess({
  /* config options here */
  lessLoaderOptions: {
    modifyVars: theme,
    javascriptEnabled: true
  }
})