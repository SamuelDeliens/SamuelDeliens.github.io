import { gsap } from "gsap";

export default class Cursor {
    private cursor: HTMLElement = document.getElementById('cursor')!;
    private dot: HTMLElement = document.getElementById('cursor-dot')!;
    private tooltip: HTMLElement = document.getElementById('cursor-tooltip')!;
    private tooltipText: HTMLElement = document.getElementById('cursor-tooltip-text')!;
    private hidden: boolean = !document.getElementById('cursor')?.classList.contains('hidden') || true;

    private hideOnMobile: boolean = true;

    private xTo!: gsap.QuickToFunc;
    private yTo!: gsap.QuickToFunc;
    private xScaleDotTo!: gsap.QuickToFunc;
    private yScaleDotTo!: gsap.QuickToFunc;

    private isTouch: boolean = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    constructor() {
        if (this.isTouch && this.hideOnMobile) {
            document.getElementById('cursor')!.style.display = 'none';
            return;
        }

        if (!this.cursor) {
            console.error("Cursor elements not found in the DOM.");
            return;
        }

        this.init();
    }

    private init() {
        gsap.set(".cursor", {xPercent: -50, yPercent: -50});
        this.xTo = gsap.quickTo(".cursor", "x", {duration: 1, ease: "power3"});
        this.yTo = gsap.quickTo(".cursor", "y", {duration: 1, ease: "power3"});
        this.xScaleDotTo = gsap.quickTo(".cursor-dot", "scaleX", {duration: 0.3, ease: "power3"});
        this.yScaleDotTo = gsap.quickTo(".cursor-dot", "scaleY", {duration: 0.3, ease: "power3"});

        this.setListeners();
    }

    private setListeners() {
        window.addEventListener('mousedown', () => this.down());
        window.addEventListener('mouseup', () => this.up());

        window.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget)
                this.hide()
        });
        window.addEventListener('mouseover', () => {
            this.show();
        });

        const interactiveSelector = 'a, button, .interactive';
        document.querySelectorAll(interactiveSelector).forEach(el => {
            el.addEventListener('mouseenter', () => this.onHover());
            el.addEventListener('mouseleave', () => this.offHover());
        });

        const interactiveHideSelector = '.cursor-hide';
        document.querySelectorAll(interactiveHideSelector).forEach(el => {
            el.addEventListener('mouseenter', () => this.hide());
            el.addEventListener('mouseleave', () => this.show());
        });

        const interactiveTooltipSelector = '.cursor-tooltip';
        document.querySelectorAll(interactiveTooltipSelector).forEach(el => {
            const content = el.querySelector(".data-tooltip")?.innerHTML;
            if (content) {
                el.addEventListener('mouseenter', () => this.onTooltip(content));
                el.addEventListener('mouseleave', () => this.offTooltip());
            }
        });

    }

    onMouseMove(e: MouseEvent) {
        if (!this.hidden)
            this.show();

        this.xTo(e.clientX);
        this.yTo(e.clientY);
    }

    private down() {
        this.xScaleDotTo(0.1);
        this.yScaleDotTo(0.1);
    }
    private up() {
        this.xScaleDotTo(1);
        this.yScaleDotTo(1);
    }

    private onHover() {
        this.cursor.classList.add('hover');
        this.xScaleDotTo(1.5);
        this.yScaleDotTo(1.5);
    }
    private offHover() {
        this.cursor.classList.remove('hover');
        this.xScaleDotTo(1);
        this.yScaleDotTo(1);
    }

    private onTooltip(content: string) {
        this.tooltipText.innerHTML = content;
        this.dot.classList.add('hidden');
        this.tooltip.classList.remove('hidden');
    }
    private offTooltip() {
        this.dot.classList.remove('hidden');
        this.tooltip.classList.add('hidden');
    }

    private show() {
        this.hidden = false;
        this.cursor.classList.remove('hidden');
    }
    private hide() {
        this.hidden = true;
        this.cursor.classList.add('hidden');
    }
}