import * as THREE from 'three';
import Environment from "./Environment.ts";
import Experience from "../Experience.ts";
import Globes from "./Globes.ts";
import Background from "./Background.ts";
import { gsap } from "gsap";
import type {WorldRotationLerp} from "../Controls/WorldRotation.ts";

export default class World {
    experience: Experience
    scene: THREE.Scene;

    private environment: Environment;
    private background: Background;
    public globes: Globes;

    lerp: WorldRotationLerp = {
        active: false,
        currentX: 0,
        targetX: 0,
        currentY: 0,
        targetY: 0,
        ease: 0.1
    }

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.environment = new Environment()
        this.globes = new Globes();
        this.background = new Background();
    }

    update() {
        this.environment.update();
        this.globes.update();

        this.globes.currentGroup.visible = false;
        if (this.lerp.active) {
            this.lerp.currentX = gsap.utils.interpolate(
                this.lerp.currentX,
                this.lerp.targetX,
                this.lerp.ease
            );
            this.lerp.currentY = gsap.utils.interpolate(
                this.lerp.currentY,
                this.lerp.targetY,
                this.lerp.ease
            );

            this.globes.currentGroup.rotation.y = this.lerp.currentX*0.1;
            this.globes.currentGroup.rotation.x = this.lerp.currentY*0.1;
        }
        this.globes.currentGroup.visible = true;
    }

}