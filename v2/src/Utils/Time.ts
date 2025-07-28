import { EventEmitter } from 'events';

export default class Time extends EventEmitter {
    private startTime: number;
    private currentTime: number;
    private elabsed: number;
    private delta: number;
    constructor() {
        super();

        this.startTime = Date.now();
        this.currentTime = this.startTime;
        this.elabsed = 0;
        this.delta = 16;

        this.update();
    }

    update() {
        const newCurrentTime = Date.now();

        this.delta = newCurrentTime - this.currentTime;
        this.currentTime = newCurrentTime;
        this.elabsed = this.currentTime - this.startTime;

        this.emit('tick', this.delta);
        window.requestAnimationFrame(() => this.update());
    }
}