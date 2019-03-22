/* eslint-disable @typescript-eslint/camelcase, global-require */

'use strict'; // eslint-disable-line

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import { join } from 'path';
import minifyliterals from 'rollup-plugin-minifyliterals';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import { postcss } from '@minna-ui/rollup-plugins';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/t.js',
    format: 'esm',
    // name: 't', // "timer"
    sourcemap: true,
  },
  plugins: [
    postcss(),
    resolve(),
    typescript({
      typescript: require('typescript'),
    }),
    isProd && minifyliterals({ literals: true }),
    isProd &&
      compiler({
        compilation_level: 'SIMPLE',
        // compilation_level: 'ADVANCED',
        externs: [join(__dirname, 'externs.js')],
        // language_in: 'ECMASCRIPT_NEXT',
        // language_out: 'STABLE',
        // warning_level: 'VERBOSE',
        // jscomp_off: 'globalThis',
        // debug: true,
        // formatting: 'PRETTY_PRINT',
      }),
  ],
};
