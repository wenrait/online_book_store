var path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: path.resolve('./src/js/index.js'),
    output: {
        path: path.resolve(__dirname),
        filename: 'script.js'
    },
    mode: 'production',
    plugins: [new MiniCssExtractPlugin(), new ESLintPlugin({fix: true}), new StylelintPlugin({fix: true})],
    optimization: {
      minimize: true,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname),
      },
      hot: true,
    },
    devtool: 'source-map'
    
    
};