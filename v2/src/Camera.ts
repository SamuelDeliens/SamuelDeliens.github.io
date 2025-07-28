import Experience from "./Experience.ts";
import * as THREE from 'three';
import type Sizes from "./Utils/Sizes.ts";

export default class Camera {

    experience: Experience;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;

    sizes: Sizes;

    ortographicCamera!: THREE.OrthographicCamera;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;

        this.createOrtographicCamera();
    }

    createOrtographicCamera() {
        this.ortographicCamera = new THREE.OrthographicCamera(
            (this.sizes.frustrumSize * this.sizes.ratio) / -2,
            (this.sizes.frustrumSize * this.sizes.ratio) / 2,
            this.sizes.frustrumSize / 2,
            this.sizes.frustrumSize / -2,
            -50,
            50
        );

        this.ortographicCamera.position.set(0, 2, 5);
        this.ortographicCamera.lookAt(0, 0, 0);

        this.scene.add(this.ortographicCamera);

        //const helper = new THREE.CameraHelper( this.ortographicCamera );
        //this.scene.add( helper );
    }

    update() {
    }

}