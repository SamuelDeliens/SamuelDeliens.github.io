import * as THREE from 'three';
import Sizes from './Utils/Sizes.ts';
import Camera from "./Camera.ts";
import Renderer from "./Renderer.ts";
import World from "./World/World.ts";
import Time from "./Utils/Time.ts";
import Composer from "./Composer.ts";
import Controls from "./Controls.ts";
import DebugCamera from "./DebugCamera.ts";
import SectionManager, {SectionType} from "./SectionManager.ts";

export default class Experience {
    static _instance: Experience;

    time!: Time;
    sizes!: Sizes;

    canvas!: HTMLCanvasElement;
    scene!: THREE.Scene;

    camera!: Camera;
    renderer!: Renderer;
    composer!: Composer;
    world!: World;

    controls!: Controls;
    sectionManager!: SectionManager;
    debugCamera!: DebugCamera;

    constructor(canvas?: HTMLCanvasElement) {
        if (Experience._instance) {
            return Experience._instance;
        }

        Experience._instance = this;

        if (!canvas) {
            throw new Error("Canvas element is required to create an Experience instance.");
        }

        this.canvas = canvas;
        this.scene = new THREE.Scene();

        this.time = new Time();
        this.sizes = new Sizes();

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.composer = new Composer();

        this.world = new World();
        this.controls = new Controls();
        this.sectionManager = new SectionManager();

        this.debugCamera = new DebugCamera();

        this.time.on('tick', () => {
            this.update();
        });

        this.camera.on('cameraSwitched', (camera: THREE.OrthographicCamera | THREE.PerspectiveCamera) => {
            this.composer.setCamera(camera);
        });

        setTimeout(() => {
            this.sectionManager.goToSection(SectionType.HERO);
        }, 1100);
    }

    update() {
        this.camera.update();
        this.world.update();

        this.debugCamera.update();
        this.composer.update();
        this.debugCamera.render();
    }

}