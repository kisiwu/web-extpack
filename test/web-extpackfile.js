module.exports = {
    "ENTRY_DIR": "test/src",
    "ENTRY_FILES_EXT": [".js"],
    "OUTPUT_DIR": "test/addon",
    "OUTPUT_FILES": "[name]/index.js",
    "mode": "production",
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /(node_modules|bower_components)/,
                "loader": "babel-loader",
                "options": {
                    "presets": [
                        ['@babel/preset-env', { "targets": "defaults" }]
                    ],
                    "plugins": ['@babel/plugin-proposal-class-properties']
                }
            }
        ]
    }
};