// The path to the CesiumJS source code
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.ts",
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "index.js",
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        use: ["url-loader"],
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      cesium: path.resolve(__dirname, cesiumSource),
    },
    mainFiles: ["index", "Cesium"],
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
        { from: path.join(cesiumSource, "Assets"), to: "Assets" },
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
      ],
    }),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify(""),
      "process.env.CESIUM_ACCESS_TOKEN": JSON.stringify(
        process.env.CESIUM_ACCESS_TOKEN
      ),
    }),
  ],
};
