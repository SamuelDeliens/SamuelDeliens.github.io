import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {

    width: number;
    height: number;
    ratio: number;
    pixelRatio: number;
    frustrumSize: number;

    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.ratio = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.frustrumSize = 25;

        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.ratio = this.width / this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.emit('resize');
        });

    }
}