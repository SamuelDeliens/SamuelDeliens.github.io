import Experience from "../Experience.ts";
import * as THREE from "three";

import ballF from "../Shaders/ballF.glsl?raw";
import ballV from "../Shaders/ballV.glsl?raw";

import glassF from "../Shaders/glassF.glsl?raw";
import glassV from "../Shaders/glassV.glsl?raw";

export interface Globe {
    ballMesh: THREE.Mesh;
    ballMat: THREE.ShaderMaterial;
    glassMesh: THREE.Mesh;
    glassMat: THREE.ShaderMaterial;
    cubeCamera: THREE.CubeCamera;
    cubeRenderTarget: THREE.WebGLCubeRenderTarget;
}
export interface GlobeFactoryInput {
    timeline: {
        first: {
            position: THREE.Vector3;
            scale: number;
        };
        second: {
            position: THREE.Vector3;
            scale: number;
        };
    }
    baseFirst: THREE.Vector3;
    baseSecond: THREE.Vector3;
    baseThird: THREE.Vector3;
}

export const globesData: GlobeFactoryInput[] = [
    {
        timeline: {
            first: {position: new THREE.Vector3(0, 0, 0), scale: 1},
            second: {position: new THREE.Vector3(0, 0, 0), scale: 0.6}
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: { position: new THREE.Vector3(-0.4, 0.8, 0.8), scale: 0.1 },
            second: { position: new THREE.Vector3(-4.5, 2.2, 0.5), scale: 0.18 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: { position: new THREE.Vector3(0.8, -0.8, -0.4), scale: 0.1 },
            second: { position: new THREE.Vector3(3.2, -1.8, -0.4), scale: 0.27 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: { position: new THREE.Vector3(-0.8, 0.8, 0.1), scale: 0.1 },
            second: { position: new THREE.Vector3(-1.7, 0.3, 0.1), scale: 0.14 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: { position: new THREE.Vector3(-0.8, 0.8, 0.1), scale: 0.1 },
            second: { position: new THREE.Vector3(0.0, 1.5, -0.8), scale: 0.25 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: { position: new THREE.Vector3(-0.7, 0.7, 0.1), scale: 0.1 },
            second: { position: new THREE.Vector3(2.4, -2.0, 0.9), scale: 0.09 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: { position: new THREE.Vector3(-0.5, 0.9, 0.4), scale: 0.1 },
            second: { position: new THREE.Vector3(-3.6, 0.96, 0.3), scale: 0.23 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },

    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, 0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(-3, 1.8, 0.4), scale: 0.31}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, 0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(-3.94, 2.86, 0.73), scale: 0.18}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, 0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(-3.79, 1.94, 0.43), scale: 0.08}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, 0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(-2.74, 0.93, 0.43), scale: 0.13}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, 0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(1.94, 2.86, 0.73), scale: 0.19}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, 0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(0.95, -2.21, -0.51), scale: 0.14}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, 0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(0.64, -2.86, 0.73), scale: 0.08}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },

    {
        timeline: {
            first: {position: new THREE.Vector3(0.8, -0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(3.5, -2.2, 0.3), scale: 0.23}
        },
        baseFirst: new THREE.Vector3(0.3, 0.7, 0.9),
        baseSecond: new THREE.Vector3(1.0, 0.5, 0.2),
        baseThird: new THREE.Vector3(0.9, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(0.8, -0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(5.3, -2.2, 0.1), scale: 0.34}
        },
        baseFirst: new THREE.Vector3(0.3, 0.7, 0.9),
        baseSecond: new THREE.Vector3(1.0, 0.5, 0.2),
        baseThird: new THREE.Vector3(0.9, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(0.8, -0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(4.8, -3.1, 0.5), scale: 0.14}
        },
        baseFirst: new THREE.Vector3(0.3, 0.7, 0.9),
        baseSecond: new THREE.Vector3(1.0, 0.5, 0.2),
        baseThird: new THREE.Vector3(0.9, 0.8, 0.4)
    },

    {
        timeline: {
            first: {position: new THREE.Vector3(0.8, 0.8, -0.8), scale: 0.1},
            second: {position: new THREE.Vector3(4.1, 2.5, -0.2), scale: 0.46}
        },
        baseFirst: new THREE.Vector3(0.6, 0.3, 0.9),
        baseSecond: new THREE.Vector3(0.3, 0.9, 0.7),
        baseThird: new THREE.Vector3(0.9, 0.6, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(0.8, 0.8, -0.8), scale: 0.1},
            second: {position: new THREE.Vector3(4.5, 1.1, -0.2), scale: 0.23}
        },
        baseFirst: new THREE.Vector3(0.6, 0.3, 0.9),
        baseSecond: new THREE.Vector3(0.3, 0.9, 0.7),
        baseThird: new THREE.Vector3(0.9, 0.6, 0.4)
    },

    {
        timeline: {
            first: {position: new THREE.Vector3(-0.8, -0.8, 0.8), scale: 0.1},
            second: {position: new THREE.Vector3(-2.8, -2.3, 0.3), scale: 0.43}
        },
        baseFirst: new THREE.Vector3(0.7, 0.7, 0.2),
        baseSecond: new THREE.Vector3(0.2, 0.8, 0.9),
        baseThird: new THREE.Vector3(0.4, 0.5, 0.9)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(-0.6, 0.5, 0.4), scale: 0.1},
            second: {position: new THREE.Vector3(-3.9, -1.8, -0.1), scale: 0.28}
        },
        baseFirst: new THREE.Vector3(0.7, 0.7, 0.2),
        baseSecond: new THREE.Vector3(0.2, 0.8, 0.9),
        baseThird: new THREE.Vector3(0.4, 0.5, 0.9)
    },
];


