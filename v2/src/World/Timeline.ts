import Experience from "../Experience.ts";
import * as THREE from "three";
import type {GlobeInterface, GlobeFactoryInput} from "./Globes.ts";
import Globes, {globesData, SHADER_DEFAULT_SPEED, SHADER_SLOW_SPEED} from "./Globes.ts";
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
    thirdTimelineComplete: any = {
        cameraPosition: new THREE.Vector3(0, 0.36, 1),
        globeMeshPosition: new THREE.Vector3(0, 0, 0),
        globeMeshScale: new THREE.Vector3(3, 3, 3),
        glassMeshPosition: new THREE.Vector3(-1.9, -0.3, 0),
        glassMeshScale: new THREE.Vector3(0.4, 0.5, 0.4),
        detailedGlassMeshPosition: new THREE.Vector3(1.5, 0.3, 0),
        detailedGlassMeshScale: new THREE.Vector3(0.3, 0.3, 0.3),
    }

    backFromProjectTimeline!: {
        [key: number]: gsap.core.Timeline
    };
    switchProjectTimeline!: {
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
        this.initSwitchProjectTimeline();
        this.initBackFromProjectTimeline();
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
                        ease: "power3.out",
                        delay: index * increment,
                        duration: 0.5
                    }, "same")
                    .to(mesh.scale, {
                        x: timelineData[index].scale,
                        y: timelineData[index].scale,
                        z: timelineData[index].scale,
                        duration: 0.5,
                        delay: index * increment,
                        ease: "power3.out",
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
                        const newGeo = this.globes.detailedGlobes[projectId].geometry;
                        const oldGeo = targetGlobe.globe.ballMesh.geometry as THREE.SphereGeometry;
                        targetGlobe.globe.ballMesh.geometry = newGeo;
                        this.globes.detailedGlobes[projectId].geometry = oldGeo;

                        this.globes.detailedGlobes[projectId].glassMesh.visible = true;
                        this.globes.detailedGlobes[projectId].glassMesh.scale.copy(this.thirdTimelineComplete.detailedGlassMeshScale);

                        this.globes.speed = SHADER_SLOW_SPEED;
                    }, 300);
                }, undefined, "enterGlobe")
                .to(this.camera.perspectiveCamera.position, {
                    x: this.thirdTimelineComplete.cameraPosition.x,
                    y: this.thirdTimelineComplete.cameraPosition.y,
                    z: this.thirdTimelineComplete.cameraPosition.z,
                    duration: 1,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .to(targetGlobe.globe.ballMesh.scale, {
                    x: this.thirdTimelineComplete.globeMeshScale.x,
                    y: this.thirdTimelineComplete.globeMeshScale.y,
                    z: this.thirdTimelineComplete.globeMeshScale.z,
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

            groupXthirdTimeline
                .call(() => {
                    this.emit("thirdTimelineHalfComplete", projectId);

                    this.globes.moveObjectPreserveWorldTransform(this.globes.detailedGlobes[projectId].glassMesh, this.globes.currentGroup);
                    this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.ballMesh, this.globes.currentGroup);
                    this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.glassMesh, this.globes.currentGroup);
                }, undefined, "positionGlass")
                .to(targetGlobe.globe.glassMesh.position, {
                    x: this.thirdTimelineComplete.glassMeshPosition.x,
                    y: this.thirdTimelineComplete.glassMeshPosition.y,
                    z: this.thirdTimelineComplete.glassMeshPosition.z,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power2.inOut",
                }, "positionGlass")
                .to(targetGlobe.globe.glassMesh.scale, {
                    x: this.thirdTimelineComplete.glassMeshScale.x,
                    y: this.thirdTimelineComplete.glassMeshScale.y,
                    z: this.thirdTimelineComplete.glassMeshScale.z,
                    duration: 0.6,
                    ease: "power2.inOut",
                    delay: 0.5,
                }, "positionGlass")
                .to(this.globes.detailedGlobes[projectId].glassMesh.position, {
                    x: this.thirdTimelineComplete.detailedGlassMeshPosition.x,
                    y: this.thirdTimelineComplete.detailedGlassMeshPosition.y,
                    z: this.thirdTimelineComplete.detailedGlassMeshPosition.z,
                    duration: 0.6,
                    ease: "power2.inOut",
                    delay: 0.5,
                }, "positionGlass")

            this.thirdTimeline[projectId] = groupXthirdTimeline;
        });
    }

    initSwitchProjectTimeline() {
        this.switchProjectTimeline = {};

        const groups = new Set<number>();
        globesData.forEach((globe: GlobeFactoryInput) => {
            groups.add(globe.timeline.third.projectId)
        });

        groups.forEach((projectId: number) => {
            const groupXswitchProjectTimeline = gsap.timeline({
                paused: true,
                onComplete: () => {
                    this.emit("thirdTimelineComplete", projectId);
                }
            });

            const finalProjectId = this.globes.detailedGlobes[projectId + 1] ? projectId + 1 : 1;

            const currentDetailedGlobe = this.globes.detailedGlobes[projectId];
            const nextDetailedGlobe = this.globes.detailedGlobes[finalProjectId];

            const cameraPosition = this.thirdTimelineComplete.cameraPosition.clone();
            const currentBallMeshPosition = this.thirdTimelineComplete.globeMeshPosition.clone();
            const currentBallMeshScale = this.thirdTimelineComplete.globeMeshScale.clone();
            const currentGlassMeshPosition = this.thirdTimelineComplete.glassMeshPosition.clone();
            const currentGlassMeshScale = this.thirdTimelineComplete.glassMeshScale.clone();
            const currentDetGlassMeshPosition = this.thirdTimelineComplete.detailedGlassMeshPosition.clone();
            const currentDetGlassMeshScale = this.thirdTimelineComplete.detailedGlassMeshScale.clone();

            groupXswitchProjectTimeline
                .call(() => {
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.glassMesh, this.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.ballMesh, this.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.glassMesh, this.scene);

                    const newGeo = nextDetailedGlobe.geometry;
                    const oldGeo = nextDetailedGlobe.globe.ballMesh.geometry as THREE.SphereGeometry;
                    nextDetailedGlobe.globe.ballMesh.geometry = newGeo;
                    nextDetailedGlobe.geometry = oldGeo;

                    [nextDetailedGlobe.glassMesh, nextDetailedGlobe.globe.ballMesh, nextDetailedGlobe.globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                        mesh.visible = true;
                        mesh.position.copy(currentBallMeshPosition);
                        mesh.position.x += 10;
                    });
                    nextDetailedGlobe.glassMesh.scale.set(0.1, 0.1, 0.1);
                    nextDetailedGlobe.globe.ballMesh.scale.set(0.3, 0.3, 0.3);
                    nextDetailedGlobe.globe.glassMesh.scale.set(1, 1, 1);
                }, undefined, "exitGlobe")
                .to(this.camera.perspectiveCamera.position, {
                    x: 0,
                    y: 2,
                    z: 5,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(currentDetailedGlobe.globe.ballMesh.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe")

                .to(currentDetailedGlobe.globe.ballMesh.position, {
                    x: currentBallMeshPosition.x - 10,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(currentDetailedGlobe.globe.glassMesh.position, {
                    x: currentBallMeshPosition.x - 10,
                    y: currentBallMeshPosition.y,
                    z: currentBallMeshPosition.z,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(currentDetailedGlobe.glassMesh.position, {
                    x: currentBallMeshPosition.x - 10,
                    y: currentBallMeshPosition.y,
                    z: currentBallMeshPosition.z,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")

                .to(currentDetailedGlobe.glassMesh.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(currentDetailedGlobe.globe.glassMesh.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")

                .to(nextDetailedGlobe.globe.ballMesh.position, {
                    x: currentBallMeshPosition.x + 5,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(nextDetailedGlobe.globe.glassMesh.position, {
                    x: currentBallMeshPosition.x + 5,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(nextDetailedGlobe.glassMesh.position, {
                    x: currentBallMeshPosition.x + 5,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe");


            groupXswitchProjectTimeline
                .call(() => {
                    setTimeout(() => {
                        currentDetailedGlobe.glassMesh.visible = false;

                        const newGeo = currentDetailedGlobe.geometry;
                        const oldGeo = currentDetailedGlobe.globe.ballMesh.geometry as THREE.SphereGeometry;
                        currentDetailedGlobe.globe.ballMesh.geometry = newGeo;
                        currentDetailedGlobe.geometry = oldGeo;

                        this.globes.moveObjectPreserveWorldTransform(nextDetailedGlobe.glassMesh, this.globes.currentGroup);
                        this.globes.moveObjectPreserveWorldTransform(nextDetailedGlobe.globe.ballMesh, this.globes.currentGroup);
                        this.globes.moveObjectPreserveWorldTransform(nextDetailedGlobe.globe.glassMesh, this.globes.currentGroup);
                    }, 200);
                }, undefined, "enterGlobe")
                .to(this.camera.perspectiveCamera.position, {
                    x: cameraPosition.x,
                    y: cameraPosition.y,
                    z: cameraPosition.z,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(nextDetailedGlobe.globe.ballMesh.scale, {
                    x: currentBallMeshScale.x,
                    y: currentBallMeshScale.y,
                    z: currentBallMeshScale.z,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")

                .to(nextDetailedGlobe.globe.ballMesh.position, {
                    x: currentBallMeshPosition.x,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(nextDetailedGlobe.globe.glassMesh.position, {
                    x: currentBallMeshPosition.x,
                    y: currentBallMeshPosition.y,
                    z: currentBallMeshPosition.z,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(nextDetailedGlobe.glassMesh.position, {
                    x: currentBallMeshPosition.x,
                    y: currentBallMeshPosition.y,
                    z: currentBallMeshPosition.z,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")

                .to(nextDetailedGlobe.glassMesh.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(nextDetailedGlobe.globe.glassMesh.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")

                .to(currentDetailedGlobe.globe.ballMesh.position, {
                    x: currentBallMeshPosition.x - 10,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(currentDetailedGlobe.globe.glassMesh.position, {
                    x: currentBallMeshPosition.x - 10,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(currentDetailedGlobe.glassMesh.position, {
                    x: currentBallMeshPosition.x - 10,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe");

            groupXswitchProjectTimeline
                .call(() => {
                    this.emit("thirdTimelineHalfComplete", finalProjectId);
                }, undefined, "positionGlass")
                .to(nextDetailedGlobe.globe.glassMesh.position, {
                    x: currentGlassMeshPosition.x,
                    y: currentGlassMeshPosition.y,
                    z: currentGlassMeshPosition.z,
                    duration: 0.6,
                    ease: "power3.out",
                }, "positionGlass")
                .to(nextDetailedGlobe.globe.glassMesh.scale, {
                    x: currentGlassMeshScale.x,
                    y: currentGlassMeshScale.y,
                    z: currentGlassMeshScale.z,
                    duration: 0.6,
                    ease: "power3.out",
                }, "positionGlass")
                .to(nextDetailedGlobe.glassMesh.position, {
                    x: currentDetGlassMeshPosition.x,
                    y: currentDetGlassMeshPosition.y,
                    z: currentDetGlassMeshPosition.z,
                    duration: 0.6,
                    ease: "power3.out",
                }, "positionGlass")
                .to(nextDetailedGlobe.glassMesh.scale, {
                    x: currentDetGlassMeshScale.x,
                    y: currentDetGlassMeshScale.y,
                    z: currentDetGlassMeshScale.z,
                    duration: 0.6,
                    ease: "power3.out",
                }, "positionGlass");

            this.switchProjectTimeline[projectId] = groupXswitchProjectTimeline;
        });
    }

    initBackFromProjectTimeline() {
        this.backFromProjectTimeline = {}

        const groups = new Set<number>();
        globesData.forEach((globe: GlobeFactoryInput) => {
            groups.add(globe.timeline.third.projectId)
        });

        groups.forEach((projectId: number) => {
            const groupXbackFromProjectTimeline = gsap.timeline({
                paused: true,
                onComplete: () => {
                    this.emit("backFromProjectTimelineComplete", projectId);
                }
            });

            const currentDetailedGlobe = this.globes.detailedGlobes[projectId];
            const timelineData = globesData.map((globeData) => globeData.timeline.second);

            groupXbackFromProjectTimeline
                .call(() => {
                    setTimeout(() => {
                        currentDetailedGlobe.glassMesh.visible = false;

                        const newGeo = currentDetailedGlobe.geometry;
                        const oldGeo = currentDetailedGlobe.globe.ballMesh.geometry as THREE.SphereGeometry;
                        currentDetailedGlobe.globe.ballMesh.geometry = newGeo;
                        currentDetailedGlobe.geometry = oldGeo;

                        this.globes.speed = SHADER_DEFAULT_SPEED;

                        this.camera.switchOrthgraphicCamera();
                    }, 940);

                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.glassMesh, this.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.ballMesh, this.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.glassMesh, this.scene);
                }, undefined, "exitGlobe")
                .to(this.camera.perspectiveCamera.position, {
                    x: 0,
                    y: 2,
                    z: 5,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(currentDetailedGlobe.globe.ballMesh.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    duration: 1,
                    ease: "power2.in",
                }, "exitGlobe")

                .to(currentDetailedGlobe.globe.glassMesh.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(currentDetailedGlobe.glassMesh.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")

                .to(currentDetailedGlobe.glassMesh.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")
                .to(currentDetailedGlobe.globe.glassMesh.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.8,
                    ease: "power2.in",
                }, "exitGlobe")

            groupXbackFromProjectTimeline
                .to(this.camera.ortographicCamera.position, {
                    x: 0,
                    y: 2,
                    z: 5,
                    duration: 1,
                    ease: "power2.in",
                }, "moveGlobes")

            this.globesList.forEach((globe: GlobeInterface, index: number) => {
                const behaviourStep = timelineData[index]
                const increment = (1 / this.globesList.length) / 5;

                [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                    groupXbackFromProjectTimeline
                        .to(mesh.position, {
                            x: behaviourStep.position.x,
                            y: behaviourStep.position.y,
                            z: behaviourStep.position.z,
                            ease: "power2.out",
                            duration: 0.8,
                            delay: index * increment
                        }, "moveGlobes")
                        .to(mesh.scale, {
                            x: behaviourStep.scale,
                            y: behaviourStep.scale,
                            z: behaviourStep.scale,
                            ease: "power2.out",
                            duration: 0.8,
                            delay: index * increment
                        }, "moveGlobes")
                        .to(mesh.material, {
                            opacity: 1,
                            duration: 0.2,
                            ease: "power2.out",
                            onComplete: () => {
                                mesh.visible = true;
                            }
                        }, "moveGlobes");
                });
            })


            this.backFromProjectTimeline[projectId] = groupXbackFromProjectTimeline;
        })
    }
}