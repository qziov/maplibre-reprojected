import * as twgl from 'twgl.js';
import { initArrugator } from './utils/initArrugator';
import { GeoAlignedImageLayerOptions, MapLibreRenderArgs } from './types';

export class GeoAlignedImageLayer {
    id: string;
    type: 'custom';
    renderingMode: '2d';
    imageUrl: string;
    options: Required<GeoAlignedImageLayerOptions>;
    arrugado: ReturnType<typeof initArrugator>;

    // Internal state
    visibility: 'visible' | 'none' = 'visible';
    map: any = null;
    gl: WebGLRenderingContext | null = null;
    programInfo: any = null;
    bufferInfo: any = null;
    texture: WebGLTexture | null = null;
    ready = false;

    constructor(id: string, imageUrl: string, options: Partial<GeoAlignedImageLayerOptions> = {}) {
        this.id = id;
        this.type = 'custom';
        this.renderingMode = '2d';
        this.imageUrl = imageUrl;
        this.options = {
            opacity: options.opacity ?? 1.0,
            projection: options.projection || 'EPSG:4326',
            coordinates: options.coordinates!,
            resampling: options.resampling || 'linear',
        };

        if (!options.coordinates || options.coordinates.length !== 4) {
            console.error('GeoAlignedImageLayer: coordinates must be 4 points [tl, tr, br, bl]');
        }

        this.arrugado = initArrugator(this.options.projection, this.options.coordinates);
    }

    onAdd(map: any, gl: WebGLRenderingContext) {
        this.map = map;
        this.gl = gl;

        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = this.imageUrl;

        image.onload = () => {
            const { pos, uv, trigs } = this.arrugado;

            this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
                position: { numComponents: 2,  data:pos },
                texcoord: { numComponents: 2,  data:uv },
                indices: trigs,
            });

            this.texture = twgl.createTexture(gl, {
                src: image,
                flipY: 0,
                min: gl.LINEAR,
                mag: gl.LINEAR,
                wrap: gl.CLAMP_TO_EDGE,
            });

            const vs = `
        attribute vec2 position;
        attribute vec2 texcoord;
        varying vec2 v_texcoord;
        uniform mat4 u_matrix;
        void main() {
          gl_Position = u_matrix * vec4(position, 0.0, 1.0);
          v_texcoord = texcoord;
        }
      `;

            const fs = `
        precision mediump float;
        uniform sampler2D u_texture;
        uniform float u_opacity;
        varying vec2 v_texcoord;
        void main() {
          vec4 color = texture2D(u_texture, v_texcoord);
          gl_FragColor = vec4(color.rgb, color.a * u_opacity);
        }
      `;

            this.programInfo = twgl.createProgramInfo(gl, [vs, fs]);
            this.ready = true;
            this.map.triggerRepaint();
        };

        image.onerror = () => {
            console.error('Failed to load image:', this.imageUrl);
            this.ready = true;
            this.map?.triggerRepaint();
        };
    }

    render(gl: WebGLRenderingContext,args: MapLibreRenderArgs) {
        if (!this.ready || !this.programInfo || !this.texture) return;
        if (this.visibility === 'none') return;

        gl.useProgram(this.programInfo.program);

        twgl.setUniforms(this.programInfo, {
            u_matrix: args.defaultProjectionData.mainMatrix,
            u_texture: this.texture,
            u_opacity: this.options.opacity,
        });

        twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
        twgl.drawBufferInfo(gl, this.bufferInfo, gl.TRIANGLES);
    }

    setOpacity(opacity: number) {
        this.options.opacity = opacity;
        this.map?.triggerRepaint();
    }

    setImageUrl(url: string) {
        this.imageUrl = url;
        if (this.gl && this.map) {
            this.texture = twgl.createTexture(this.gl, {
                src: url,
                flipY: 0,
                min: this.gl.LINEAR,
                mag: this.gl.LINEAR,
                wrap: this.gl.CLAMP_TO_EDGE,
            });
            this.map.triggerRepaint();
        }
    }

    setLayoutProperty(name: string, value: any) {
        if (name === 'visibility') {
            this.visibility = value as 'visible' | 'none';
            this.map?.triggerRepaint();
        }
    }

    getLayoutProperty(name: string): any {
        if (name === 'visibility') return this.visibility;
        return null;
    }
}