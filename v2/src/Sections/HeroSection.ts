import * as THREE from "three";
import { gsap } from "gsap";

import BaseSection from "./BaseSection.ts";
import type {GlobeInterface} from "../World/Globes.ts";
import {globesData} from "../World/Globes.ts";
import Floating from "../World/Floating.ts";
import type {NavigationEvent} from "../SectionManager.ts";
import {SectionType} from "../SectionManager.ts";

export default class HeroSection extends BaseSection {
    private workButton: HTMLElement | null = document.querySelector(".hero-work");

    protected enterTimeline: gsap.core.Timeline;

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
    setListeners() {
        this.workButton?.addEventListener("click", () => {
            this.emit("navigate", {
                to: SectionType.PROJECTS_LIST
            } as NavigationEvent)
        });
    }

    enter(): void {
        this.show();

        setTimeout(() => {
            this.enterTimeline.restart();
        }, 600)
    }

    exit(): void {
        this.hide(500);
        this.globesList.forEach(globe => {
            Floating.stop(globe);
        });
        this.emit("exitComplete");
    }

}