# web-extpack
CLI to bundle a WebExtension using webpack

Using a webpack config file with 4 more available properties that overwrite 'entry' and 'output':

- ENTRY_DIR: the entry directory (default: 'dev')
- ENTRY_FILES_EXT: only entry files with those extensions (default: ['.js'])
- OUTPUT_DIR: the output directory (default: 'output')
- OUTPUT_FILES: (default: '[name]/index.js')
