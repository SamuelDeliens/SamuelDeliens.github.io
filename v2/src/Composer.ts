import * as THREE from "three";
// @ts-ignore
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import Experience from "./Experience.ts";
// @ts-ignore
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
// @ts-ignore
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {DotScreenShader} from "./Shaders/DotScreenShader.ts";
import {VignetteShader} from "./Shaders/VignetteShader.ts";

export default class Composer {
    experience: Experience
    scene: THREE.Scene;

    composer!: EffectComposer;
    renderPass!: RenderPass;

    dotScreenEffect!: ShaderPass;
    vignetteEffect!: ShaderPass;

    aspectRatio: number;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.aspectRatio = this.experience.sizes.ratio;

        this.setComposer();
    }

    private setComposer() {
        this.composer = new EffectComposer( this.experience.renderer.renderer );

        this.renderPass = new RenderPass(
            this.scene,
            this.experience.camera.currentCamera
        );
        this.composer.addPass(this.renderPass);

        this.dotScreenEffect = new ShaderPass( DotScreenShader );
        this.dotScreenEffect.uniforms[ 'scale' ].value = 4;

        const vignetteEffect = new ShaderPass( VignetteShader )
        vignetteEffect.uniforms['intensity'].value = 1.0;
        vignetteEffect.uniforms['radius'].value = -0.5;
        vignetteEffect.uniforms['softness'].value = 0.25;
        vignetteEffect.uniforms['darkness'].value = 0.0;
        vignetteEffect.uniforms['sharpness'].value = 1;
        vignetteEffect.uniforms['aspectRatio'].value = this.aspectRatio;
        vignetteEffect.renderToScreen = true;

        this.vignetteEffect = vignetteEffect;

        this.composer.addPass( this.vignetteEffect );
        this.composer.addPass( this.dotScreenEffect );
    }

    setCamera(camera: THREE.Camera) {
        this.renderPass.camera = camera;
    }

    resize() {
        this.aspectRatio = this.experience.sizes.ratio;
        this.vignetteEffect.uniforms['aspectRatio'].value = this.aspectRatio;
        this.composer.setSize(this.experience.sizes.width, this.experience.sizes.height);
    }

    update() {
        this.composer.render();
    }
}