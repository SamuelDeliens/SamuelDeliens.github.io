import * as THREE from "three";
import { gsap } from "gsap";

import BaseSection from "./BaseSection.ts";
import type {GlobeInterface} from "../World/Globes.ts";
import {globesData} from "../World/Globes.ts";
import Floating from "../World/Floating.ts";
import type {NavigationEvent} from "../SectionManager.ts";
import {SectionType} from "../SectionManager.ts";

export default class HeroSection extends BaseSection {
    private homeButton: HTMLElement | null = document.querySelector(".nav-button.home");
    private workButton: HTMLElement | null = document.querySelector(".hero-work");
    private contactButton: HTMLElement | null = document.querySelector(".hero-contact");

    protected enterTimeline: gsap.core.Timeline;

    public showHeader: boolean = false;

    constructor() {
        super('.hero');

        this.enterTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.globesList.forEach(globe => {
                    Floating.start(globe);
                });

                this.emit("enterComplete");
            }
        });

        this.init();
        this.setListeners();
    }

    async prepare(data?: any): Promise<void> {
        if (data?.needsReset) {
            await new Promise<void>((resolve) => {
                this.once("resetComplete", resolve);
                this.resetTimeline().restart();
            });
        }
    }

    init() {
        const timelineData = globesData.map((globeData) => ({
            position: globeData.timeline.first.position,
            scale: globeData.timeline.first.scale
        }));

        const increment = (1 / this.globesList.length) / 5;
        this.globesList.forEach((globe: GlobeInterface, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                this.enterTimeline
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
    resetTimeline() {
        const resetTimeline = gsap.timeline({
            paused: true,
            onStart: () => {
                this.globesList[0].ballMesh.visible = true;
                this.globesList[0].glassMesh.visible = true;
            },
            onComplete: () => {
                this.emit("resetComplete");
            }
        });

        const timelineData = globesData.map((globeData) => ({
            position: globeData.timeline.initial.position,
            scale: globeData.timeline.initial.scale
        }));

        resetTimeline
            .to(this.camera.ortographicCamera.position, {
                x: 0,
                y: 2,
                z: 5,
                duration: 0.5,
                ease: "power2.inOut",
            }, "resetInitial")

        this.globesList.forEach((globe: GlobeInterface, index: number) => {
            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                resetTimeline
                    .call(() => {
                      mesh.visible = true;
                    })
                    .to(mesh.position, {
                        x: timelineData[index].position.x,
                        y: timelineData[index].position.y,
                        z: timelineData[index].position.z,
                        ease: "power2.inOut",
                        duration: 0.5
                    }, "resetInitial")
                    .to(mesh.scale, {
                        x: timelineData[index].scale,
                        y: timelineData[index].scale,
                        z: timelineData[index].scale,
                        duration: 0.5,
                        ease: "power2.inOut",
                    }, "resetInitial")
                    .to(mesh.material, {
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    }, "same");
            });
        });

        return resetTimeline;
    }
    setListeners() {
        this.workButton?.addEventListener("click", () => {
            this.emit("navigate", {
                to: SectionType.PROJECTS_LIST
            } as NavigationEvent)
        });

        this.contactButton?.addEventListener("click", () => {
            this.emit("navigate", {
                to: SectionType.CONTACT
            } as NavigationEvent);
        });

        this.homeButton?.addEventListener("click", () => {
            this.emit("navigate", {
                to: SectionType.HERO,
                data: { needsReset: true }
            } as NavigationEvent);
        });
    }

    enter(): void {
        this.show();

        setTimeout(() => {
            this.enterTimeline.restart();
        }, 650)
    }

    exit(): void {
        this.hide(500);
        this.globesList.forEach(globe => {
            Floating.stop(globe);
        });
        this.emit("exitComplete");
    }

}