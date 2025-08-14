import type BaseSection from "./Sections/BaseSection.ts";
import HeroSection from "./Sections/HeroSection.ts";
import ProjectListSection from "./Sections/ProjectListSection.ts";
import ProjectDetailSection from "./Sections/ProjectDetailSection.ts";

export const SectionType = {
    VOID: -1,
    HERO: 0,
    PROJECTS_LIST: 1,
    PROJECT_DETAIL: 2
}
export type SectionType = typeof SectionType[keyof typeof SectionType];

export interface NavigationEvent {
    to: SectionType;
    enterAnimation?: boolean;
    data?: any; // projectId...
}

export default class SectionManager {

    private sections: Map<SectionType, BaseSection> = new Map();
    private currentSection: SectionType;

    private isTransitioning: boolean = false;

    constructor() {
        this.currentSection = SectionType.VOID;
        this.init();
    }

    init() {
        this.sections.set(SectionType.HERO, new HeroSection());
        this.sections.set(SectionType.PROJECTS_LIST, new ProjectListSection());
        this.sections.set(SectionType.PROJECT_DETAIL, new ProjectDetailSection());

        this.sections.forEach((section: BaseSection) => {
            section.on("navigate", (event: NavigationEvent) => {
                this.goToSection(event.to, event.enterAnimation, event.data);
            })
        })
    }

    async goToSection(section: SectionType, enterAnimation?: boolean, data?: any) {
        if (this.isTransitioning || this.currentSection === section) return;

        this.isTransitioning = true;

        try {
            const currentSection = this.sections.get(this.currentSection);
            const targetSection = this.sections.get(section)

            if (targetSection) {
                if (targetSection?.prepare) {
                    await targetSection.prepare(data);
                }
            }

            if (currentSection) {
                await new Promise<void>((resolve) => {
                    currentSection.once("exitComplete", resolve);
                    currentSection.exit();
                });
            }

            if (targetSection) {
                await new Promise<void>((resolve) => {
                    targetSection.once("enterComplete", resolve);
                    targetSection.enter(enterAnimation);
                })
            }

            this.currentSection = section;
        } finally {
            this.isTransitioning = false;
        }
    }
}