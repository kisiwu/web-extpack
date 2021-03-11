const path = require('path'),
  fork = require('child_process').fork;

// the lib's config file
const WEBPACK_CONFIG_FILE = '_webpack.config.js';

/**
 * @function
 * @description Function that executes webpack CLI
 * @param {String} options Webpack CLI options
 * @returns {void}
 */
function runWebpack(options) {
  let args = [];

  if (options) {
    if (typeof options === 'string') {
      options = options.split(' ').map(arg => arg.trim());
    }
  }

  if (!Array.isArray(options)) options = [];

  args = args.concat(options);

  fork('./node_modules/webpack/bin/webpack.js', args, {
    silent: false,
  });
}

/**
 *
 * @param {import('commander').Command} program
 * @returns {function} action
 */
function buildFactory(program) {
  return function buildAction() {
    const opts = program.opts();

    const config = path.resolve(opts.config);

    // create env variable used in WEBPACK_CONFIG_FILE
    process.env.USER_CONFIG_FILE = config;

    // exec
    runWebpack('--config ' + path.resolve(__dirname, WEBPACK_CONFIG_FILE));
  };
}

module.exports = buildFactory;
