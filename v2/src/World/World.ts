import * as THREE from 'three';
import Environment from "./Environment.ts";
import Experience from "../Experience.ts";
import Globes from "./Globes.ts";
import Background from "./Background.ts";

export default class World {
    experience: Experience
    scene: THREE.Scene;

    private environment: Environment;
    private background: Background;
    public globes: Globes;

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
    }

}