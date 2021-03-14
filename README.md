# web-extpack
CLI to bundle a WebExtension using webpack.

It uses a [webpack](https://www.npmjs.com/package/webpack) config file with 4 more available properties that set "entry", "output.path" and "output.filename" if not already set:

- ENTRY_DIR: The entry directory. (default: "src")
- ENTRY_FILES_EXT: Entry files with those extensions. (default: [".js"])
- OUTPUT_DIR: The output directory. (default: "build")
- OUTPUT_FILES: (default: "[name]/bundle.js")

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
- `--config`: Path to the config file. (default: "web-extpack.config.js")