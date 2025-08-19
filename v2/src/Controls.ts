import Cursor from "./Controls/Cursor.ts";
import Experience from "./Experience.ts";
import WorldRotation from "./Controls/WorldRotation.ts";

export default class Controls {
    experience: Experience

    cursor: Cursor;

    constructor() {
        this.experience = new Experience();

        this.cursor = new Cursor();
        WorldRotation.lerp = this.experience.world.lerp;

        this.setListeners();
    }

    private setListeners() {
        window.addEventListener('mousemove', (e) => {
            WorldRotation.onMouseMove(e);
            this.cursor.onMouseMove(e);
        }, {passive:true});
    }

    resize() {
        if (this.cursor.resize) {
            this.cursor.resize();
        }
    }
}