const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const banner = '/*! ' + pkg.name + ' v' + pkg.version + ' */';
const globals = {'@hebcal/hdate': 'hebcal'};

module.exports = {
  input: 'src/index.js',
  external: ['@hebcal/hdate'],
  output: [
    {
      dir: 'dist',
      format: 'es',
      banner,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.js',
      format: 'iife',
      globals,
      indent: false,
      banner,
    },
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      globals,
      plugins: [terser()],
      banner,
    },
  ],
};
