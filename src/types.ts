import { MercatorCoordinate } from "maplibre-gl";

export type Position = [number, number]; // [lng, lat]
export type UV = [number, number]; // [u, v]

export interface ArrugadoOutput {
    projected: number[][];
    unprojected: number[][];
    uv: number[][];
    trigs: number[][];
}

export interface GeoAlignedImageLayerOptions {
    opacity?: number;
    projection?: string; // e.g., 'EPSG:4326'
    coordinates: Position[]; // [tl, tr, br, bl]
    resampling?: 'linear' | 'nearest';
}

// Custom MapLibre layer context
export interface MapLibreRenderArgs {
    defaultProjectionData: {
        mainMatrix: number[];
    };
}