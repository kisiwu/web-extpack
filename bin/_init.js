const fs = require('fs'),
    path = require('path');

module.exports = {
  init: function init(files){
    var mkdir = require('mkdirp');

    files = typeof files === 'undefined' ? {} : files

    Object.keys(files).forEach(
      (f) => {
        if(!files[f]) return;
        mkdir.sync(path.dirname(files[f]))
        if(f == 'config'){
            this.writeJS(files[f], this.getConfigContent())
        }       
      }
    );

    [
        'build/manifest.json',
        'dev/background_scripts/background.js',
        'dev/content_scripts/content.js',
        'manifest.js'
    ].forEach(
        f => {
            if(f.indexOf('/') > -1){
                mkdir.sync(path.dirname(f))
            }
            try{
                if(!fs.existsSync(f))
                    fs.copyFileSync(__dirname + '/../lib/init/' + f, f)
            }catch(e){
                console.error(e)
            }
        }
    );
  },

  getConfigContent: function getConfigContent(){

    return `module.exports = {
    "ENTRY_DIR": "dev",
    "ENTRY_FILES_EXT": [".js"],
    "OUTPUT_DIR": "build",
    "OUTPUT_FILES": "[name]/index.js",
    "module": {
        "rules" : [
            {
                "test": /\\.js$/,
                "exclude": /(node_modules|bower_components)/,
                "loader": "babel-loader",
                "options": {
                    "presets": ["env"],
                    "plugins": ['transform-runtime']
                }
            }
        ]
    }
};`
  },

  writeJSON: function writeJSON(filepath, content){
    try{
      if(filepath && filepath.length > 2 && !fs.existsSync(filepath)){
        var fileContent = content
        if(!(filepath.length >= 5 && filepath.substr(-5) === '.json'))
          fileContent = 'module.exports = '+content
        fs.writeFileSync(filepath, fileContent);
      }
    }catch (e){
      console.error("Cannot write file ", e);
    }
  },

  writeJS: function writeJS(filepath, content){
    try{
      if(filepath && filepath.length > 2 && !fs.existsSync(filepath)){
        var fileContent = content
        fs.writeFileSync(filepath, fileContent);
      }
    }catch (e){
      console.error("Cannot write file ", e);
    }
  }
}
