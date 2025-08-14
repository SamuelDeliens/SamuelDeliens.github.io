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

    constructor() {
        super('.projects-list');

        this.enterTimeline = gsap.timeline();

        this.init();
        this.setListeners();
    }

    init() {
        this.enterTimeline = this.initEnterTimeline();
    }
    initEnterTimeline() : gsap.core.Timeline {
        const enterTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.globesList.forEach(globe => {
                    Floating.start(globe);
                });

                this.emit("enterComplete");
            }
        });

        const timelineData = globesData.map((globeData) => ({
            position: globeData.timeline.second.position,
            scale: globeData.timeline.second.scale
        }));

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

        return enterTimeline;
    }
    setListeners() {
        this.openProjectButtons.forEach((button) => {
            const projectId = parseInt(button.getAttribute("data-project-id") || "-1");
            button.addEventListener("click", () => {
                this.emit("navigate", {
                    to: SectionType.PROJECT_DETAIL,
                    data: {
                        projectId: projectId
                    }
                })
            });
        });
    }

    enter(enterAnimation: boolean = true): void {
        if (enterAnimation)
            this.enterTimeline.restart();
        else
            this.emit("enterComplete")

        setTimeout(() => {
            this.show();
        }, 300)
    }

    exit(): void {
        this.hide(300);
        this.globesList.forEach(globe => {
            Floating.stop(globe);
        });
        this.emit("exitComplete");
    }

}