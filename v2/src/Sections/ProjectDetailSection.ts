import * as THREE from "three";
import { gsap } from "gsap";

import BaseSection from "./BaseSection.ts";
import {SectionType} from "../SectionManager.ts";
import {globesData, SHADER_DEFAULT_SPEED, SHADER_SLOW_SPEED} from "../World/Globes.ts";
import type {DetailedGlobeInterface} from "../World/Globes.ts";
import type {GlobeFactoryInput, GlobeInterface} from "../World/Globes.ts";
import Camera from "../Camera.ts";

export default class ProjectDetailSection extends BaseSection {
    private nextProjectButton = document.querySelector(".nav-button.next");
    private backProjectButton = document.querySelector(".nav-button.back");
    private projectDetailsGroup: {[key: string]: Element} = {};

    private camera: Camera;
    private detailedGlobes: { [key: number]: DetailedGlobeInterface};
    private enterTimelineComplete = {
        cameraPosition: new THREE.Vector3(0, 0.36, 1),
        globeMeshPosition: new THREE.Vector3(0, 0, 0),
        globeMeshScale: new THREE.Vector3(3, 3, 3),
        glassMeshPosition: new THREE.Vector3(-1.9, -0.3, 0),
        glassMeshScale: new THREE.Vector3(0.4, 0.5, 0.4),
        detailedGlassMeshPosition: new THREE.Vector3(1.5, 0.3, 0),
        detailedGlassMeshScale: new THREE.Vector3(0.3, 0.3, 0.3),
    }

    protected enterTimeline: {[key: string]: gsap.core.Timeline};
    protected exitTimeline: {[key: string]: gsap.core.Timeline};
    protected switchProjectTimeline: {[key: string]: gsap.core.Timeline};

    private currentProjectId: number = -1;
    private groups = new Set<number>();

    constructor() {
        super('.project-details');

        this.camera = this.experience.camera;
        this.detailedGlobes = this.world.globes.detailedGlobes;

        globesData.forEach((globe: GlobeFactoryInput) => {
            this.groups.add(globe.timeline.third.projectId)
        }); //set groups set

        this.enterTimeline = {};
        this.exitTimeline = {};
        this.switchProjectTimeline = {};

        document.querySelectorAll(".project-details-group").forEach((group) => {
            const groupId: number = parseInt(group.getAttribute("data-project-id") || "-1");
            if (groupId !== -1) {
                this.projectDetailsGroup[groupId] = group as HTMLElement;
            }
        });

        this.init();
        this.setListeners();
    }

