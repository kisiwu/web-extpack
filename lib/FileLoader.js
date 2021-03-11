const fs = require('fs'),
    path = require('path');

const Configurator = require('./Configurator');

const LIB_KEYS = [
    "OUTPUT_DIR",
    "ENTRY_DIR",
    "ENTRY_FILES_EXT",
    "OUTPUT_FILES"
];

module.exports = FileLoader;

function FileLoader(conf) {

    const configs = Configurator(conf);

    const OUTPUT_DIR = configs.OUTPUT_DIR;
    const ENTRY_DIR = configs.ENTRY_DIR;
    const ENTRY_FILES_EXT = configs.ENTRY_FILES_EXT;
    const OUTPUT_FILES = configs.OUTPUT_FILES;

    // clear up the lib properties
    LIB_KEYS.map(k => {
        delete configs[k];
    });

    var entry = {};
    loadEntry();

    function walkSync(dir, filelist, subdir, key) {
        subdir = subdir || "";
        files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function (file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                if (dir == ENTRY_DIR) {
                    entry[file] = [];
                    key = file;
                }
                filelist = walkSync(path.join(dir, file), filelist, path.join(subdir, file), key);
            }
            else {
                var filename = path.join(subdir, file);
                filelist.push(filename);
                if (dir != ENTRY_DIR && key && Array.isArray(entry[key])) {
                    entry[key].push(filename);
                }
                else {
                    var cExt = "";
                    if (ENTRY_FILES_EXT.some(ext => {
                        cExt = ext;
                        return filename.substr(-(ext.length)) === ext
                    })) {
                        var fKey = filename.substring(0, filename.length - cExt.length);
                        entry[fKey] = entry[fKey] || [];
                        entry[fKey].push(filename);
                    }
                }
            }
        });
        return filelist;
    };

    function getFiles(dir, suffix) {
        var files = walkSync(dir);
        if (suffix && typeof suffix === "string") {
            files = files.filter(f => { return f.substr(-(suffix.length)) === suffix });
        }
        return files.map(f => { return path.join(dir, f) });
    }

    function loadEntry() {
        entry = {};
        walkSync(ENTRY_DIR);
        Object.keys(entry).forEach(function (k) {
            if (ENTRY_FILES_EXT && Array.isArray(ENTRY_FILES_EXT) && ENTRY_FILES_EXT.length) {
                entry[k] = entry[k].filter(f => { 
                    return ENTRY_FILES_EXT.some(ext => {
                        return f.substr(-(ext.length)) === ext ;
                    });
                });
            }
            entry[k] = entry[k].map(f => { return path.resolve(path.join(ENTRY_DIR, f)) });
        });
    }


    // set entry and output
    configs.entry = entry;
    configs.output = {
        path: path.resolve(OUTPUT_DIR, ""),
        filename: OUTPUT_FILES
    };

    return configs;
}