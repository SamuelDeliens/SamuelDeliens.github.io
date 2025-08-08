import Experience from "../Experience.ts";
import * as THREE from "three";
import type {Globe, GlobeFactoryInput, GlobeStep} from "./Globes.ts";
import {globesData} from "./Globes.ts";
import World from "./World.ts";
import { gsap } from "gsap";
import {EventEmitter} from "events";
import type Camera from "../Camera.ts";

export default class Timeline extends EventEmitter {
    experience: Experience
    scene: THREE.Scene;

    camera: Camera;
    currentCamera!: THREE.OrthographicCamera | THREE.PerspectiveCamera;
    world: World;

    globes: Globe[];

    firstTimeline!: gsap.core.Timeline;
    secondTimeline!: gsap.core.Timeline;
    thirdTimeline!: {
        [key: number]: gsap.core.Timeline
    };

    lookAtTarget: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.camera = this.experience.camera;
        this.currentCamera = this.experience.camera.currentCamera;
        this.world = this.experience.world;

        this.globes = this.world.globes.globes;
        this.detailedGlobes = this.world.globes.detailedGlobes;

        this.initFirstTimeline();
        this.initSecondTimeline();
        this.initThirdTimeline();
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

        const increment = (1 / this.globes.length) / 5;
        this.globes.forEach((globe: Globe, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh, indexMesh: number) => {
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

        const increment = (1 / this.globes.length) / 5;
        this.globes.forEach((globe: Globe, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh, indexMesh: number) => {
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
        this.thirdTimeline = {};

        const groups = new Set<number>();
        globesData.forEach((globe: GlobeFactoryInput) => {
            groups.add(globe.timeline.third.projectId)
        });

        groups.forEach((projectId: number) => {
           const groupXthirdTimeline = gsap.timeline({
               paused: true,
               onComplete: () => {
                     this.emit("thirdTimelineComplete", projectId);
               }
           });

            const timelineData = globesData.map((globeData) => globeData.timeline.third);

            let targetGlobe = {
                globe: this.globes[0],
                behaviourStep: globesData[0].timeline.third.show,
            }

            this.globes.forEach((globe: Globe, index: number) => {
                const showProject = timelineData[index].projectId === projectId;
                let behaviourStep;

                // show behaviour if same group
                if (showProject) {
                    behaviourStep = timelineData[index].show;
                    behaviourStep.position = new THREE.Vector3(0, 0, 0); // reset position to center
                }
                else //else hide
                    behaviourStep = timelineData[index].hide;

                const keepGlobe = showProject ? timelineData[index].stay : false;
                if (keepGlobe)
                    targetGlobe = {
                        globe: globe,
                        behaviourStep: behaviourStep
                    };

                const increment = (1 / this.globes.length) / 5;

                [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh, indexMesh: number) => {
                    groupXthirdTimeline
                        .to(mesh.position, {
                            x: behaviourStep.position.x,
                            y: behaviourStep.position.y,
                            z: behaviourStep.position.z,
                            ease: "power2.inOut",
                            duration: 0.5,
                            delay: index * increment
                        }, "moveGlobes")
                        .to(mesh.scale, {
                            x: behaviourStep.scale,
                            y: behaviourStep.scale,
                            z: behaviourStep.scale,
                            ease: "power2.inOut",
                            duration: 0.5,
                            delay: index * increment
                        }, "moveGlobes");

                    if (!keepGlobe) {
                        groupXthirdTimeline.to(mesh.material, {
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.inOut",
                            onComplete: () => {
                                mesh.visible = false;
                            }
                        }, "moveGlobes");
                    }
                });
            });

            groupXthirdTimeline
                .call(() => {
                    this.camera.switchCamera();
                    this.currentCamera = this.camera.currentCamera;

                    const newGeo = this.world.globes.detailedGeo[projectId];
                    const oldGeo = targetGlobe.globe.ballMesh.geometry;
                    targetGlobe.globe.ballMesh.geometry = newGeo;
                    oldGeo.dispose();

                }, null, "enterGlobe")
                .to(this.camera.perspectiveCamera.position, {
                    x: 0,
                    y: 0.36,
                    z: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .to(targetGlobe.globe.ballMesh.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                    duration: 0.6,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .to(targetGlobe.globe.glassMesh.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    duration: 0.4,
                    ease: "power2.inOut",
                }, "enterGlobe")

            groupXthirdTimeline
                .to(this.camera.perspectiveCamera.position, {
                    x: 1,
                    y: 0.36,
                    z: 1,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power2.inOut",
                }, "positionGlass");

            this.thirdTimeline[projectId] = groupXthirdTimeline;
        });
    }
}