import * as THREE from 'three';
import Environment from "./Environment.ts";
import Experience from "../Experience.ts";
import Globes from "./Globes.ts";

export default class World {
    experience: Experience
    scene: THREE.Scene;

    private environment: Environment;
    private globes: Globes;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.environment = new Environment()
        this.globes = new Globes();
    }

    update() {
        this.environment.update();
        this.globes.update();
    }

}