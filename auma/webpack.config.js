const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/auma.js",
  output: {
    filename: "auma.js",
    path: path.resolve(__dirname, "demo/dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
