import { Vector2 } from 'three';

/**
 * @module VignetteShader
 * @three_import import { VignetteShader } from 'three/addons/shaders/VignetteShader.js';
 */

/*
 * Vignette shader for creating strong darkening effects around the edges
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
const VignetteShader = {

    name: 'VignetteShader',

    uniforms: {

        'tDiffuse': { value: null },
        'center': { value: new Vector2( 0.5, 0.5 ) },
        'intensity': { value: 0.8 },
        'radius': { value: 0.6 },
        'softness': { value: 0.05 },
        'darkness': { value: 0.0 },
        'sharpness': { value: 8.0 },
        'aspectRatio': { value: 1.0 }

    },

    vertexShader: /* glsl */`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

    fragmentShader: /* glsl */`
		uniform sampler2D tDiffuse;
		uniform vec2 center;
		uniform float intensity;
		uniform float radius;
		uniform float softness;
		uniform float darkness;
		uniform float sharpness;
		uniform float aspectRatio;
		
		varying vec2 vUv;

		void main() {
			vec4 color = texture2D( tDiffuse, vUv );
			
			// Corriger les coordonnées pour avoir un cercle parfait
			vec2 position = vUv - center;
			position.x *= aspectRatio;
			float distance = length(position);
			
			// Créer une transition très nette avec pow() pour plus de contrôle
			float vignetteEdge = (distance - radius) / softness;
			vignetteEdge = clamp(vignetteEdge, 0.0, 1.0);
			
			// Appliquer la netteté avec une fonction exponentielle
			float vignette = pow(vignetteEdge, sharpness);
			
			// Appliquer l'intensité et permettre un masquage complet
			vignette = mix(1.0, darkness, vignette * intensity);
			
			// Appliquer l'effet à la couleur
			color.rgb *= vignette;
			
			gl_FragColor = color;
		}`

};

export { VignetteShader };