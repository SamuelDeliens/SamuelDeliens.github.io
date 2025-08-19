import Experience from "./Experience.ts";
import * as THREE from 'three';
import type Sizes from "./Utils/Sizes.ts";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {EventEmitter} from "events";

export default class Camera extends EventEmitter {
    experience: Experience;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;

    sizes: Sizes;

    perspectiveCamera!: THREE.PerspectiveCamera;
    ortographicCamera!: THREE.OrthographicCamera;

    currentCamera!: THREE.OrthographicCamera | THREE.PerspectiveCamera;
    controls!: OrbitControls;

    private originalOrthoParams: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };

    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;

        this.createPerspectiveCamera();
        this.createOrtographicCamera();

        this.originalOrthoParams = {
            left: this.ortographicCamera.left,
            right: this.ortographicCamera.right,
            top: this.ortographicCamera.top,
            bottom: this.ortographicCamera.bottom,
        };

        this.currentCamera = this.ortographicCamera;
        //this.setOrbitControls();
    }

    private createOrtographicCamera() {
        this.ortographicCamera = new THREE.OrthographicCamera(
            (this.sizes.frustrumSize * this.sizes.ratio) / -7,
            (this.sizes.frustrumSize * this.sizes.ratio) / 7,
            this.sizes.frustrumSize / 7,
            this.sizes.frustrumSize / -7,
            -1,
            50
        );

        this.ortographicCamera.position.set(0, 2, 5);
        this.ortographicCamera.lookAt(0, 0, 0);

        this.scene.add(this.ortographicCamera);

        //const helper = new THREE.CameraHelper( this.ortographicCamera );
        //this.scene.add( helper );
    }

    private createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            100,
            this.sizes.ratio,
            0.001,
            100
        );

        this.perspectiveCamera.position.set(0, 0, 3);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.currentCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    private syncCameraPositions() {
        if (this.currentCamera instanceof THREE.OrthographicCamera) {
            this.perspectiveCamera.position.copy(this.ortographicCamera.position);
            this.perspectiveCamera.rotation.copy(this.ortographicCamera.rotation);
            this.perspectiveCamera.updateMatrixWorld();
        } else {
            this.ortographicCamera.position.copy(this.perspectiveCamera.position);
            this.ortographicCamera.rotation.copy(this.perspectiveCamera.rotation);
            this.ortographicCamera.updateMatrixWorld();
        }
    }

    private calculateEquivalentFOV(): number {
        const distance = this.currentCamera.position.distanceTo(new THREE.Vector3(0, 0, 0));

        if (this.currentCamera instanceof THREE.OrthographicCamera) {
            const orthoHeight = (this.ortographicCamera.top - this.ortographicCamera.bottom);
            const fov = 2 * Math.atan(orthoHeight / (2 * distance)) * (180 / Math.PI);
            return Math.max(10, Math.min(175, fov));
        } else {
            const fov = this.perspectiveCamera.fov * (Math.PI / 180);
            const orthoSize = 2 * distance * Math.tan(fov / 2);

            const aspect = this.sizes.ratio;

            this.ortographicCamera.left = -orthoSize * aspect / 2;
            this.ortographicCamera.right = orthoSize * aspect / 2;
            this.ortographicCamera.top = orthoSize / 2;
            this.ortographicCamera.bottom = -orthoSize / 2;
            this.ortographicCamera.updateProjectionMatrix();

            return this.perspectiveCamera.fov;
        }
    }

    private restoreOrthoParams() {
        this.ortographicCamera.left = this.originalOrthoParams.left;
        this.ortographicCamera.right = this.originalOrthoParams.right;
        this.ortographicCamera.top = this.originalOrthoParams.top;
        this.ortographicCamera.bottom = this.originalOrthoParams.bottom;
        this.ortographicCamera.updateProjectionMatrix();
    }

    switchCamera() {
        this.syncCameraPositions();

        if (this.currentCamera instanceof THREE.OrthographicCamera) {
            this.perspectiveCamera.fov = this.calculateEquivalentFOV();
            this.perspectiveCamera.updateProjectionMatrix();
            this.currentCamera = this.perspectiveCamera;
        } else {
            this.calculateEquivalentFOV();
            this.restoreOrthoParams();
            this.currentCamera = this.ortographicCamera;
        }

        if (this.controls) {
            this.controls.object = this.currentCamera;
            this.controls.update();
        }

        this.emit("cameraSwitched", this.currentCamera);
    }

    switchPerspectiveCamera() {
        if (this.currentCamera instanceof THREE.OrthographicCamera) {
            this.switchCamera();
        }
    }

    switchOrthgraphicCamera() {
        if (this.currentCamera instanceof THREE.PerspectiveCamera) {
            this.switchCamera();
        }
    }

    resize() {
        this.originalOrthoParams = {
            left: (this.sizes.frustrumSize * this.sizes.ratio) / -7,
            right: (this.sizes.frustrumSize * this.sizes.ratio) / 7,
            top: this.sizes.frustrumSize / 7,
            bottom: this.sizes.frustrumSize / -7,
        };

        this.ortographicCamera.left = this.originalOrthoParams.left;
        this.ortographicCamera.right = this.originalOrthoParams.right;
        this.ortographicCamera.top = this.originalOrthoParams.top;
        this.ortographicCamera.bottom = this.originalOrthoParams.bottom;
        this.ortographicCamera.updateProjectionMatrix();

        this.perspectiveCamera.aspect = this.sizes.ratio;
        this.perspectiveCamera.updateProjectionMatrix();

        if (this.controls) {
            this.controls.update();
        }
    }

    update() {
        if (this.controls) {
            this.controls.update();
        }
    }
}