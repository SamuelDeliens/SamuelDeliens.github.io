import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import Experience from "./Experience.ts";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {DotScreenShader} from "./Shaders/DotScreenShader.ts";

export default class Composer {
    experience: Experience
    scene: THREE.Scene;

    composer!: EffectComposer;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setComposer();
    }

    setComposer() {
        this.composer = new EffectComposer( this.experience.renderer.renderer );
        this.composer.addPass( new RenderPass(this.scene, this.experience.camera.camera));

        const effect = new ShaderPass( DotScreenShader );
        effect.uniforms[ 'scale' ].value = 4;

        this.composer.addPass( effect );
    }

    resize() {
        this.composer.setSize(this.experience.sizes.width, this.experience.sizes.height);
    }

    update() {
        this.composer.render(this.experience.scene, this.experience.canvas);
    }
}