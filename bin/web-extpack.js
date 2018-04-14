#! /usr/bin/env node

// web-extpack CLI

// modules
const pckg = require('../package'),
      fs = require('fs'),
      path = require('path'),
      fork = require('child_process').fork,
      events = require('events'),
      program = require('commander');

// the lib's config file
const WEBPACK_CONFIG_FILE = '_webpack.config.js'

// default user's config file
const USER_CONFIG_FILE = 'web-extpack.config.js'

// raw options
var raw = {
};
// formatted options
var options = {
    config: USER_CONFIG_FILE
};

// program options
program
  .version(pckg.version)
  .usage('[options]')
  .option('--config <name>', 'Path to the config file [default: '+USER_CONFIG_FILE+']', function(value){
    raw.config = value
    return path.join( "" , value) || options.config
  }).on('--help' ,str => {
      console.log("");
      console.log(" ",pckg.name, pckg.version);
      console.log("");
  });

// on config option
program.on('option:config', function (value) {
    options['config'] = value
});

// parse CLI arguments
program.parse(process.argv)

// format arguments
options['config'] = path.resolve(options['config']);

// create env variable used in WEBPACK_CONFIG_FILE
process.env.USER_CONFIG_FILE = options['config'];

// exec
var error;
runWebpack("--config "+path.resolve(__dirname, WEBPACK_CONFIG_FILE))
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

/**
 * @function
 * @description Function that executes webpack CLI
 * @param {String} options Webpack CLI options
 * @returns {void}
 */
function runWebpack( options ) {

    // var emitter = new events.EventEmitter();

    var args = [];

    if(options){
      if(typeof options === 'string'){
        options = options.split(" ").map(function(arg){
          return arg.trim();
        });
      }
    }

    if(!Array.isArray(options))
      options = [];

    args = args.concat(options);

    var proc = fork( './node_modules/webpack/bin/webpack.js', args, { silent: false } );
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