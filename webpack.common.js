const path = require("path");
const fs = require("fs");
const { VueLoaderPlugin } = require("vue-loader");
var k,jj;
module.exports = {
  devtool: "inline-source-map",
  entry:
    (
      (k = (function (dir) {
      var files_ = {},
        name1;
      var files = fs.readdirSync(dir);
      files.forEach((v) => {
        fs.readdirSync((name1 = path.resolve(dir, v, "entrypoints"))).forEach(
          (_) => {
            files_[v] = (files_[v] ?? []).concat(path.resolve(name1, _));
          }
        );
      });
      return files_;
    })(path.resolve(__dirname, "ui", "pages"))),
    (
      jj = function(pk,pat){
        k[pk] = []
        var p = path.resolve(__dirname, pat)
        var files = fs.readdirSync(p)
        files.forEach((v)=>{
         if(v.endsWith(".js")){
           k[pk] = k[pk].concat(path.resolve(p,v))
         } 
        })  
      }
  ),jj("vuedist", "vue_du/src"),jj("globals", "global_helpers"),
    k),
  devServer: {
    hot: true,
    open: true,
  },
  output: {
    path: path.resolve(__dirname, "./public/javascripts", "bundles"),
    filename: "[name]/[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{ loader: "vue-loader" }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            options: { transpileOnly: true },
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".tsx", ".jsx"],
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  plugins: [new VueLoaderPlugin()],
  //     plugins: [
  //       new webpack.DefinePlugin({
  //         'process.env.LOGINKEY': JSON.stringify({key: process.env.LOGINKEY}),
  //       })
  //   ],
};
