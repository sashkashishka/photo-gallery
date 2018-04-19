const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

  context: __dirname + "/frontend",

  entry: {
    script: "./js"
  },

  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    library: "gall"
  },

  watch: NODE_ENV == "development",

  devtool: NODE_ENV == "development" ? "inline-source-map" : false,

  module: {
    rules: [{
        test: /\.(svg|png|jpg|jpeg)$/,
        use: {
          loader: 'file',
          options: {
            name: '[path][name].[ext]'
          }  
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{
      from: "image",
      test: /\.(svg|png|jpg|jpeg)$/,
      to: 'image/'
    }]), 
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}