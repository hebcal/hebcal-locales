const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const banner = '/*! ' + pkg.name + ' v' + pkg.version + ' */';

module.exports = [
  {
    input: 'src/index.js',
    output: [
      {
        dir: 'dist',
        format: 'es',
        name: pkg.name,
        banner,
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
    plugins: [
      json({compact: true, preferConst: true}),
    ],
    external: ['@hebcal/hdate'],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle.js',
        format: 'iife',
        globals: {
          '@hebcal/hdate': 'hebcal',
        },
        indent: false,
        banner,
      },
      {
        file: 'dist/bundle.min.js',
        format: 'iife',
        globals: {
          '@hebcal/hdate': 'hebcal',
        },
        plugins: [terser()],
        banner,
      },
    ],
    plugins: [
      json({compact: true, preferConst: true}),
    ],
    external: ['@hebcal/hdate'],
  },
];
