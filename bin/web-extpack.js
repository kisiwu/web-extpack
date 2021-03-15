#! /usr/bin/env node

// web-extpack CLI

// modules
const pckg = require('../package'),
  { Command, Option } = require('commander'),
  setupFactory = require('./setup'),
  buildFactory = require('./build');

// default user's config file
const USER_CONFIG_FILE = 'web-extpack.config.js';

const program = new Command();

program
  .version(pckg.version)
  .option('--config <path>', 'Path to the config file.', USER_CONFIG_FILE);

/**
 * setup command
 */
program
  .command('setup')
  .alias('init')
  .description('setup files')
  .addOption(
    new Option(
      '-t, --template <template-name>',
      'Choose a template for the config file.'
    )
      .choices(['basic', 'advanced'])
      .default('basic')
  )
  .addOption(
    new Option(
      '--src-files',
      'Add empty files in "src" folder if there is no "src/manifest.json".'
    )
  )
  .action(setupFactory(program));

/**
 * start command
 */
program.command('build').action(buildFactory(program));

// parse CLI arguments
program.parse(process.argv);
