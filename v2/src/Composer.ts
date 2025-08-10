import * as THREE from "three";
// @ts-ignore
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import Experience from "./Experience.ts";
// @ts-ignore
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
// @ts-ignore
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {DotScreenShader} from "./Shaders/DotScreenShader.ts";

export default class Composer {
    experience: Experience
    scene: THREE.Scene;

    composer!: EffectComposer;
    renderPass!: RenderPass;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setComposer();
    }

    private setComposer() {
        this.composer = new EffectComposer( this.experience.renderer.renderer );

        this.renderPass = new RenderPass(
            this.scene,
            this.experience.camera.currentCamera
        );
        this.composer.addPass(this.renderPass);

        const effect = new ShaderPass( DotScreenShader );
        effect.uniforms[ 'scale' ].value = 4;

        this.composer.addPass( effect );
    }

    setCamera(camera: THREE.Camera) {
        this.renderPass.camera = camera;
    }

    resize() {
        this.composer.setSize(this.experience.sizes.width, this.experience.sizes.height);
    }

    update() {
        this.composer.render();
    }
}