import * as THREE from 'three';
import Experience from "./Experience.ts";
import Sizes from "./Utils/Sizes.ts";

export default class Renderer {
    renderer!: THREE.WebGLRenderer;

    private experience: Experience;
    scene: THREE.Scene;
    private sizes: Sizes;
    private camera: any;
    canvas: HTMLCanvasElement;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.sizes = this.experience.sizes;

        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();
    }


    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.render(this.scene, this.camera.camera);
    }

}