const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const banner = '/*! ' + pkg.name + ' v' + pkg.version + ' */';

module.exports = [
  {
    input: 'src/locale.js',
    output: [
      {file: pkg.main, format: 'cjs', name: pkg.name, banner},
    ],
    plugins: [
      json({compact: true, preferConst: true}),
    ],
    external: ['@hebcal/hdate', '@hebcal/core'],
  },
  {
    input: 'src/locale.js',
    output: [
      {file: pkg.module, format: 'es', name: pkg.name, banner},
    ],
    plugins: [
      json({compact: true, preferConst: true}),
    ],
    external: ['@hebcal/hdate', '@hebcal/core'],
  },
  {
    input: 'src/locale.js',
    output: [
      {
        file: 'dist/bundle.js',
        format: 'iife',
        globals: {
          '@hebcal/hdate': 'hebcal',
          '@hebcal/core': 'hebcal',
        },
        indent: false,
        banner,
      },
      {
        file: 'dist/bundle.min.js',
        format: 'iife',
        globals: {
          '@hebcal/hdate': 'hebcal',
          '@hebcal/core': 'hebcal',
        },
        plugins: [terser()],
        banner,
      },
    ],
    plugins: [
      json({compact: true, preferConst: true}),
    ],
    external: ['@hebcal/hdate', '@hebcal/core'],
  },
];
