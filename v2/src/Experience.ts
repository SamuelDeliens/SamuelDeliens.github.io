import * as THREE from 'three';
import Sizes from './Utils/Sizes.ts';
import Camera from "./Camera.ts";
import Renderer from "./Renderer.ts";
import World from "./World/World.ts";
import Time from "./Utils/Time.ts";

export default class Experience {
    static _instance: Experience;

    time!: Time;
    sizes!: Sizes;

    canvas!: HTMLCanvasElement;
    scene!: THREE.Scene;

    camera!: Camera;
    renderer!: Renderer;
    world!: World;


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

        this.world = new World();

        this.time.on('tick', () => {
            this.update();
        });
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

}