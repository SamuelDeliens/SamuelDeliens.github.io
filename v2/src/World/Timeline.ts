import Experience from "../Experience.ts";
import * as THREE from "three";
import type {GlobeInterface, GlobeFactoryInput, GlobeStep} from "./Globes.ts";
import Globes, {globesData, SHADER_SLOW_SPEED} from "./Globes.ts";
import { gsap } from "gsap";
import {EventEmitter} from "events";
import type Camera from "../Camera.ts";

export default class Timeline extends EventEmitter {
    experience: Experience
    scene: THREE.Scene;

    camera: Camera;
    currentCamera!: THREE.OrthographicCamera | THREE.PerspectiveCamera;

    globes: Globes;
    globesList: GlobeInterface[];

    firstTimeline!: gsap.core.Timeline;
    secondTimeline!: gsap.core.Timeline;
    thirdTimeline!: {
        [key: number]: gsap.core.Timeline
    };

    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.camera = this.experience.camera;
        this.currentCamera = this.experience.camera.currentCamera;
        this.globes = this.experience.world.globes;

        this.globesList = this.globes.globes;

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

        const increment = (1 / this.globesList.length) / 5;
        this.globesList.forEach((globe: GlobeInterface, index: number) => {
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

        const increment = (1 / this.globesList.length) / 5;
        this.globesList.forEach((globe: GlobeInterface, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                this.secondTimeline
                    .to(mesh.position, {
                        x: timelineData[index].position.x,
                        y: timelineData[index].position.y,
                        z: timelineData[index].position.z,
                        ease: "power2.inOut",
                        delay: index * increment,
                        duration: 1
                    }, "same")
                    .to(mesh.scale, {
                        x: timelineData[index].scale,
                        y: timelineData[index].scale,
                        z: timelineData[index].scale,
                        duration: 1,
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
                globe: this.globesList[0],
                behaviourStep: globesData[0].timeline.third.show,
            }

            this.globesList.forEach((globe: GlobeInterface, index: number) => {
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

                const increment = (1 / this.globesList.length) / 5;

                [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                    groupXthirdTimeline
                        .to(mesh.position, {
                            x: behaviourStep.position.x,
                            y: behaviourStep.position.y,
                            z: behaviourStep.position.z,
                            ease: "power2.inOut",
                            duration: 0.8,
                            delay: index * increment
                        }, "moveGlobes")
                        .to(mesh.scale, {
                            x: behaviourStep.scale,
                            y: behaviourStep.scale,
                            z: behaviourStep.scale,
                            ease: "power2.inOut",
                            duration: 0.8,
                            delay: index * increment
                        }, "moveGlobes");

                    if (!keepGlobe) {
                        groupXthirdTimeline.to(mesh.material, {
                            opacity: 0,
                            duration: 0.8,
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
                    this.camera.switchPerspectiveCamera();
                    this.currentCamera = this.camera.currentCamera;

                    setTimeout(() => {
                        const newGeo = this.globes.detailedGeo[projectId];
                        const oldGeo = targetGlobe.globe.ballMesh.geometry;
                        targetGlobe.globe.ballMesh.geometry = newGeo;
                        oldGeo.dispose();

                        this.globes.detailedGlass[projectId].glassMesh.visible = true;
                        this.globes.detailedGlass[projectId].glassMesh.scale.set(0.3, 0.3, 0.3);

                        this.globes.speed = SHADER_SLOW_SPEED;
                    }, 300);
                }, undefined, "enterGlobe")
                .to(this.camera.perspectiveCamera.position, {
                    x: 0,
                    y: 0.36,
                    z: 1,
                    duration: 1,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .to(targetGlobe.globe.ballMesh.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                    duration: 1,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .to(targetGlobe.globe.glassMesh.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,
                    duration: 0.8,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .call(() => {
                    this.emit("thirdTimelineHalfComplete", projectId);
                })

            groupXthirdTimeline
                .to(targetGlobe.globe.glassMesh.position, {
                    x: -1.9,
                    y: -0.3,
                    z: 0,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power2.inOut",
                }, "positionGlass")
                .to(targetGlobe.globe.glassMesh.scale, {
                    x: 0.4,
                    y: 0.5,
                    z: 0.4,
                    duration: 0.6,
                    ease: "power2.inOut",
                    delay: 0.5,
                }, "positionGlass")
                .to(this.globes.detailedGlass[projectId].glassMesh.position, {
                    x: 1.5,
                    y: 0.3,
                    z: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    delay: 0.5,
                }, "positionGlass")
                .call(() => {
                    this.globes.moveObjectPreserveWorldTransform(this.globes.detailedGlass[projectId].glassMesh, this.globes.currentGroup);
                    this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.ballMesh, this.globes.currentGroup);
                    this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.glassMesh, this.globes.currentGroup);

                    this.emit("thirdTimelineComplete", projectId);
                })

            this.thirdTimeline[projectId] = groupXthirdTimeline;
        });
    }
}