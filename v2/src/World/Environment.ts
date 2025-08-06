import Experience from "../Experience.ts";
import * as THREE from "three";

export default class Environment {
    experience: Experience
    scene: THREE.Scene;

    sun!: THREE.DirectionalLight;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setLight();
    }

    setLight() {
        this.sun = new THREE.DirectionalLight(0xffffff, 10);
        this.sun.castShadow = true;
        this.sun.shadow.camera.far = 0;
        this.sun.shadow.mapSize.set(2048, 2048);
        this.sun.shadow.normalBias = 0.05;
        this.sun.position.set(1, 7, 5);
        this.scene.add(this.sun);
    }

    update() {
    }

}