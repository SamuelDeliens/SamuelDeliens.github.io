import {
    Vector2
} from 'three';

/**
 * @module DotScreenShader
 * @three_import import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
 */

/**
 * Dot screen shader based on [glfx.js sepia shader]{@link https://github.com/evanw/glfx.js}.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
const DotScreenShader = {

    name: 'DotScreenShader',

    uniforms: {

        'tDiffuse': { value: null },
        'tSize': { value: new Vector2( 256, 256 ) },
        'center': { value: new Vector2( 0.5, 0.5 ) },
        'angle': { value: 1.57 },
        'scale': { value: 1.0 }

    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}
		
		float rand(vec2 p) {
            vec2 k1 = vec2 (
                23.14069263277926, // e^pi (Gelfond's constant)
                2.665144142690225 // 2^sqrt(2) (Gelfond-Schneider constant)
            );
            return fract(
                cos(dot(p, k1)) * 12345.6789
            );
        }

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );
			
			vec2 uvrandom = vUv;
			uvrandom.y *= rand(vec2(uvrandom.y, 0.4));
			color.rgb += rand(uvrandom) * 0.15;

            gl_FragColor = color;
		}`

};

export { DotScreenShader };
