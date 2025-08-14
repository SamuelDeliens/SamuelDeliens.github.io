import Timeline from "./World/Timeline.ts";
import Floating from "./World/Floating.ts";
import type {GlobeInterface} from "./World/Globes.ts";
import Cursor from "./Cursor.ts";
import Experience from "./Experience.ts";
import World from "./World/World.ts";

export default class Controls {
    experience: Experience
    world: World;

    timeline: Timeline;
    floating: Floating;

    cursor: Cursor;
    lerp;

    globes: GlobeInterface[];

    public hero = document.querySelector(".hero");
    public heroTitle = document.querySelector(".hero-title");
    public heroWork = document.querySelector(".hero-work");
    public heroContact = document.querySelector(".hero-contact");

    public projectsList = document.querySelector(".projects-list");
    public openProjectButtons = document.querySelectorAll(".open-project-button");

    currentProjectId: number = -1;
    public projectDetails = document.querySelector(".project-details");
    public projectDetailsGroup: {[key: string]: HTMLElement} = {};
    public nextProjectButton = document.querySelector(".nav-button.next");
    public backProjectButton = document.querySelector(".nav-button.back");

    constructor(globes: GlobeInterface[]) {
        this.experience = new Experience();
        this.world = this.experience.world;

        this.timeline = new Timeline();
        this.floating = new Floating();

        this.cursor = new Cursor();

        this.lerp = this.experience.world.lerp;

        this.globes = globes;

        this.setListeners();
        this.setTimelineListeners();

        document.querySelectorAll(".project-details-group").forEach((group) => {
            const groupId: number = parseInt(group.getAttribute("data-project-id") || "-1");
            if (groupId !== -1) {
                this.projectDetailsGroup[groupId] = group as HTMLElement;
            }
        });
    }

    onMouseMove(e: MouseEvent) {
        if (!this.world.lerpRotation) return;
        const newRotationX = ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth;
        const newRotationY = ((e.clientY - window.innerHeight / 2)*2)/window.innerHeight;
        this.lerp.targetX = newRotationX;
        this.lerp.targetY = newRotationY;
    }

    // Sets up dom event listeners
    private setListeners() {
        this.heroWork?.addEventListener("click", () => {
            this.startSecondTimeline();
        });
        this.openProjectButtons.forEach((button) => {
            const projectId = parseInt(button.getAttribute("data-project-id") || "-1");
            button.addEventListener("click", () => {
                this.startThirdTimeline(projectId);
            });
        });
        this.nextProjectButton?.addEventListener("click", () => {
            this.nextProject();
        });
        this.backProjectButton?.addEventListener("click", () => {
            this.backFromProject();
        })

        window.addEventListener('mousemove', (e) => {
            this.onMouseMove(e);
            this.cursor.onMouseMove(e);
        }, {passive:true});
    }
    private setTimelineListeners() {
        this.timeline.on("firstTimelineComplete", () => {
            this.globes.forEach(globe => {
                this.floating.start(globe);
            });
        });

        this.timeline.on("secondTimelineComplete", () => {
            this.hero?.classList.add("hidden");
            this.projectsList?.classList.remove("hidden");

            this.globes.forEach(globe => {
                this.floating.start(globe);
            });
        })

        this.timeline.on("thirdTimelineHalfComplete", (projectId: number) => {
            this.projectsList?.classList.add("hidden");
            this.projectDetails?.classList.remove("hidden");
            this.projectDetailsGroup[projectId.toString()]?.classList.add("show");
        });
        this.timeline.on("thirdTimelineComplete", () => {
            this.experience.world.lerpRotation = true;
        });

        this.timeline.on("backFromProjectTimelineComplete", () => {
            this.projectsList?.classList.remove("hide");
            this.projectsList?.classList.remove("hidden");
            this.projectsList?.classList.add("show");

            this.globes.forEach(globe => {
                this.floating.start(globe);
            });
        })
    }

    // Starts the animation timelines
    startFirstTimeline() {
        this.hero?.classList.add("show");

        setTimeout(() => {
            this.timeline.firstTimeline.pause(0).play();
        }, 600)
    }
    startSecondTimeline() {
        this.hero?.classList.remove("show");
        this.hero?.classList.add("hide");
        this.globes.forEach(globe => {
            this.floating.stop(globe);
        });
        this.projectsList?.classList.add("show");
        this.timeline.secondTimeline.pause(0).play();
    }
    startThirdTimeline(projectId: number) {
        if (this.currentProjectId === projectId) return;
        this.currentProjectId = projectId;
        this.projectsList?.classList.remove("show");
        this.projectsList?.classList.add("hide");
        this.globes.forEach(globe => {
            this.floating.stop(globe);
        });

        this.timeline.thirdTimeline[projectId].pause(0).play();
    }

    nextProject() {
        this.experience.world.lerpRotation = false;
        this.projectDetails?.classList.add("hidden");
        this.projectDetailsGroup[this.currentProjectId]?.classList.remove("show");
        this.timeline.switchProjectTimeline[this.currentProjectId].pause(0).play();
        this.currentProjectId = this.projectDetailsGroup[this.currentProjectId + 1] ? this.currentProjectId + 1 : 1;
    }

    backFromProject() {
        this.experience.world.lerpRotation = false;
        this.projectDetails?.classList.add("hidden");
        this.projectDetailsGroup[this.currentProjectId]?.classList.remove("show");
        this.timeline.backFromProjectTimeline[this.currentProjectId].pause(0).play();
        this.currentProjectId = -1;
    }

    update() {
        this.cursor.update();
    }

}