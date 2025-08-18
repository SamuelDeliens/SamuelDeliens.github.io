import {EventEmitter} from "events";
import { gsap } from "gsap";

import Experience from "../Experience.ts";
import type World from "../World/World.ts";
import type {GlobeInterface} from "../World/Globes.ts";
import Globes from "../World/Globes.ts";
import Camera from "../Camera.ts";

export type SectionTimeline = gsap.core.Timeline | {[key: string]: gsap.core.Timeline}

export default abstract class BaseSection extends EventEmitter {
    protected sectionElement: HTMLElement | null;

    protected experience: Experience;
    protected world: World;
    protected camera: Camera;
    protected globes: Globes;

    protected globesList: GlobeInterface[];

    protected enterTimeline?: SectionTimeline;
    protected exitTimeline?: SectionTimeline;

    protected currentData?: any;

    protected constructor(selector: string) {
        super();

        this.experience = new Experience();
        this.world = this.experience.world;
        this.camera = this.experience.camera;
        this.globes = this.world.globes;
        this.sectionElement = document.querySelector(selector);

        this.globesList = this.world.globes.globes;
    }

    abstract init(): void;
    abstract setListeners?(): void;

    prepare?(data?: any): Promise<void> | void; // prepare section with data

    abstract enter(enterAnimation?: boolean): void;
    abstract exit(): void;

    protected show(): void {
        this.sectionElement?.classList.remove('hide');
        this.sectionElement?.classList.remove('hidden');

        setTimeout(() => {
            this.sectionElement?.classList.add('show');
        }, 100)
    }
    protected hide(duration: number = 0): void {
        this.sectionElement?.classList.remove('show');
        this.sectionElement?.classList.add('hide');

        if (duration > 0) {
            setTimeout(() => {
                this.sectionElement?.classList.add('hidden');
            }, duration)
        } else {
            this.sectionElement?.classList.add('hidden');
        }
    }
    protected setVisible(visible: boolean): void {
        if (visible) {
            this.sectionElement?.classList.remove('hidden');
        } else {
            this.sectionElement?.classList.add('hidden');
        }
    }

}