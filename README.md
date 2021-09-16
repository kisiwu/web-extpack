# web-extpack
CLI to bundle a WebExtension using webpack.

It uses a [webpack](https://www.npmjs.com/package/webpack) config file with 4 more available properties that set "entry", "output.path" and "output.filename" if not already set:

- ENTRY_DIR: The entry directory. (default: "src")
- ENTRY_FILES_EXT: Entry files with those extensions. (default: [".js"])
- OUTPUT_DIR: The output directory. (default: "build")
- OUTPUT_FILES: (default: "[name]/bundle.js")

## Installation
```sh
npm install web-extpack
```

## Commands

```
web-extpack --help
```

```
web-extpack setup [options]
```

```
web-extpack build [options]
```

## Options
- `--config <path>`: Path to the config file. (default: "web-extpack.config.js")

### setup options
- `-t, --template <template-name>`: Choose a template for the config file. (choices: ["basic", "advanced"], default: "basic")
- `--src-files`: Add empty files in "src" folder if there is no "src/manifest.json".