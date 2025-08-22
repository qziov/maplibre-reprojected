import Arrugator from 'arrugator';
declare const maplibregl: any;
import { Position, ArrugadoOutput } from '../types';

export function initArrugator(fromProj: string, coordinates: Position[]): {
    pos: number[];
    unpos: number[];
    uv: number[];
    trigs: number[];
} {
    if (!coordinates || coordinates.length !== 4) {
        console.error('Coordinates must be an array of 4 points: [tl, tr, br, bl]');
        return { pos: [], unpos: [], uv: [], trigs: [] };
    }

    const controlPoints: Position[] = [
        coordinates[0], // top-left
        coordinates[3], // bottom-left
        coordinates[1], // top-right
        coordinates[2]  // bottom-right
    ];

    const sourceUV: [number, number][] = [
        [0, 0], // top-left
        [0, 1], // bottom-left
        [1, 0], // top-right
        [1, 1]  // bottom-right
    ];

    function forward(coors: Position): [number, number] {
        const [lng, lat] = coors;
        if (isNaN(lng) || isNaN(lat)) {
            console.error('Invalid coordinates:', coors);
            return [0, 0];
        }
        const merc = maplibregl.MercatorCoordinate.fromLngLat({ lng, lat });
        return [merc.x, merc.y];
    }

    let arrugator: any;
    try {
        arrugator = new Arrugator(forward, controlPoints, sourceUV, [
            [0, 1, 3],
            [0, 3, 2]
        ]);

        // 检查队列
        const peek = arrugator._queue?.peek?.();
        if (!peek) {
            console.error('Arrugator queue is empty. Check input data and projection.');
            return { pos: [], unpos: [], uv: [], trigs: [] };
        }

        arrugator.step();
        arrugator.lowerEpsilon(1e-6);

    } catch (e) {
        console.error('Arrugator initialization failed:', e);
        return { pos: [], unpos: [], uv: [], trigs: [] };
    }

    const arrugado: ArrugadoOutput = arrugator.output();

    return {
        pos: arrugado.projected.flat(),
        unpos: arrugado.unprojected.flat(),
        uv: arrugado.uv.flat(),
        trigs: arrugado.trigs.flat()
    };
}