export default class Globes {
    experience: Experience
    scene: THREE.Scene;

    globes: Globe[] = [];

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setGlobes();
    }

    setGlobes() {
        globesData.forEach((globeData) => {
            const globe = this.createGlobe(globeData);
            const cubeCamera = this.createCubeRenderCamera(globeData);

            const completeGlobe: Globe = {
                ...globe,
                ...cubeCamera
            }

            this.globes.push(completeGlobe);
            this.scene.add(completeGlobe.ballMesh);
            this.scene.add(completeGlobe.glassMesh);
        });
    }

    createGlobe(globeData: GlobeFactoryInput) {
        const ballMat = new THREE.ShaderMaterial({
            extensions: {
                derivatives: `#extension 
                GL_OES_standard_derivatives: enable`,
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { value: 0 },
                baseFirst: { value: globeData.baseFirst.clone()},
                baseSecond: { value: globeData.baseSecond.clone()},
                baseThird: { value: globeData.baseThird.clone()},
                resolution: { value: new THREE.Vector4() },
            },
            //wireframe: false,
            //transparent: true,
            vertexShader:ballV,
            fragmentShader: ballF,
        });

        const ballGeo = new THREE.SphereGeometry(1.5, 32, 32);
        const ballMesh = new THREE.Mesh(ballGeo, ballMat);

        ballMesh.position.copy(globeData.timeline.first.position);
        ballMesh.scale.set(globeData.timeline.first.scale, globeData.timeline.first.scale, globeData.timeline.first.scale)


        const glassMat = new THREE.ShaderMaterial({
            extensions: {
                derivatives: `#extension 
                GL_OES_standard_derivatives: enable`,
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { value: 0 },
                tCube: { value: 0 },
                resolution: { value: new THREE.Vector4() },
            },
            //wireframe: false,
            //transparent: true,
            vertexShader:glassV,
            fragmentShader: glassF,
        });

        const glassGeo = new THREE.SphereGeometry(2, 32, 32);
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);

        glassMesh.position.copy(globeData.timeline.first.position);
        glassMesh.scale.set(globeData.timeline.first.scale, globeData.timeline.first.scale, globeData.timeline.first.scale)

        return {
            ballMesh: ballMesh,
            ballMat: ballMat,
            glassMesh: glassMesh,
            glassMat: glassMat
        };
    }
    createCubeRenderCamera(globeData: GlobeFactoryInput) {
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
        });
        const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
        cubeCamera.position.copy(globeData.timeline.first.position);


        return {
            cubeRenderTarget: cubeRenderTarget,
            cubeCamera: cubeCamera
        }
    }

    update() {
        this.globes.forEach((globe) => {
            globe.glassMesh.visible = false;
            globe.cubeCamera.position.copy(globe.ballMesh.position);
            globe.cubeCamera.update(this.experience.renderer.renderer, this.scene);
            globe.glassMesh.visible = true;
            globe.ballMat.uniforms.time.value = this.experience.time.elapsed * 0.001;
            globe.glassMat.uniforms.tCube.value = globe.cubeRenderTarget.texture;
        });
    }

}