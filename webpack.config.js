const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const config = {
  entry: ["./src/app.js"],
  output: {
    path: path.resolve(__dirname, "./public/assets/js"),
    publicPath: "/assets/js/",
    filename: "main.js"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/i,
        use: ["css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval-source-map";
  }

  return config;
};
