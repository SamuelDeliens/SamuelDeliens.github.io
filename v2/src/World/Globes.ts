import Experience from "../Experience.ts";
import * as THREE from "three";

import ballF from "../Shaders/ballF.glsl?raw";
import ballV from "../Shaders/ballV.glsl?raw";

import glassF from "../Shaders/glassF.glsl?raw";
import glassV from "../Shaders/glassV.glsl?raw";

export const SHADER_DEFAULT_SPEED = 0.001;
export const SHADER_SLOW_SPEED = 0.0001;

export interface GlobeInterface {
    ballMesh: THREE.Mesh;
    ballMat: THREE.ShaderMaterial;
    glassMesh: THREE.Mesh;
    glassMat: THREE.ShaderMaterial;
    cubeCamera: THREE.CubeCamera;
    cubeRenderTarget: THREE.WebGLCubeRenderTarget;
}

export interface GlobeStep {
    position: THREE.Vector3;
    scale?: number;
    rotation?: THREE.Euler;
}
export interface GlobeFactoryInput {
    timeline: {
        initial: GlobeStep;
        first: GlobeStep;
        second: GlobeStep;
        third: {
            projectId: number,
            stay?: boolean,
            show: GlobeStep,
            hide: GlobeStep
        }
    }
    baseFirst: THREE.Vector3;
    baseSecond: THREE.Vector3;
    baseThird: THREE.Vector3;
}

export const globesData: GlobeFactoryInput[] = [
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, 0), scale: 1},
            first: {position: new THREE.Vector3(0, 0, 0), scale: 0.6},
            second: {position: new THREE.Vector3(0, 1.5, 0), scale: 0.4},
            third: {
                projectId: 1,
                stay: true,
                show: {position: new THREE.Vector3(0, 1.5, 0), scale: 0.5},
                hide: {position: new THREE.Vector3(-2, 5.5, -0.4), scale: 0.3},
            }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
/*    {
        timeline: {
            initial: { position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(35, 30, 10) },
            first: { position: new THREE.Vector3(-4.5, 2.2, 0.5), scale: 0.18 },
            second: { position: new THREE.Vector3(0.72, 2.51, 0.9), scale: 0.13 },
            third: {
                projectId: 1,
                show: { position: new THREE.Vector3(0, 1.5, 0), scale: 0 },
                hide: {position: new THREE.Vector3(2.5, 6.2, 1.3), scale: 0.1},
            }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },*/
/*    {
        timeline: {
            initial: { position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(15, 90, 90) },
            first: { position: new THREE.Vector3(3.2, -1.8, -0.4), scale: 0.27 },
            second: { position: new THREE.Vector3(0.70, 1.1, 0.9), scale: 0.19 },
            third: {
                projectId: 1,
                show: { position: new THREE.Vector3(0, 1.5, 0), scale: 0 },
                hide: {position: new THREE.Vector3(4.21, 5.7, 1.6), scale: 0.13},
            }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },*/
