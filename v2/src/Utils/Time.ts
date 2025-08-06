import { EventEmitter } from 'events';

export default class Time extends EventEmitter {
    public startTime: number;
    public currentTime: number;
    public elapsed: number;
    public delta: number;
    constructor() {
        super();

        this.startTime = Date.now();
        this.currentTime = this.startTime;
        this.elapsed = 0;
        this.delta = 16;

        this.update();
    }

    update() {
        const newCurrentTime = Date.now();

        this.delta = newCurrentTime - this.currentTime;
        this.currentTime = newCurrentTime;
        this.elapsed = this.currentTime - this.startTime;

        this.emit('tick', this.delta);
        window.requestAnimationFrame(() => this.update());
    }
}