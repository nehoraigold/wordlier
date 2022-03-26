import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';

export default {
    input: 'src/main.ts',
    output: {
        dir: 'dist',
        preferConst: true,
    },
    plugins: [
        nodeResolve({
            preferBuiltins: true,
            browser: false,
            exportConditions: ['node'],
        }),
        commonjs(),
        typescript(),
        cleanup({ comments: 'none', extensions: ['ts', 'js'] }),
    ],
};