/*    {
        timeline: {
            initial: { position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(90, 15, 10) },
            first: { position: new THREE.Vector3(-1.7, 0.3, 0.1), scale: 0.14 },
            second: { position: new THREE.Vector3(-1, 1.25, 0.1), scale: 0.09 },
            third: {
                projectId: 1,
                show: { position: new THREE.Vector3(0, 1.5, 0), scale: 0 },
                hide: {position: new THREE.Vector3(-2.49, 5.1, -0.6), scale: 0.04},
            }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },*/
    {
        timeline: {
            initial: { position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(20, 25, 10) },
            first: { position: new THREE.Vector3(0.0, 1.5, -0.8), scale: 0.25 },
            second: { position: new THREE.Vector3(-0.13, 2.15, -0.8), scale: 0.18 },
            third: {
                projectId: 1,
                show: { position: new THREE.Vector3(0, 1.5, 0), scale: 0 },
                hide: {position: new THREE.Vector3(-3.12, 5.86, -2.1), scale: 0.1},
            }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
/*    {
        timeline: {
            first: { position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(90, 90, 90) },
            second: { position: new THREE.Vector3(2.4, -2.0, 0.9), scale: 0.09 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: { position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(0, 15, 0) },
            second: { position: new THREE.Vector3(-3.6, 0.96, 0.3), scale: 0.23 }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(15, 0, 90)},
            second: {position: new THREE.Vector3(-5.1, -2.3, 0.3), scale: 0.09}
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },*/
    {
        timeline: {
            initial: { position: new THREE.Vector3(0, 0, -3), scale: 0.1, rotation: new THREE.Euler(35, 30, 10) },
            first: { position: new THREE.Vector3(-6.5, -1.2, 0.5), scale: 0.4 },
            second: { position: new THREE.Vector3(-0.7, 0.8, 0.5), scale: 0.25 },
            third: {
                projectId: 1,
                show: { position: new THREE.Vector3(0, 1.5, 0), scale: 0 },
                hide: {position: new THREE.Vector3(-2.61, 6.19, 1.4), scale: 0.19},
            }
        },
        baseFirst: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255),
        baseSecond: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255),
        baseThird: new THREE.Vector3(232 / 255, 201 / 255, 73 / 255)
    },

    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(-3, 1.8, 0.4), scale: 0.31},
            second: {position: new THREE.Vector3(-4, 1.5, 0.4), scale: 0.42},
            third: {
                projectId: 2,
                stay: true,
                show: { position: new THREE.Vector3(-4, 1.5, 0.4), scale: 1 },
                hide: {position: new THREE.Vector3(-8.6, 1.21, 1.11), scale: 0.4},
            }
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(-3.94, 2.86, 0.73), scale: 0.18},
            second: {position: new THREE.Vector3(-4.7, 2.31, 0.6), scale: 0.18},
            third: {
                projectId: 2,
                show: { position: new THREE.Vector3(-4, 1.5, 0.4), scale: 0 },
                hide: {position: new THREE.Vector3(-9.2, 5.11, 0.2), scale: 0.15},
            }
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
/*    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(-3.79, 1.94, 0.43), scale: 0.08},
            second: {position: new THREE.Vector3(-3.85, 2.65, 0.43), scale: 0.08},
            third: {
                projectId: 2,
                show: { position: new THREE.Vector3(-4, 1.5, 0.4), scale: 0 },
                hide: {position: new THREE.Vector3(-7.19, -1.65, 1.21), scale: 0.04},
            }
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },*/
/*    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(-2.74, 0.93, 0.43), scale: 0.13},
            second: {position: new THREE.Vector3(-3.3, 0.86, 0.43), scale: 0.13},
            third: {
                projectId: 2,
                show: { position: new THREE.Vector3(-4, 1.5, 0.4), scale: 0 },
                hide: {position: new THREE.Vector3(-9.52, -0.83, 0.21), scale: 0.1},
            }
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },*/
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(1.94, 2.86, 0.73), scale: 0.19},
            second: {position: new THREE.Vector3(-5, 1.2, 0.5), scale: 0.25},
            third: {
                projectId: 2,
                show: { position: new THREE.Vector3(-4, 1.5, 0.4), scale: 0 },
                hide: {position: new THREE.Vector3(-9.74, 1.83, 1.05), scale: 0.2},
            }
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
/*    {
        timeline: {
            first: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            second: {position: new THREE.Vector3(0.95, -2.21, -0.51), scale: 0.14}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            second: {position: new THREE.Vector3(0.64, -2.86, 0.73), scale: 0.08}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },
    {
        timeline: {
            first: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            second: {position: new THREE.Vector3(-4.2, 3.8, 0.4), scale: 0.27}
        },
        baseFirst: new THREE.Vector3(0.8, 0.2, 0.3),
        baseSecond: new THREE.Vector3(0.2, 0.6, 0.8),
        baseThird: new THREE.Vector3(0.4, 0.8, 0.4)
    },*/

    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(5.3, -2.2, 0.1), scale: 0.34},
            second: {position: new THREE.Vector3(0, -1.9, 0.1), scale: 0.39},
            third: {
                projectId: 3,
                stay: true,
                show: { position: new THREE.Vector3(0, -1.9, 0.1), scale: 1 },
                hide: {position: new THREE.Vector3(0.5, -5.21, -0.31), scale: 0.3},
            }
        },
        baseFirst: new THREE.Vector3(0.3, 0.7, 0.9),
        baseSecond: new THREE.Vector3(1.0, 0.5, 0.2),
        baseThird: new THREE.Vector3(0.9, 0.8, 0.4)
    },
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(3.5, -2.2, 0.3), scale: 0.23},
            second: {position: new THREE.Vector3(-0.81, -2.4, 0.3), scale: 0.23},
            third: {
                projectId: 3,
                show: { position: new THREE.Vector3(0, -1.9, 0.1), scale: 0 },
                hide: {position: new THREE.Vector3(-2.1, -6.74, 0.84), scale: 0.2},
            }
        },
        baseFirst: new THREE.Vector3(0.3, 0.7, 0.9),
        baseSecond: new THREE.Vector3(1.0, 0.5, 0.2),
        baseThird: new THREE.Vector3(0.9, 0.8, 0.4)
    },
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(4.8, -3.1, 0.5), scale: 0.14},
            second: {position: new THREE.Vector3(0.4, -2.13, 0.9), scale: 0.14},
            third: {
                projectId: 3,
                show: { position: new THREE.Vector3(0, -1.9, 0.1), scale: 0 },
                hide: {position: new THREE.Vector3(1.7, -5.96, 1.04), scale: 0.1},
            }
        },
        baseFirst: new THREE.Vector3(0.3, 0.7, 0.9),
        baseSecond: new THREE.Vector3(1.0, 0.5, 0.2),
        baseThird: new THREE.Vector3(0.9, 0.8, 0.4)
    },

    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(4.1, 2.5, -0.2), scale: 0.46},
            second: {position: new THREE.Vector3(4.06, 1.5, -0.1), scale: 0.46},
            third: {
                projectId: 4,
                stay: true,
                show: { position: new THREE.Vector3(4.06, 1.5, -0.1), scale: 1 },
                hide: {position: new THREE.Vector3(10.1, 2.1, -0.21), scale: 0.4},
            }
        },
        baseFirst: new THREE.Vector3(0.6, 0.3, 0.9),
        baseSecond: new THREE.Vector3(0.3, 0.9, 0.7),
        baseThird: new THREE.Vector3(0.9, 0.6, 0.4)
    },
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(4.5, 1.1, -0.2), scale: 0.23},
            second: {position: new THREE.Vector3(3.44, 0.8, 0.7), scale: 0.23},
            third: {
                projectId: 4,
                show: { position: new THREE.Vector3(4.06, 1.5, -0.1), scale: 0 },
                hide: {position: new THREE.Vector3(7.64, 3.94, 0.71), scale: 0.2},
            }
        },
        baseFirst: new THREE.Vector3(0.6, 0.3, 0.9),
        baseSecond: new THREE.Vector3(0.3, 0.9, 0.7),
        baseThird: new THREE.Vector3(0.9, 0.6, 0.4)
    },
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(6.3, 2.9, -0.2), scale: 0.32},
            second: {position: new THREE.Vector3(5.28, 1.3, -0.4), scale: 0.32},
            third: {
                projectId: 4,
                show: { position: new THREE.Vector3(4.06, 1.5, -0.1), scale: 0 },
                hide: {position: new THREE.Vector3(9.41, 1.1, -0.5), scale: 0.3},
            }
        },
        baseFirst: new THREE.Vector3(0.6, 0.3, 0.9),
        baseSecond: new THREE.Vector3(0.3, 0.9, 0.7),
        baseThird: new THREE.Vector3(0.9, 0.6, 0.4)
    },

    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(-2.8, -2.3, 0.3), scale: 0.43},
            second: {position: new THREE.Vector3(-4.09, -2.02, 0.1), scale: 0.43},
            third: {
                projectId: 5,
                stay: true,
                show: { position: new THREE.Vector3(-4.09, -2.02, 0.1), scale: 1},
                hide: {position: new THREE.Vector3(-7.1, -2.1, 0.2), scale: 0.4},
            }
        },
        baseFirst: new THREE.Vector3(0.7, 0.7, 0.2),
        baseSecond: new THREE.Vector3(0.2, 0.8, 0.9),
        baseThird: new THREE.Vector3(0.4, 0.5, 0.9)
    },
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(-3.9, -1.8, -0.1), scale: 0.28},
            second: {position: new THREE.Vector3(-4.79, -1.24, 0.2), scale: 0.26},
            third: {
                projectId: 5,
                show: { position: new THREE.Vector3(-4.09, -2.02, 0.1), scale: 0},
                hide: {position: new THREE.Vector3(-8.54, -3.01, 0.25), scale: 0.2},
            }
        },
        baseFirst: new THREE.Vector3(0.7, 0.7, 0.2),
        baseSecond: new THREE.Vector3(0.2, 0.8, 0.9),
        baseThird: new THREE.Vector3(0.4, 0.5, 0.9)
    },
    {
        timeline: {
            initial: {position: new THREE.Vector3(0, 0, -3), scale: 0.1},
            first: {position: new THREE.Vector3(2.8, 0.3, 0.3), scale: 0.08},
            second: {position: new THREE.Vector3(-4.62, -1.2, 0.59), scale: 0.08},
            third: {
                projectId: 5,
                show: { position: new THREE.Vector3(-4.09, -2.02, 0.1), scale: 0},
                hide: {position: new THREE.Vector3(-7.54, -1.01, 1.02), scale: 0.07},
            }
        },
        baseFirst: new THREE.Vector3(0.7, 0.7, 0.2),
        baseSecond: new THREE.Vector3(0.2, 0.8, 0.9),
        baseThird: new THREE.Vector3(0.4, 0.5, 0.9)
    },
];


