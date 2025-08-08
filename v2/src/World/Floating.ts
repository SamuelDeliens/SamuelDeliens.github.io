import Experience from "../Experience.ts";
import * as THREE from "three";
import type {Globe} from "./Globes.ts";
import World from "./World.ts";
import { gsap } from "gsap";

export default class Floating {
    experience: Experience
    scene: THREE.Scene;

    world: World;
    globes: Globe[];

    animations: Map<Globe, gsap.core.Tween> = new Map();

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.world = this.experience.world;

        this.globes = this.world.globes.globes;
    }

    start(globe: Globe) {
        const base = globe.ballMesh.position.clone();

        const animate = () => {
            const delta = {
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3,
                z: (Math.random() - 0.5) * 0.3,
            };

            const duration = 2 + Math.random();

            const tween = gsap.to([globe.ballMesh.position, globe.glassMesh.position], {
                x: base.x + delta.x,
                y: base.y + delta.y,
                z: base.z + delta.z,
                duration,
                ease: "sine.inOut",
                delay: Math.random() * 0.3,
                onComplete: animate,
            });

            this.animations.set(globe, tween);
        };

        animate();
    }

    stop(globe: Globe) {
        const tween = this.animations.get(globe);
        if (tween) {
            tween.kill();
            this.animations.delete(globe);
        }
    }
}