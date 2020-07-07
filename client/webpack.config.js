const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "..", "backend", "/build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.jpg$/,
        loader: "file-loader",
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  resolve: {
    alias: {
      Images: path.resolve(__dirname, "src", "assets", "img"),
      Contexts: path.resolve(__dirname, "src", "contexts"),
      Shared: path.resolve(__dirname, "src", "components", "shared"),
      Styles: path.resolve(__dirname, "src", "assets", "styles"),
    },
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
