module.exports = Configurator;

function Configurator(conf) {
    const params = {};

    conf = conf || {};

    Object.keys(conf).map(
        k => {
            params[k] = conf[k]
        }
    );

    // entry
    params.ENTRY_DIR = conf.ENTRY_DIR || "entry";
    params.ENTRY_FILES_EXT = conf.ENTRY_FILES_EXT || [".js"];
    if (typeof params.ENTRY_FILES_EXT === 'string')
        params.ENTRY_FILES_EXT = params.ENTRY_FILES_EXT.split(",");
    if (!Array.isArray(params.ENTRY_FILES_EXT))
        params.ENTRY_FILES_EXT = [params.ENTRY_FILES_EXT];
    params.ENTRY_FILES_EXT
        .filter(function (v) {
            return v && typeof v === 'string';
        }).map(function (v) {
            return v.trim();
        });

    // output
    params.OUTPUT_DIR = conf.OUTPUT_DIR || "output";
    params.OUTPUT_FILES = conf.OUTPUT_FILES || "[name]/index.js";
    

    return params;
}