    init() {
        this.initEnterTimeline();
        this.initExitTimeline();
        this.initSwitchProjectTimeline();
    }
    initEnterTimeline() {
        this.groups.forEach((projectId: number) => {
            const enterTimeline = gsap.timeline({
                paused: true,
                onComplete: () => {
                    this.emit("enterComplete", projectId);
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
                    enterTimeline
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
                        enterTimeline.to(mesh.material, {
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

            enterTimeline
                .call(() => {
                    this.camera.switchPerspectiveCamera();

                    setTimeout(() => {
                        const newGeo = this.detailedGlobes[projectId].geometry;
                        const oldGeo = targetGlobe.globe.ballMesh.geometry as THREE.SphereGeometry;
                        targetGlobe.globe.ballMesh.geometry = newGeo;
                        this.detailedGlobes[projectId].geometry = oldGeo;

                        this.detailedGlobes[projectId].glassMesh.visible = true;
                        this.detailedGlobes[projectId].glassMesh.scale.copy(this.enterTimelineComplete.detailedGlassMeshScale);

                        this.globes.speed = SHADER_SLOW_SPEED;
                    }, 300);
                }, undefined, "enterGlobe")
                .to(this.camera.perspectiveCamera.position, {
                    x: this.enterTimelineComplete.cameraPosition.x,
                    y: this.enterTimelineComplete.cameraPosition.y,
                    z: this.enterTimelineComplete.cameraPosition.z,
                    duration: 1,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .to(targetGlobe.globe.ballMesh.scale, {
                    x: this.enterTimelineComplete.globeMeshScale.x,
                    y: this.enterTimelineComplete.globeMeshScale.y,
                    z: this.enterTimelineComplete.globeMeshScale.z,
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
                .to(targetGlobe.globe.glassMesh.position, {
                    x: this.enterTimelineComplete.glassMeshPosition.x,
                    y: this.enterTimelineComplete.glassMeshPosition.y,
                    z: this.enterTimelineComplete.glassMeshPosition.z,
                    duration: 0.4,
                    delay: 0.2,
                    ease: "power2.inOut",
                }, "enterGlobe")
                .to(targetGlobe.globe.glassMesh.scale, {
                    x: this.enterTimelineComplete.glassMeshScale.x,
                    y: this.enterTimelineComplete.glassMeshScale.y,
                    z: this.enterTimelineComplete.glassMeshScale.z,
                    duration: 0.4,
                    ease: "power2.inOut",
                    delay: 0.2,
                }, "enterGlobe")
                .to(this.globes.detailedGlobes[projectId].glassMesh.position, {
                    x: this.enterTimelineComplete.detailedGlassMeshPosition.x,
                    y: this.enterTimelineComplete.detailedGlassMeshPosition.y,
                    z: this.enterTimelineComplete.detailedGlassMeshPosition.z,
                    duration: 0.4,
                    ease: "power2.inOut",
                    delay: 0.2,
                }, "enterGlobe")

            enterTimeline
                .call(() => {
                    this.emit("enterHalfComplete", projectId);

                    this.globes.moveObjectPreserveWorldTransform(this.detailedGlobes[projectId].glassMesh, this.globes.currentGroup);
                    this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.ballMesh, this.globes.currentGroup);
                    this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.glassMesh, this.globes.currentGroup);
                }, undefined, "positionGlass")

            this.enterTimeline[projectId] = enterTimeline;
        });
    }
    initExitTimeline() {
        this.groups.forEach((projectId: number) => {
            const exitTimeline = gsap.timeline({
                paused: true,
                onComplete: () => {
                    this.emit("exitComplete", projectId);
                }
            });

            const currentDetailedGlobe = this.detailedGlobes[projectId];
            const timelineData = globesData.map((globeData) => globeData.timeline.second);

            exitTimeline
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

                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.glassMesh, this.world.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.ballMesh, this.world.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.glassMesh, this.world.scene);
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

            exitTimeline
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
                    exitTimeline
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


            this.exitTimeline[projectId] = exitTimeline;
        })
    }
    initSwitchProjectTimeline() {
        this.groups.forEach((projectId: number) => {
            const switchTimeline = gsap.timeline({
                paused: true,
                onComplete: () => {
                    this.emit("enterComplete", projectId);
                }
            });

            const finalProjectId = this.detailedGlobes[projectId + 1] ? projectId + 1 : 1;

            const currentDetailedGlobe = this.detailedGlobes[projectId];
            const nextDetailedGlobe = this.detailedGlobes[finalProjectId];

            const cameraPosition = this.enterTimelineComplete.cameraPosition.clone();
            const currentBallMeshPosition = this.enterTimelineComplete.globeMeshPosition.clone();
            const currentBallMeshScale = this.enterTimelineComplete.globeMeshScale.clone();
            const currentGlassMeshPosition = this.enterTimelineComplete.glassMeshPosition.clone();
            const currentGlassMeshScale = this.enterTimelineComplete.glassMeshScale.clone();
            const currentDetGlassMeshPosition = this.enterTimelineComplete.detailedGlassMeshPosition.clone();
            const currentDetGlassMeshScale = this.enterTimelineComplete.detailedGlassMeshScale.clone();

            switchTimeline
                .call(() => {
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.glassMesh, this.world.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.ballMesh, this.world.scene);
                    this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.glassMesh, this.world.scene);

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


            switchTimeline
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
                    x: currentGlassMeshPosition.x,
                    y: currentGlassMeshPosition.y,
                    z: currentGlassMeshPosition.z,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(nextDetailedGlobe.glassMesh.position, {
                    x: currentDetGlassMeshPosition.x,
                    y: currentDetGlassMeshPosition.y,
                    z: currentDetGlassMeshPosition.z,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")

                .to(nextDetailedGlobe.glassMesh.scale, {
                    x: currentDetGlassMeshScale.x,
                    y: currentDetGlassMeshScale.y,
                    z: currentDetGlassMeshScale.z,
                    duration: 1,
                    ease: "power3.out",
                }, "enterGlobe")
                .to(nextDetailedGlobe.globe.glassMesh.scale, {
                    x: currentGlassMeshScale.x,
                    y: currentGlassMeshScale.y,
                    z: currentGlassMeshScale.z,
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

            switchTimeline
                .call(() => {
                    this.emit("enterHalfComplete", finalProjectId);
                }, undefined, "positionGlass");

            this.switchProjectTimeline[projectId] = switchTimeline;
        });
    }

    setListeners() {
        this.nextProjectButton?.addEventListener("click", () => {
            this.switchProject();
        });
        this.backProjectButton?.addEventListener("click", () => {
            this.emit('navigate', {
                to: SectionType.PROJECTS_LIST,
                enterAnimation: false
            })
        })

        this.on("enterHalfComplete", () => {
            this.show();
        })
        this.on("enterComplete", () => {
            this.world.lerp.active = true;
        })
    }

    prepare(data: {projectId: number}) {
        this.currentData = data;
    }


    show() {
        super.show();
        this.projectDetailsGroup[this.currentProjectId.toString()]?.classList.add("show");
    }
    hide(duration: number = 0) {
        super.hide(duration);
        this.projectDetailsGroup[this.currentProjectId.toString()]?.classList.remove("show");
    }

    enter(): void {
        if (this.currentProjectId === this.currentData.projectId) return;
        this.currentProjectId = this.currentData.projectId;
        this.enterTimeline[this.currentProjectId].restart();
        //part of enter is trigger in listeners ==> after halfComplete & complete
    }
    exit(): void {
        this.world.lerp.active = false;
        this.hide();
        this.exitTimeline[this.currentProjectId].pause(0).play();
        this.currentProjectId = -1;
    }
    switchProject() {
        this.world.lerp.active = false;
        this.sectionElement?.scrollTo(0, 0);
        this.hide();
        this.switchProjectTimeline[this.currentProjectId].restart();
        this.currentProjectId = this.projectDetailsGroup[this.currentProjectId + 1] ? this.currentProjectId + 1 : 1;
    }

}