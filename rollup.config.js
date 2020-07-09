import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';

export default [
  {
    input: 'src/locale.js',
    output: {file: pkg.main, format: 'cjs', name: pkg.name},
    plugins: [
      json({compact: true}),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/env', {
            modules: false,
            targets: {
              node: '10.21.0',
            },
          }],
        ],
        exclude: ['node_modules/**'],
      }),
      resolve(),
      commonjs(),
    ],
    external: ['@hebcal/core'],
  },
  {
    input: 'src/locale.js',
    output: [
      {
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'hebcal__locales',
        globals: {
          '@hebcal/core': 'hebcal__core',
        },
        indent: false,
      },
      {
        file: 'dist/bundle.min.js',
        format: 'umd',
        name: 'hebcal__locales',
        globals: {
          '@hebcal/core': 'hebcal__core',
        },
        plugins: [terser()],
      },
    ],
    plugins: [
      json({compact: true}),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/env', {
            modules: false,
            targets: {
              edge: '17',
              firefox: '60',
              chrome: '67',
              safari: '11.1',
            },
            useBuiltIns: 'usage',
            corejs: 3,
          }],
        ],
        exclude: ['node_modules/**'],
      }),
      resolve(),
      commonjs(),
    ],
    external: ['@hebcal/core'],
  },
];
