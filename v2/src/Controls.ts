import Cursor from "./Cursor.ts";
import Experience from "./Experience.ts";
import World from "./World/World.ts";

export default class Controls {
    experience: Experience
    world: World;

    cursor: Cursor;
    lerp;

    constructor() {
        this.experience = new Experience();
        this.world = this.experience.world;

        this.cursor = new Cursor();

        this.lerp = this.world.lerp;

        this.setListeners();
    }

    onMouseMove(e: MouseEvent) {
        if (!this.world.lerpRotation) return;
        const newRotationX = ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth;
        const newRotationY = ((e.clientY - window.innerHeight / 2)*2)/window.innerHeight;
        this.lerp.targetX = newRotationX;
        this.lerp.targetY = newRotationY;
    }

    private setListeners() {
        window.addEventListener('mousemove', (e) => {
            this.onMouseMove(e);
            this.cursor.onMouseMove(e);
        }, {passive:true});
    }

    update() {}

}