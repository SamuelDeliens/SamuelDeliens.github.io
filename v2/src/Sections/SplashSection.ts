import * as THREE from "three";
import { gsap } from "gsap";

import BaseSection from "./BaseSection.ts";
import {globesData} from "../World/Globes.ts";
import type {GlobeInterface} from "../World/Globes.ts";
import type Composer from "../Composer.ts";
import type {NavigationEvent} from "../SectionManager.ts";
import {SectionType} from "../SectionManager.ts";

export default class SplashSection extends BaseSection {

    private composer: Composer;

    public showHeader: boolean = false;

    constructor() {
        super('.splash');

        this.composer = this.experience.composer;
    }

    init(): void {}
    initEnterTimeline(): gsap.core.Timeline {
        const enterTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.emit("enterComplete");
                setTimeout(() => {
                    this.emit("navigate", {
                        to: SectionType.HERO
                    } as NavigationEvent)
                }, 1000);
            }
        });

        enterTimeline
            .to(this.composer.vignetteEffect.uniforms["radius"], {
                value: 0.05,
                duration: 1,
                ease: "power2.inOut"
            })

        return enterTimeline;
    }
    initExitTimeline(): gsap.core.Timeline {
        const exitTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                setTimeout(() => {
                    this.emit("exitComplete");
                }, 500);
                this.globesList.forEach((globe: GlobeInterface) => {
                    globe.ballMesh.visible = true;
                    globe.glassMesh.visible = true;
                });
            }
        });

        const timelineData = globesData.map((globeData) => ({
            position: globeData.timeline.first.position,
            scale: globeData.timeline.first.scale
        }));

        exitTimeline
            .call(() => {
                setTimeout(() => {
                    this.camera.switchOrthgraphicCamera();
                }, 550);
            }, undefined, "resizeExit")
            .to(this.composer.vignetteEffect.uniforms["radius"], {
                value: 0.9,
                duration: 1,
                ease: "ease.inOut"
            }, "resizeExit")
            .to(this.globesList[0].ballMesh.scale, {
                x: timelineData[0].scale,
                y: timelineData[0].scale,
                z: timelineData[0].scale,
                duration: 0.8,
                ease: "ease.inOut",
            }, "resizeExit")
            .to(this.globesList[0].glassMesh.scale, {
                x: timelineData[0].scale! + 0.1,
                y: timelineData[0].scale! + 0.1,
                z: timelineData[0].scale! + 0.1,
                duration: 0.8,
                ease: "ease.inOut",
            }, "resizeExit")

        return exitTimeline;
    }

    setListeners() {}

    enter(): void {
        this.show();

        globesData.forEach((globeData, index) => {
            const globe = this.globesList[index];
            if (globeData.timeline.splash) {
                globe.ballMesh.position.set(
                    globeData.timeline.splash.position.x,
                    globeData.timeline.splash.position.y,
                    globeData.timeline.splash.position.z
                );

                if (globeData.timeline.splash.scale) {
                    globe.ballMesh.scale.set(
                        globeData.timeline.splash.scale,
                        globeData.timeline.splash.scale,
                        globeData.timeline.splash.scale
                    );
                }
            }
            else {
                globe.ballMesh.visible = false;
                globe.glassMesh.visible = false;
            }
        });
        Object.values(this.globes.detailedGlobes).forEach((globe) => {
            globe.glassMesh.visible = false;
            globe.glassMesh.scale.set(0, 0, 0);
        });

        this.initEnterTimeline().restart();
    }

    exit(): void {
        this.hide(1000);

        setTimeout(() => {
            this.initExitTimeline().restart();
        }, 500);
    }

}