const CONFIG = require(process.env.USER_CONFIG_FILE);
const FileLoader = require('../lib/FileLoader');

module.exports = FileLoader(CONFIG);