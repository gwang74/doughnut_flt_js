const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: "./index.js",
  output: {
    filename: "donut.min.js",
    path: path.resolve(__dirname, "./dist")
  },
  target: "web",
  mode: process.env.MODE === "dev" ? 'development' : "production",
  node: {
    fs: "empty",
    tls: "empty",
    "child_process": "empty",
    net: "empty"
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/
    }]
  },
  plugins: [
    new DuplicatePackageCheckerPlugin()
  ]
};

if (process.env.REPORT === "true") {
  config.plugins.push(new BundleAnalyzerPlugin())
}

if (process.env.MODE !== "dev") {
  config.plugins.push(new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        sequences: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        unused: true
      }
    },
    sourceMap: false,
    parallel: true
  }));
}

module.exports = config;