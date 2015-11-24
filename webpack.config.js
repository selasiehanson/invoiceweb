'use strict';
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {  
  entry: [
    // "bootstrap-sass!./assets/js/bootstrap-sass-config.js",
    './index.js'
  ],
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    alias: {
      'font-awesome': process.cwd() + '/node_modules/font-awesome/css/font-awesome.css',
      'mfbjs': process.cwd() + "/node_modules/ng-material-floating-button/src/mfb-directive.js",
      'mfbcss': process.cwd() + "/node_modules/ng-material-floating-button/mfb/src/mfb.scss",
      'formly': __dirname + '/node_modules/angular-formly/dist/formly.js',
      'ui-select-css': process.cwd() + '/node_modules/ui-select/dist/select.css',
      'angular-loading-bar-css': process.cwd() + '/node_modules/angular-loading-bar/build/loading-bar.css',
      'bs-datepicker': process.cwd() + '/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
      'bs-datepicker-css': process.cwd() + '/node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.css'
    }
  },
  plugins: [
    //new webpack.optimize.UglifyJSPlugin()
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin("[name].css")
  ],  
  module: {
    loaders: [
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { test: /\.html/, loader: 'raw' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/,loader: 'style!css!sass' },
      // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader!css-loader") },
      // { test: /\.scss$/,loader: ExtractTextPlugin.extract('style!css!sass') },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=res/[name].[ext]?[hash]'
      },
    ]
  },
  devServer :{
    proxy: {
      '/api/*' : 'http://localhost:9000',
      '/templates/*' : 'http://localhost:9000'
    },
  }
}
