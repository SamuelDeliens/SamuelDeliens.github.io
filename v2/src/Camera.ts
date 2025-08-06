import Experience from "./Experience.ts";
import * as THREE from 'three';
import type Sizes from "./Utils/Sizes.ts";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {

    experience: Experience;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;

    sizes: Sizes;

    camera!: THREE.OrthographicCamera | THREE.PerspectiveCamera;
    controls!: OrbitControls;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;

        this.createOrtographicCamera();
        //this.setOrbitControls();
    }

    createOrtographicCamera() {
        this.camera = new THREE.OrthographicCamera(
            (this.sizes.frustrumSize * this.sizes.ratio) / -7,
            (this.sizes.frustrumSize * this.sizes.ratio) / 7,
            this.sizes.frustrumSize / 7,
            this.sizes.frustrumSize / -7,
            -1,
            50
        );

        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);

        this.scene.add(this.camera);

        //const helper = new THREE.CameraHelper( this.ortographicCamera );
        //this.scene.add( helper );
    }
    createPerspectiveCamera() {
        this.camera = new THREE.PerspectiveCamera(
            100,
            this.sizes.ratio,
            0.001,
            100
        );

        this.camera.position.set(0, 0, 3);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    update() {
    }

}