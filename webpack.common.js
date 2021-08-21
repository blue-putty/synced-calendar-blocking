const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    // index: "./src/js/popup.js",
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src",
          to: "./",
          globOptions: {
            ignore: ["**/manifest.json"],
          },
        },
      ],
    }),
  ],
};
