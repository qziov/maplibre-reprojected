import { MercatorCoordinate } from "maplibre-gl";

// src/types.ts

/**
 * 经纬度坐标 [longitude, latitude]
 */
export type Position = [number, number];

/**
 * 纹理坐标 [u, v]
 */
export type UV = [number, number];

/**
 * 四角地理范围，顺序：[tl, tr, br, bl]
 */
export type BoundingBox4326 = [Position, Position, Position, Position];

/**
 * 支持的投影
 */
export type Projection = 'EPSG:4326' | 'WGS84';

/**
 * Arrugator 输出结果
 */
export interface ArrugadoOutput {
    projected: number[][];
    unprojected: number[][];
    uv: number[][];
    trigs: number[][];
}

/**
 * 图层配置选项
 */
export interface GeoAlignedImageLayerOptions {
    /**
     * 透明度 (0.0 - 1.0)
     * @default 1.0
     */
    opacity?: number;

    /**
     * 源图像投影
     * @default 'EPSG:4326'
     */
    projection?: Projection;

    /**
     * 图像四角的地理坐标 [tl, tr, br, bl]
     */
    coordinates: BoundingBox4326;

    /**
     * 重采样方式
     * @default 'linear'
     */
    resampling?: 'linear' | 'nearest';
}

/**
 * MapLibre 渲染参数
 */
export interface MapLibreRenderArgs {
    defaultProjectionData: {
        mainMatrix: number[];
    };
}