import Timeline from "./World/Timeline.ts";
import Floating from "./World/Floating.ts";
import type {Globe} from "./World/Globes.ts";

export default class Controls {
    timeline: Timeline;
    floating: Floating;

    globes: Globe[];

    public hero = document.querySelector(".hero");
    public heroTitle = document.querySelector(".hero-title");
    public heroWork = document.querySelector(".hero-work");
    public heroContact = document.querySelector(".hero-contact");

    public projectsList = document.querySelector(".projects-list");

    constructor(globes: Globe[]) {
        this.timeline = new Timeline();
        this.floating = new Floating();

        this.globes = globes;

        this.heroWork?.addEventListener("click", () => {
            this.startSecondTimeline();
        });
    }

    startFirstTimeline() {
        this.hero?.classList.add("show-hero");

        setTimeout(() => {
            this.timeline.firstTimeline.play();
            this.timeline.on("firstTimelineComplete", () => {
                this.globes.forEach(globe => {
                    this.floating.start(globe);
                });
            });
        }, 600)
    }

    startSecondTimeline() {
        this.hero?.classList.remove("show-hero");
        this.hero?.classList.add("hide-hero");
        this.globes.forEach(globe => {
            this.floating.stop(globe);
        });
        this.timeline.secondTimeline.play();
        this.timeline.on("secondTimelineComplete", () => {
            this.hero?.classList.add("hidden-section");
            this.projectsList?.classList.remove("hidden-section");

            this.globes.forEach(globe => {
                this.floating.start(globe);
            });
        })
    }



}