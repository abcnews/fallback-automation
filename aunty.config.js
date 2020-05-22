module.exports = {
  webpack: config => {
    config.devtool = "source-map";
    return config;
  },
  webpackDevServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
