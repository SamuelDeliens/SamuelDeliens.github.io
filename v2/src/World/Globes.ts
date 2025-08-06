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
}

export default class Globes {
    experience: Experience
    scene: THREE.Scene;

    cubeCamera!: THREE.CubeCamera;
    cubeRenderTarget!: THREE.WebGLCubeRenderTarget;

    globes: Globe[] = [];

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.createCubeRenderCamera();
        this.setGlobes();
    }

    createCubeRenderCamera() {
        this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
        });
        this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRenderTarget);
    }

    setGlobes() {
        this.addGlobe();

        this.globes.forEach((globe) => {
            this.scene.add(globe.ballMesh);
            this.scene.add(globe.glassMesh);
        });
    }

    addGlobe() {
        const ballMat = new THREE.ShaderMaterial({
            extensions: {
                derivatives: `#extension 
                GL_OES_standard_derivatives: enable`,
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector4() },
            },
            //wireframe: false,
            //transparent: true,
            vertexShader:ballV,
            fragmentShader: ballF,
        });

        const ballGeo = new THREE.SphereGeometry(1.5, 64, 64);
        const ballMesh = new THREE.Mesh(ballGeo, ballMat);


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

        const glassGeo = new THREE.SphereGeometry(3, 64, 64);
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);


        this.globes.push({
            ballMesh: ballMesh,
            ballMat: ballMat,
            glassMesh: glassMesh,
            glassMat: glassMat
        });
    }

    update() {
        this.globes.forEach((globe) => {
            globe.glassMesh.visible = false;
            this.cubeCamera.update(this.experience.renderer.renderer, this.scene);
            globe.glassMesh.visible = true;
            globe.ballMat.uniforms.time.value = this.experience.time.elapsed * 0.001;
            globe.glassMat.uniforms.tCube.value = this.cubeRenderTarget.texture;
        });
    }

}