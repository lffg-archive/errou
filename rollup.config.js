import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// eslint-disable-next-line import/no-default-export
export default {
  input: 'src/errou.ts',
  plugins: [
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    })
  ],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ]
};
