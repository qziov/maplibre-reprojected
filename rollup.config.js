import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/geo-aligned-image-layer.js',
            format: 'umd',
            name: 'MapLibreGeoAlignedImageLayer',
            globals: {
                'maplibre-gl': 'maplibregl'
            }
        }
    ],
    external: ['maplibre-gl'],
    plugins: [
        resolve({
            browser: true
        }),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        terser()
    ]
};