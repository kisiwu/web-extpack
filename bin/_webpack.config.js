const CONFIG = require(process.env.USER_CONFIG_FILE);
var FileLoader = require('../lib/FileLoader');

var entryOutput = FileLoader(CONFIG);

module.exports = entryOutput;