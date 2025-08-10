import Timeline from "./World/Timeline.ts";
import Floating from "./World/Floating.ts";
import type {GlobeInterface} from "./World/Globes.ts";
import Cursor from "./Cursor.ts";

export default class Controls {
    timeline: Timeline;
    floating: Floating;

    cursor: Cursor;

    globes: GlobeInterface[];

    public hero = document.querySelector(".hero");
    public heroTitle = document.querySelector(".hero-title");
    public heroWork = document.querySelector(".hero-work");
    public heroContact = document.querySelector(".hero-contact");

    public projectsList = document.querySelector(".projects-list");
    public openProjectButtons = document.querySelectorAll(".open-project-button");

    public projectDetails = document.querySelector(".project-details");
    public projectDetailsGroup: {[key: string]: HTMLElement} = {};

    constructor(globes: GlobeInterface[]) {
        this.timeline = new Timeline();
        this.floating = new Floating();

        this.cursor = new Cursor();

        this.globes = globes;

        this.setListeners();

        document.querySelectorAll(".project-details-group").forEach((group) => {
            const groupId: number = parseInt(group.getAttribute("data-project-id") || "-1");
            if (groupId !== -1) {
                this.projectDetailsGroup[groupId] = group as HTMLElement;
            }
        });
        this.heroWork?.addEventListener("click", () => {
            this.startSecondTimeline();
        });
        this.openProjectButtons.forEach((button) => {
            const projectId = parseInt(button.getAttribute("data-project-id") || "-1");
            button.addEventListener("click", () => {
                this.startThirdTimeline(projectId);
            });
        });
    }

    // Sets up event listeners for trigger the end of timelines and update UI elements
    private setListeners() {
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
    }

    // Starts the animation timelines
    startFirstTimeline() {
        this.hero?.classList.add("show");

        setTimeout(() => {
            this.timeline.firstTimeline.play();
        }, 600)
    }
    startSecondTimeline() {
        this.hero?.classList.remove("show");
        this.hero?.classList.add("hide");
        this.globes.forEach(globe => {
            this.floating.stop(globe);
        });
        this.projectsList?.classList.add("show");
        this.timeline.secondTimeline.play();
    }
    startThirdTimeline(projectId: number) {
        this.projectsList?.classList.remove("show");
        this.projectsList?.classList.add("hide");
        this.globes.forEach(globe => {
            this.floating.stop(globe);
        });

        this.timeline.thirdTimeline[projectId].play();
    }

    update() {
        this.cursor.update();
    }

}