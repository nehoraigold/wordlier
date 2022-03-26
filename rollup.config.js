import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import { string } from 'rollup-plugin-string';

export default {
    input: 'src/main.ts',
    output: {
        dir: 'dist',
        preferConst: true,
    },
    plugins: [
        string({ include: 'src/lib/templates/*.*' }),
        nodeResolve({ preferBuiltins: false }),
        commonjs(),
        typescript(),
        cleanup({ comments: 'none', extensions: ['ts', 'js'] }),
    ],
};
