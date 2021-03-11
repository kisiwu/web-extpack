#! /usr/bin/env node

// web-extpack CLI

// modules
const pckg = require('../package'),
  { Command } = require('commander'),
  setupFactory = require('./setup'),
  buildFactory = require('./build');

// default user's config file
const USER_CONFIG_FILE = 'web-extpack.config.js';

const program = new Command();

program
  .version(pckg.version)
  .option(
    '--config <name>',
    'Path to the config file.',  
    USER_CONFIG_FILE
  );

/**
 * setup command
 */
 program
 .command('setup')
 .alias('init')
 .description('setup files')
 .action(setupFactory(program));

/**
 * start command
 */
program
  .command('build')
  .action(buildFactory(program));

// parse CLI arguments
program.parse(process.argv);
