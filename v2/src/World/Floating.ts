import Experience from "../Experience.ts";
import * as THREE from "three";
import type {Globe} from "./Globes.ts";
import World from "./World.ts";
import { gsap } from "gsap";
import Globes from "./Globes.ts";

export default class Floating {
    experience: Experience
    scene: THREE.Scene;

    world: World;
    globes: Globe[];

    tls: gsap.core.Timeline[] = [];

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.world = this.experience.world;

        this.globes = this.world.globes.globes;
    }

    start(globe: Globe) {
        const base = globe.ballMesh.position.clone();

        const delta = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5,
            z: (Math.random() - 0.5) * 0.5,
        };

        const duration = 2 + Math.random();

        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        tl.to([globe.ballMesh.position, globe.glassMesh.position], {
            x: base.x + delta.x,
            y: base.y + delta.y,
            z: base.z + delta.z,
            duration
        });

        this.tls.push(tl);
    }

    stop(globe: Globe) {
        const index = this.globes.indexOf(globe);
        if (index !== -1) {
            this.tls[index].kill();
            this.tls.splice(index, 1);
        }
    }
}