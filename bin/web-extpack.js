#! /usr/bin/env node

// web-extpack CLI

// modules
const pckg = require('../package'),
  fs = require('fs'),
  path = require('path'),
  fork = require('child_process').fork,
  events = require('events'),
  { program } = require('commander'),
  _init = require('./_init');

// the lib's config file
const WEBPACK_CONFIG_FILE = '_webpack.config.js';

// default user's config file
const USER_CONFIG_FILE = 'web-extpack.config.js';

// formatted defaultOptions
const defaultOptions = {
  config: USER_CONFIG_FILE,
};

// program options
program
  .passCommandToAction(false);

program
  .version(pckg.version)
  .usage('<command> [options]')
  .on('--help', (str) => {
    console.log('');
    console.log(' ', pckg.name, pckg.version);
    console.log('');
  });

program
  .command('build')
  .option(
    '--config <name>',
    'Path to the config file [default: ' + USER_CONFIG_FILE + ']'
  )
  .action(function (opts) {
    // format arguments
    var config = path.resolve(opts.config || defaultOptions['config']);

    // create env variable used in WEBPACK_CONFIG_FILE
    process.env.USER_CONFIG_FILE = config;

    // exec
    var error;
    runWebpack('--config ' + path.resolve(__dirname, WEBPACK_CONFIG_FILE));
    /*.on('stdout', data => {
        console.log(data.toString());
    })
    .on('stderr', function( data ){
        console.error(data.toString());
        error = true;
    })
    .on('exit', function(){
        if(error)
            console.error("ERROR");
    });
    */
  });

program
  .command('init')
  .option(
    '--config <name>',
    'Path to the config file [default: ' + USER_CONFIG_FILE + ']'
  )
  .description('create the files and directories')
  .action(function (opts) {
    var files = {
      config: opts.config || defaultOptions.config,
    };

    _init.init(files);

    process.exit(0);
  });

// on config option
/*
program.on('option:config', function (value) {
  console.log('config', value);
  defaultOptions['config'] = value;
});
*/

// parse CLI arguments
program.parse(process.argv);

/**
 * @function
 * @description Function that executes webpack CLI
 * @param {String} options Webpack CLI options
 * @returns {void}
 */
function runWebpack(options) {
  // var emitter = new events.EventEmitter();

  var args = [];

  if (options) {
    if (typeof options === 'string') {
      options = options.split(' ').map(function (arg) {
        return arg.trim();
      });
    }
  }

  if (!Array.isArray(options)) options = [];

  args = args.concat(options);

  var proc = fork('./node_modules/webpack/bin/webpack.js', args, {
    silent: false,
  });
  /*proc.on('message', data => {
        // in case of process.send
    } );
    proc.stdout.on( 'data', ( data ) => {
        emitter.emit('stdout', data);
    } );
    proc.stderr.on( 'data', ( data ) => {
        emitter.emit('stderr', data);
    } );
    proc.on( 'exit', ( code, signal ) => {
      emitter.emit('exit', code, signal);
    } );

    return emitter;
    */
}
