module.exports = function config() {
  return `/**
 * Install dependencies:
 * 
 * npm i --save-dev @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader core-js@3.9
 * 
 */
/***/
module.exports = {
  ENTRY_DIR: 'src',
  ENTRY_FILES_EXT: ['.js'],
  OUTPUT_DIR: 'build',
  OUTPUT_FILES: '[name]/bundle.js',

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
    ],
  },
};`;
};
