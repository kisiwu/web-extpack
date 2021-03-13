const fs = require('fs'),
  path = require('path'),
  mkdir = require('mkdirp');

const SETUP_FILES = [
  'build/manifest.json',
  'src/background_scripts/background.js',
  'src/content_scripts/content.js',
  'manifest.js',
];

function setup(configPath, options) {
  // create directories
  mkdir.sync(path.dirname(configPath));

  // write config file
  try {
    let fileExists = fs.existsSync(configPath);
    if (
      configPath &&
      configPath.length > 2 &&
      (!fileExists || (fileExists && !fs.statSync(configPath).size))
    ) {
      let jsonOptions = JSON.stringify(options, null, ' ');
      if (!(configPath.length >= 5 && configPath.substr(-5) === '.json')) {
        jsonOptions = 'module.exports = ' + jsonOptions + ';\n';
      }
      fs.writeFileSync(configPath, jsonOptions);
    }
  } catch (e) {
    console.error(`Error --config ${configPath}`, e);
    process.exitCode = 1;
  }

  SETUP_FILES.forEach((filepath) => {
    if (filepath.indexOf('/') > -1) {
      mkdir.sync(path.dirname(filepath));
    }
    try {
      if (!fs.existsSync(filepath))
        fs.copyFileSync(__dirname + '/../lib/setup/' + filepath, filepath);
    } catch (e) {
      console.error(e);
    }
  });
}

/**
 *
 * @param {import('commander').Command} program
 * @returns {function} action
 */
function setupFactory(program) {
  return function setupAction() {
    const opts = program.opts();

    const config = path.resolve(opts.config);

    setup(config, {
      ENTRY_DIR: 'src',
      ENTRY_FILES_EXT: ['.js'],
      OUTPUT_DIR: 'build',
      OUTPUT_FILES: '[name]/bundle.js',
      module: {
        rules: [
          {
            test: /\\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-runtime'],
            },
          },
        ],
      },
    });
  };
}

module.exports = setupFactory;
