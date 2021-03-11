# web-extpack
CLI to bundle a WebExtension using webpack.

It uses a webpack config file with 4 more available properties that overwrite 'entry' and 'output':

- ENTRY_DIR: the entry directory (default: 'src')
- ENTRY_FILES_EXT: only entry files with those extensions (default: ['.js'])
- OUTPUT_DIR: the output directory (default: 'build')
- OUTPUT_FILES: (default: '[name]/index.js')

Commands:

```
web-extpack --help
```

```
web-extpack setup [options]
```

```
web-extpack build [options]
```
