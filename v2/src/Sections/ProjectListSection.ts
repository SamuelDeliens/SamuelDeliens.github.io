import * as THREE from "three";
import { gsap } from "gsap";

import BaseSection from "./BaseSection.ts";
import Floating from "../World/Floating.ts";
import type {GlobeInterface} from "../World/Globes.ts";
import {globesData} from "../World/Globes.ts";
import {SectionType} from "../SectionManager.ts";

export default class ProjectListSection extends BaseSection {
    private openProjectButtons = document.querySelectorAll(".open-project-button");

    protected enterTimeline: gsap.core.Timeline;
    protected exitTimeline: gsap.core.Timeline;

    private currentGlobe?: GlobeInterface;
    private targetGlobes: Set<GlobeInterface> = new Set();

    private isEnter: boolean = false;

    constructor() {
        super('.projects-list');

        this.enterTimeline = gsap.timeline();
        this.exitTimeline = gsap.timeline();

        this.init();
        this.setListeners();
    }

    init() {
        this.enterTimeline = this.initEnterTimeline();
        this.exitTimeline = this.initExitTimeline();
    }
    initEnterTimeline() : gsap.core.Timeline {
        const enterTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.enterComplete();
            }
        });

        const timelineData = globesData.map((globeData) => ({
            projectId: globeData.projectId,
            small: globeData.small,
            position: globeData.timeline.second.position,
            scale: globeData.timeline.second.scale,
            opacity: globeData.timeline.second.opacity
        }));

        enterTimeline
            .to(this.camera.ortographicCamera.position, {
                x: 0,
                y: 2,
                z: 5,
                duration: 1,
                ease: "power2.in",
            }, "moveGlobes")


        const increment = (1 / this.globesList.length) / 5;
        this.globesList.forEach((globe: GlobeInterface, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                enterTimeline
                    .to(mesh.position, {
                        x: timelineData[index].position.x,
                        y: timelineData[index].position.y,
                        z: timelineData[index].position.z,
                        ease: "power2.inOut",
                        delay: index * increment,
                        duration: 1
                    }, "moveGlobes")
                    .to(mesh.scale, {
                        x: timelineData[index].scale,
                        y: timelineData[index].scale,
                        z: timelineData[index].scale,
                        duration: 1,
                        delay: index * increment,
                        ease: "power2.inOut",
                    }, "moveGlobes")
                    .to(mesh.material, {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        onComplete: () => {
                            mesh.visible = true;
                        }
                    }, "moveGlobes");
            });

            if (timelineData[index].small) {
                [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                    enterTimeline
                        .call(() => {
                            mesh.visible = false;
                        })
                });
            }
        });

        return enterTimeline;
    }
    initExitTimeline() : gsap.core.Timeline {
        const exitTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.currentGlobe = undefined;
                this.emit("exitComplete")
            }
        });

        const timelineData = globesData.map((globeData) => ({
            projectId: globeData.projectId,
            small: globeData.small,
            position: globeData.timeline.third.hide.position,
            scale: globeData.timeline.second.scale,
        }));

        this.globesList.forEach((globe: GlobeInterface, index: number) => {
            const behaviourStep = timelineData[index];

            if (behaviourStep.small) {
                [globe.ballMesh, globe.glassMesh].forEach(mesh => {
                    let scale = behaviourStep.scale ?? 0.1;
                    exitTimeline
                        .call(() => {
                            if (this.currentGlobe === globe)
                                scale = 0.1

                            mesh.position.copy(behaviourStep.position);
                            mesh.scale.set(scale, scale, scale);
                            mesh.visible = true
                        })
                });
                [globe.ballMat, globe.glassMat].forEach(mat => {
                    exitTimeline
                        .call(() => {
                            mat.opacity = 1;
                        })
                })
            }
        });

        return exitTimeline;
    }
    initHoverTimeline(targetGlobe: GlobeInterface) : gsap.core.Timeline {
        const timeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                if (this.currentGlobe !== targetGlobe)
                    return;

                //check if other are still visible
                this.targetGlobes.forEach(globe => {
                    if (globe === targetGlobe)
                        return;

                    [globe.ballMesh, globe.glassMesh].forEach((globe) => {
                        globe.visible = false;
                        globe.scale.x = 0;
                    });
                    [globe.ballMat, globe.glassMat].forEach((globe) => {
                        globe.opacity = 0;
                    })
                })
            }
        });

        [targetGlobe.ballMesh, targetGlobe.glassMesh].forEach(mesh => {
                timeline.call(() => {
                    mesh.visible = true;
                }, undefined, "onhover")
                timeline.to(mesh.scale, {
                    x: 1.2,
                    y: 0.1,
                    z: 0.1,
                    ease: "power2.inOut",
                    overwrite: "auto",
                    duration: 0.3
                }, "onhover")
            });
        [targetGlobe.glassMat, targetGlobe.ballMat].forEach(mat => {
                timeline.to(mat, {
                    opacity: 1,
                    ease: "power2.inOut",
                    overwrite: "auto",
                    duration: 0.3
                }, "onhover")
            });

        return timeline;
    }

    setListeners() {
        this.openProjectButtons.forEach((button) => {
            const projectId = parseInt(button.getAttribute("data-project-id") || "-1");
            const projectName = button.getAttribute("data-project") || "Unknown Project";
/*            const targetGlobeId = globesData.findIndex(globe => {
                if (globe.small) {
                    if (globe.projectId == projectId) {
                        return true
                    }
                }
            })
            const targetGlobe = this.globesList[targetGlobeId];
            this.targetGlobes.add(targetGlobe);*/

            const titleBackgroundWrapper = document.querySelector(`.projects-list .animated-bg-wrapper.${projectName}`);
            if (!titleBackgroundWrapper) {
                console.warn(`No title background wrapper found for project: ${projectName}`);
                return;
            }

            button.addEventListener("click", () => {
                if (this.isEnter) {
                    titleBackgroundWrapper?.classList.remove("hover");
                    this.emit("navigate", {
                        to: SectionType.PROJECT_DETAIL,
                        data: {
                            projectId: projectId
                        }
                    })
                }
            });
            button.addEventListener("mouseenter", () => {
/*                this.currentGlobe = targetGlobe;
                if (this.isEnter) {
                    this.initHoverTimeline(targetGlobe).play();
                }*/
                if (this.isEnter) {
                    titleBackgroundWrapper?.classList.add("hover");
                }
            })
            button.addEventListener("mouseleave", () => {
/*                if (this.isEnter) {
                    const currentGlobe = this.currentGlobe

                    const timeline = gsap.timeline({
                        paused: true,
                    });
                    if (currentGlobe) {
                        [currentGlobe.ballMesh, currentGlobe.glassMesh].forEach(mesh => {
                            timeline.to(mesh.scale, {
                                x: 0,
                                y: 0,
                                z: 0,
                                ease: "power2.inOut",
                                overwrite: "auto",
                                duration: 0.3
                            }, "exitHover")
                            timeline.call(() => {
                                mesh.visible = false;
                            }, undefined, "endHover");
                        });
                        [currentGlobe.ballMat, currentGlobe.glassMat].forEach(mat => {
                            timeline.to(mat, {
                                opacity: 0,
                                ease: "power2.inOut",
                                overwrite: "auto",
                                duration: 0.3
                            }, "exitHover")
                        })
                    }
                    timeline.play();
                }*/
                if (this.isEnter) {
                    titleBackgroundWrapper?.classList.remove("hover");
                }
            })
        });
    }

    enter(): void {
        this.initEnterTimeline().restart();

        setTimeout(() => {
            this.show();
        }, 300)
    }

    exit(): void {
        this.hide(300);

        this.globesList.forEach((globe) => {
            Floating.stop(globe);
        });
        setTimeout(() => {
            this.isEnter = false;
            this.exitTimeline.restart();
        }, 300);
    }

    enterComplete() {
        this.isEnter = true;
        if (this.currentGlobe)
            this.initHoverTimeline(this.currentGlobe).play();

        this.globesList.forEach((globe, index) => {
            if (!globesData[index].small) {
                Floating.start(globe);
            }
        });

        this.emit("enterComplete");
    }

}