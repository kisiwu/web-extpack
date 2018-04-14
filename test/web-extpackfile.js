module.exports = {
    "ENTRY_DIR": "test/dev",
    "ENTRY_FILES_EXT": [".js"],
    "OUTPUT_DIR": "test/addon",
    "OUTPUT_FILES": "[name]/index.js",
    "module": {
        "rules" : [
            {
                "test": /\.js$/,
                "exclude": /(node_modules|bower_components)/,
                "loader": "babel-loader",
                "options": {
                    "presets": ["env"],
                    "plugins": ['transform-runtime']
                }
            }
        ]
    }
};