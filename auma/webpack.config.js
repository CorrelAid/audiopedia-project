const path = require("path");

const webpack = require("webpack");

module.exports = function config(env) {
  if (["development", "production"].indexOf(env) < 0) {
    throw new Error("invalid env");
  }

  let vueCdnUrl = "https://unpkg.com/vue@3.2.8/dist/vue.global.prod.js";
  if (env === "development") {
    vueCdnUrl = "https://unpkg.com/vue@3.2.8/dist/vue.global.js";
  }

  return {
    mode: env,
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
    plugins: [
      new webpack.DefinePlugin({
        VUE_CDN_URL: JSON.stringify(vueCdnUrl),
      }),
    ],
  };
};
