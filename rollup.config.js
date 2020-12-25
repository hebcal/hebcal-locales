import {nodeResolve} from '@rollup/plugin-node-resolve';
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
          ['@babel/preset-env', {
            modules: false,
            targets: {
              node: '10.21.0',
            },
          }],
        ],
        exclude: ['node_modules/**'],
      }),
      nodeResolve(),
    ],
    external: ['@hebcal/core'],
  },
  {
    input: 'src/locale.js',
    output: {file: pkg.module, format: 'es', name: pkg.name},
    plugins: [
      json({compact: true}),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            modules: false,
            targets: {
              node: '10.21.0',
            },
          }],
        ],
        exclude: ['node_modules/**'],
      }),
      nodeResolve(),
    ],
    external: ['@hebcal/core'],
  },
  {
    input: 'src/locale.js',
    output: [
      {
        file: pkg.browser,
        format: 'iife',
        globals: {
          '@hebcal/core': 'hebcal',
        },
        indent: false,
      },
      {
        file: 'dist/bundle.min.js',
        format: 'iife',
        globals: {
          '@hebcal/core': 'hebcal',
        },
        plugins: [terser()],
      },
    ],
    plugins: [
      json({compact: true}),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
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
      nodeResolve(),
    ],
    external: ['@hebcal/core'],
  },
];
