const webpack = require('webpack');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        // Removed pathRewrite to keep /api prefix
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
  },
};
