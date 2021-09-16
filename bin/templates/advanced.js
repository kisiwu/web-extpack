module.exports = function config() {
  return `/**
 * Install dependencies:
 * 
 * npm i --save-dev @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader copy-webpack-plugin core-js@3.9 css-loader mini-css-extract-plugin sass sass-loader
 * 
 */
/***/
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // import '.js', '.css', '.sass', and '.scss' files
  ENTRY_FILES_EXT: ['.js', '.css', '.sass', '.scss'],

  // mode
  mode: 'production',

  module: {
    rules: [
      // javascript loader (js)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          exclude: [
            // \\ for Windows, / for macOS and Linux
            /node_modules[\\/]core-js/,
            /node_modules[\\/]webpack[\\/]buildin/,
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                corejs: '3.9',
                targets: {
                  chrome: '58',
                  firefox: '58',
                },
              },
            ],
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      // style loader (css, sass, scss)
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // style plugin
    new MiniCssExtractPlugin({
      filename: '[name]/bundle.css',
    }),
    // copy the non-loaded files (assets)
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, 'src'),
          from: '**/*',
          to: '[path][name][ext]',
          toType: 'template',
          globOptions: {
            ignore: ['**/*.js', '**/*.css', '**/*.sass', '**/*.scss'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
`;
};
