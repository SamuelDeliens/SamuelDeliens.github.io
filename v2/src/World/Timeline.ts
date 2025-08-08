import Experience from "../Experience.ts";
import * as THREE from "three";
import type {Globe} from "./Globes.ts";
import {globesData} from "./Globes.ts";
import World from "./World.ts";
import { gsap } from "gsap";
import {EventEmitter} from "events";

export default class Timeline extends EventEmitter {
    experience: Experience
    scene: THREE.Scene;

    camera!: THREE.OrthographicCamera | THREE.PerspectiveCamera;
    world: World;

    globes: Globe[];

    firstTimeline!: gsap.core.Timeline;
    secondTimeline!: gsap.core.Timeline;
    thirdTimeline!: {

    };

    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.camera = this.experience.camera.camera;
        this.world = this.experience.world;

        this.globes = this.world.globes.globes;

        this.initFirstTimeline();
        this.initSecondTimeline();
    }

    initFirstTimeline() {
        this.firstTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.emit("firstTimelineComplete");
            }
        });

        const timelineData = globesData.map((globeData) => ({
            position: globeData.timeline.first.position,
            scale: globeData.timeline.first.scale
        }));

/*        this.firstTimeline.to(this.camera.position, {
            z: 7,
            duration: 1,
            ease: "power2.inOut"
        }, "same");*/

        const increment = (1 / this.globes.length) / 5;
        this.globes.forEach((globe: Globe, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                this.firstTimeline
                    .to(mesh.position, {
                        x: timelineData[index].position.x,
                        y: timelineData[index].position.y,
                        z: timelineData[index].position.z,
                        ease: "power2.inOut",
                        delay: index * increment,
                        duration: 0.5
                    }, "same")
                    .to(mesh.scale, {
                        x: timelineData[index].scale,
                        y: timelineData[index].scale,
                        z: timelineData[index].scale,
                        duration: 0.5,
                        delay: index * increment,
                        ease: "power2.inOut",
                    }, "same");
            });
        });
    }

    initSecondTimeline() {
        this.secondTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.emit("secondTimelineComplete");
            }
        });

        const timelineData = globesData.map((globeData) => ({
            position: globeData.timeline.second.position,
            scale: globeData.timeline.second.scale
        }));

        /*        this.firstTimeline.to(this.camera.position, {
                    z: 7,
                    duration: 1,
                    ease: "power2.inOut"
                }, "same");*/

        const increment = (1 / this.globes.length) / 5;
        this.globes.forEach((globe: Globe, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                this.secondTimeline
                    .to(mesh.position, {
                        x: timelineData[index].position.x,
                        y: timelineData[index].position.y,
                        z: timelineData[index].position.z,
                        ease: "power2.inOut",
                        delay: index * increment,
                        duration: 0.7
                    }, "same")
                    .to(mesh.scale, {
                        x: timelineData[index].scale,
                        y: timelineData[index].scale,
                        z: timelineData[index].scale,
                        duration: 0.7,
                        delay: index * increment,
                        ease: "power2.inOut",
                    }, "same");
            });
        });
    }

    initThirdTimeline() {

    }
}