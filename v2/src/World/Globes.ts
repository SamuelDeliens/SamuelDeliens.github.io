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
    radius: number;
    position: THREE.Vector3;
    baseFirst: THREE.Vector3;
    baseSecond: THREE.Vector3;
    baseThird: THREE.Vector3;
}

const globesData: GlobeFactoryInput[] = [
    {
        radius: 1.5,
        position: new THREE.Vector3(0, 0, 0),
        baseFirst: new THREE.Vector3(120./255., 158./255.,113./255.),
        baseSecond: new THREE.Vector3(224./255., 148./255.,66./255.),
        baseThird: new THREE.Vector3(232./255., 201./255.,73./255.)
    },
    {
        radius: 0.6,
        position: new THREE.Vector3(0, 0, -3),
        baseFirst: new THREE.Vector3(150./255., 120./255.,11./255.),
        baseSecond: new THREE.Vector3(100./255., 34./255.,168./255.),
        baseThird: new THREE.Vector3(100./255., 2001./255.,54./255.)
    }
]

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
        console.log(globeData);
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

        const ballGeo = new THREE.SphereGeometry(globeData.radius, 64, 64);
        const ballMesh = new THREE.Mesh(ballGeo, ballMat);

        ballMesh.position.copy(globeData.position);


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

        const glassGeo = new THREE.SphereGeometry(globeData.radius + 0.5, 64, 64);
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);

        glassMesh.position.copy(globeData.position);

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
        cubeCamera.position.copy(globeData.position);


        return {
            cubeRenderTarget: cubeRenderTarget,
            cubeCamera: cubeCamera
        }
    }

    update() {
        this.globes.forEach((globe) => {
            globe.glassMesh.visible = false;
            globe.cubeCamera.update(this.experience.renderer.renderer, this.scene);
            globe.glassMesh.visible = true;
            globe.ballMat.uniforms.time.value = this.experience.time.elapsed * 0.001;
            globe.glassMat.uniforms.tCube.value = globe.cubeRenderTarget.texture;
        });
    }

}