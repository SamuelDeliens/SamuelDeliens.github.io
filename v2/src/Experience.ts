import * as THREE from 'three';
import Sizes from './Utils/Sizes.ts';
import Camera from "./Camera.ts";
import Renderer from "./Renderer.ts";
import World from "./World/World.ts";
import Time from "./Utils/Time.ts";
import Composer from "./Composer.ts";
import Timeline from "./World/Timeline.ts";
import Floating from "./World/Floating.ts";

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

    timeline!: Timeline;
    floating!: Floating;

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

        this.timeline = new Timeline();
        this.floating = new Floating();

        this.time.on('tick', () => {
            this.update();
        });

        setTimeout(() => {
            this.timeline.firstTimeline.play();
            this.timeline.on("firstTimelineComplete", () => {
                this.world.globes.globes.forEach(globe => {
                    this.floating.start(globe);
                });
            });
        }, 2000);
    }

    update() {
        this.camera.update();
        this.world.update();
        this.composer.update();
    }

}