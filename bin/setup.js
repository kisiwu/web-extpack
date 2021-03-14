const fs = require('fs'),
  path = require('path'),
  mkdir = require('mkdirp'),
  templates = {
    basic: require('./templates/basic'),
    advanced: require('./templates/advanced')
  };

const SETUP_MANIFEST_FILE = 'src/manifest.json';
const SETUP_FILES = [
  'src/background_scripts/background.js',
  'src/content_scripts/content.js',
];

function setup(configPath, content) {
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
      fs.writeFileSync(configPath, content);
    }
  } catch (e) {
    console.error(`Error --config ${configPath}`, e);
    process.exitCode = 1;
  }

  mkdir.sync(path.dirname(SETUP_MANIFEST_FILE));

  // write manifest and other files if manifest does not already exists
  try {
    if (!fs.existsSync(SETUP_MANIFEST_FILE)) {
      fs.copyFileSync(__dirname + '/../lib/setup/' + SETUP_MANIFEST_FILE, SETUP_MANIFEST_FILE);
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
  } catch(err) {
    console.error(err);
  }
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

    setup(config, templates[opts.template]());
  };
}

module.exports = setupFactory;
