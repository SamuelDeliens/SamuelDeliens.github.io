import * as THREE from "three";
import { gsap } from "gsap";

import BaseSection from "./BaseSection.ts";
import type {DetailedGlobeInterface} from "../World/Globes.ts";
import {globesData, SHADER_DEFAULT_SPEED, SHADER_MEDIUM_SPEED} from "../World/Globes.ts";
import type {GlobeInterface} from "../World/Globes.ts";

export default class ContactSection extends BaseSection {
    private LinkedInUrl = "https://www.linkedin.com/in/samuel-deliens-baa879207";
    private InstagramUrl = "https://www.instagram.com/deliens.s?igsh=M3Z3NTFvc2luZHp1&utm_source=qr";
    private ResumeUrl = "./assets/Samuel_Deliens_Resume.pdf";
    private MailToUrl = "mailto:samuel.deliens@gmail.com"

    private LinkedInButton = document.querySelector(".linkedin")
    private InstagramButton = document.querySelector(".instagram");
    private ResumeButton = document.querySelector(".resume");
    private MailButton = document.querySelector(".mail");

    private detailedGlobes: { [key: number]: DetailedGlobeInterface};
    private enterTimelineComplete = {
        cameraPosition: new THREE.Vector3(0, 0.36, 1),
        globeMeshPosition: new THREE.Vector3(0, 0, 0),
        globeMeshScale: new THREE.Vector3(3, 3, 3),
        glassMeshPosition: new THREE.Vector3(0.6, 0.35, 0),
        glassMeshScale: new THREE.Vector3(0.35, 0.35, 0.35),
    }

    protected enterTimeline: gsap.core.Timeline;
    protected exitTimeline: gsap.core.Timeline;

    constructor() {
        super('.contact');

        this.detailedGlobes = this.world.globes.detailedGlobes;

        this.enterTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.show();
                this.world.lerp.active = true;
                this.emit("enterComplete");
            }
        });
        this.exitTimeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                this.emit("exitComplete");
            }
        });

        this.init();
        this.setListeners();
    }

    init() {
        this.initEnterTimeline();
        this.initExitTimeline();
    }
    initEnterTimeline() {
        const timelineData = globesData.map((globeData) => {
            return globeData.timeline.third.hide;
        });

        let targetGlobe = {
            globe: this.globesList[0],
            behaviourStep: globesData[0].timeline.third.show,
        }

        this.globesList.forEach((globe: GlobeInterface, index: number) => {
            if (index === 0)
                return;

            let behaviourStep  = timelineData[index];
            const increment = (1 / this.globesList.length) / 5;

            [globe.ballMesh, globe.glassMesh].forEach((mesh: THREE.Mesh) => {
                this.enterTimeline
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
                    }, "moveGlobes")
                    .to(mesh.material, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        mesh.visible = false;
                    }
                }, "moveGlobes");
            });
        });

        this.enterTimeline
            .call(() => {
                this.camera.switchPerspectiveCamera();

                setTimeout(() => {
                    const newGeo = this.detailedGlobes[1].geometry;
                    const oldGeo = targetGlobe.globe.ballMesh.geometry as THREE.SphereGeometry;
                    targetGlobe.globe.ballMesh.geometry = newGeo;
                    this.detailedGlobes[1].geometry = oldGeo;

                    this.globes.speed = SHADER_MEDIUM_SPEED;

                    //this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.ballMesh, this.globes.currentGroup);
                    this.globes.moveObjectPreserveWorldTransform(targetGlobe.globe.glassMesh, this.globes.currentGroup);
                }, 250);
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
    }
    initExitTimeline() {
        const currentDetailedGlobe = this.detailedGlobes[1];

        this.exitTimeline
            .call(() => {
                setTimeout(() => {
                    currentDetailedGlobe.glassMesh.visible = false;

                    const newGeo = currentDetailedGlobe.geometry;
                    const oldGeo = currentDetailedGlobe.globe.ballMesh.geometry as THREE.SphereGeometry;
                    currentDetailedGlobe.globe.ballMesh.geometry = newGeo;
                    currentDetailedGlobe.geometry = oldGeo;

                    this.globes.speed = SHADER_DEFAULT_SPEED;

                    this.camera.switchOrthgraphicCamera();
                }, 740);

                this.globes.moveObjectPreserveWorldTransform(currentDetailedGlobe.globe.glassMesh, this.world.scene);
            }, undefined, "exitGlobe")
            .to(this.camera.perspectiveCamera.position, {
                x: 0,
                y: 2,
                z: 5,
                duration: 1,
                ease: "power2.inOut",
            }, "exitGlobe")
            .to(currentDetailedGlobe.globe.ballMesh.scale, {
                x: 0.5,
                y: 0.5,
                z: 0.5,
                duration: 1,
                ease: "power2.inOut",
            }, "exitGlobe")
            .to(currentDetailedGlobe.globe.glassMesh.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.8,
                ease: "power2.inOut",
            }, "exitGlobe")
            .to(currentDetailedGlobe.globe.glassMesh.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                ease: "power2.inOut",
            }, "exitGlobe")
    }


    setListeners() {
        this.LinkedInButton?.addEventListener("click", () => {
           window.open(this.LinkedInUrl, "_blank");
        });
        this.InstagramButton?.addEventListener("click", () => {
            window.open(this.InstagramUrl, "_blank");
        });
        this.ResumeButton?.addEventListener("click", () => {
            window.open(this.ResumeUrl, "_blank");
        });

        this.MailButton?.addEventListener("click", () => {
            window.location.href = this.MailToUrl;
        });
    }

    enter() {
        this.enterTimeline.restart();
    }

    exit() {
        this.world.lerp.active = false;
        this.hide(300);
        this.exitTimeline.restart();
    }


}