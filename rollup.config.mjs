// rollup.config.mjs
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'umd',
            name: 'MapLibreReprojected',
            globals: {
                'maplibre-gl': 'maplibregl'
            },
            sourcemap: true
        },
        // ✅ ESM for native import
        {
            file: 'dist/index.esm.js',
            format: 'es',
            sourcemap: true
        }
    ],
    external: ['maplibre-gl'],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
        }),
        resolve({ browser: true }),
        terser()
    ]
};