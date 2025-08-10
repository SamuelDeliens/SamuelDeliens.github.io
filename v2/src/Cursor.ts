export default class Cursor {
    public dot: HTMLElement = document.getElementById('cursorDot')!;
    private hidden: boolean = !document.getElementById('cursorDot')?.classList.contains('hidden') || true;

    private dotSize: number = 12;
    private ease: number = 0.2;
    private hideOnMobile: boolean = true;

    private mouseX: number = 0;
    private mouseY: number = 0;
    private dotX: number = 0;
    private dotY: number = 0;
    private scale: number = 1;

    private isTouch: boolean = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    constructor() {
        if (this.isTouch && this.hideOnMobile) {
            document.getElementById('cursorDot')!.style.display = 'none';
            return;
        }

        if (!this.dot) {
            console.error("Cursor elements not found in the DOM.");
            return;
        }

        this.init();
    }

    init() {
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.dotX = this.mouseX;
        this.dotY = this.mouseY;

        this.setListeners();
    }

    setListeners() {
        window.addEventListener('mousemove', (e) => {
            if (!this.hidden)
                this.show();

            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }, {passive:true});

        window.addEventListener('mousedown', () => this.down());
        window.addEventListener('mouseup', () => this.up());

        window.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget)
                this.hide()
        });
        window.addEventListener('mouseover', () => {
            this.show();
        });

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq && mq.matches){ this.ease = 1; }

        const interactiveSelector = 'a, button, .interactive';
        document.querySelectorAll(interactiveSelector).forEach(el => {
            el.addEventListener('mouseenter', () => this.onHover());
            el.addEventListener('mouseleave', () => this.offHover());
        });
    }

    lerp(a: number, b: number, n: number){
        return (1 - n) * a + n * b;
    }

    move() {
        this.dotX = this.lerp(this.dotX, this.mouseX, this.ease);
        this.dotY = this.lerp(this.dotY, this.mouseY, this.ease);

        this.dot.style.transform = `translate3d(${this.dotX}px, ${this.dotY}px, 0) translate(-50%, -50%) scale(${this.scale})`;
    }
    down() {
        this.scale = 0.1;
    }
    up() {
        this.scale = 1;
    }

    onHover() {
        this.dot.classList.add('hover');
        this.scale = 1.5;
    }
    offHover() {
        this.dot.classList.remove('hover');
        this.scale = 1;
    }

    show() {
        this.hidden = false;
        this.dot.classList.remove('hidden');
    }
    hide() {
        this.hidden = true;
        this.dot.classList.add('hidden');
    }

    update() {
        this.move();
    }
}