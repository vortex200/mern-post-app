const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve("src", "index.jsx"),
  output: {
    path: path.join(__dirname, "..", "server", "/build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jpg$/,
        use: ["file-loader"],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      Images: path.resolve(__dirname, "src", "assets", "img"),
      Contexts: path.resolve(__dirname, "src", "contexts"),
      Styles: path.resolve(__dirname, "src", "assets", "styles"),
      Utils: path.resolve(__dirname, "src", "utils"),
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