export default class Globes {
    experience: Experience
    scene: THREE.Scene;

    globes: GlobeInterface[] = [];
    detailedGeo: { [key: number]: THREE.SphereGeometry } = {};
    detailedGlass: { [key: number]: {
        glassMesh: THREE.Mesh;
        glassMat: THREE.ShaderMaterial;
        cubeCamera: THREE.CubeCamera;
        cubeRenderTarget: THREE.WebGLCubeRenderTarget;
    }} = {};

    currentGroup: THREE.Group = new THREE.Group();

    speed: number = SHADER_DEFAULT_SPEED;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.scene.add(this.currentGroup);

        this.setGlobes();
    }

    private setGlobes() {
        globesData.forEach((globeData) => {
            this.setGlobe(globeData);
        });
    }
    private setGlobe(globeData: GlobeFactoryInput) {
        const globe = this.createGlobe(globeData);

        this.globes.push(globe);
        this.scene.add(globe.ballMesh);
        this.scene.add(globe.glassMesh);

        if (globeData.timeline.third.stay) {
            this.detailedGeo[globeData.timeline.third.projectId] = new THREE.SphereGeometry(3, 32, 32);
            this.detailedGlass[globeData.timeline.third.projectId] = {
                glassMesh: globe.glassMesh.clone(),
                glassMat: globe.glassMat.clone(),
                cubeCamera: globe.cubeCamera,
                cubeRenderTarget: globe.cubeRenderTarget
            }
            this.detailedGlass[globeData.timeline.third.projectId].glassMesh.visible = false;
            this.scene.add(this.detailedGlass[globeData.timeline.third.projectId].glassMesh);
        }
    }

    private createGlobe(globeData: GlobeFactoryInput, rB?:number, sB ?:number, rG ?:number, sG ?:number): GlobeInterface {
        const [ballMesh, ballMat] = this.createBall(globeData, rB, sB);
        const [glassMesh, glassMat] = this.createGlass(globeData, rG, sG);
        const cubeCamera = this.createCubeRenderCamera(globeData);

        return {
            ballMesh: ballMesh,
            ballMat: ballMat,
            glassMesh: glassMesh,
            glassMat: glassMat,
            ...cubeCamera
        };
    }

    private createBall(globeData: GlobeFactoryInput, radius = 1.5, segments = 8): [THREE.Mesh, THREE.ShaderMaterial] {
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

        const ballGeo = new THREE.SphereGeometry(radius, segments, segments);
        const ballMesh = new THREE.Mesh(ballGeo, ballMat);

        ballMesh.position.copy(globeData.timeline.initial.position);
        ballMesh.scale.set(globeData.timeline.initial.scale ?? 1, globeData.timeline.initial.scale ?? 1, globeData.timeline.initial.scale ?? 1)
        ballMesh.rotation.copy(globeData.timeline.initial.rotation || new THREE.Euler(0, 0, 0));

        return [ballMesh, ballMat];
    }
    private createGlass(globeData: GlobeFactoryInput, radius = 2, segments = 64): [THREE.Mesh, THREE.ShaderMaterial] {
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

        const glassGeo = new THREE.SphereGeometry(radius, segments, segments);
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);

        glassMesh.position.copy(globeData.timeline.initial.position);
        glassMesh.scale.set(globeData.timeline.initial.scale ?? 1, globeData.timeline.initial.scale ?? 1, globeData.timeline.initial.scale ?? 1)

        return [glassMesh, glassMat]
    }
    private createCubeRenderCamera(globeData: GlobeFactoryInput) {
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
        });
        const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
        cubeCamera.position.copy(globeData.timeline.initial.position);


        return {
            cubeRenderTarget: cubeRenderTarget,
            cubeCamera: cubeCamera
        }
    }

    moveObjectPreserveWorldTransform(object: THREE.Mesh, newParent: THREE.Group | THREE.Scene) {
        const worldPosition = new THREE.Vector3();
        const worldQuaternion = new THREE.Quaternion();
        const worldScale = new THREE.Vector3();

        object.getWorldPosition(worldPosition);
        object.getWorldQuaternion(worldQuaternion);
        object.getWorldScale(worldScale);

        newParent.add(object);

        object.position.copy(worldPosition);
        object.quaternion.copy(worldQuaternion);
        object.scale.copy(worldScale);
    }

    update() {
        this.globes.forEach(globe => globe.glassMesh.visible = false);

        const detailedGlassVisibilityState = new Map<number, boolean>();
        Object.entries(this.detailedGlass).forEach(([projectId, dg]) => {
            detailedGlassVisibilityState.set(parseInt(projectId), dg.glassMesh.visible);
            dg.glassMesh.visible = false;
        });

        this.globes.forEach((globe) => {
            if (!globe.ballMesh.visible) return;
            globe.cubeCamera.position.copy(globe.ballMesh.position);
            globe.cubeCamera.update(this.experience.renderer.renderer, this.scene);
        });

        Object.entries(this.detailedGlass).forEach(([projectId, dg]) => {
            const wasVisible = detailedGlassVisibilityState.get(parseInt(projectId));
            dg.glassMesh.visible = wasVisible || false;
        });

        this.globes.forEach((globe) => {
            if (!globe.ballMesh.visible) return;
            globe.glassMesh.visible = true;
            globe.ballMat.uniforms.time.value = this.experience.time.elapsed * this.speed;
            globe.glassMat.uniforms.tCube.value = globe.cubeRenderTarget.texture;
        });
    }

}