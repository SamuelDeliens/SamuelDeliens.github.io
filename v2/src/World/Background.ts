import Experience from "../Experience.ts";
import * as THREE from "three";

export default class Background {
    experience: Experience
    scene: THREE.Scene;

    plane!: THREE.Mesh;
    material!: THREE.MeshStandardMaterial;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setBackground();
    }

    setBackground() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.position.z = -10;
        this.scene.add(this.plane);
    }

    update() {}

}